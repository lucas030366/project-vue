<template>
	<v-container>
		{{ map }}
		<gmapMap
			v-if="this.map.lat && this.map.lng"
			:center="center"
			:zoom="19"
			:options="{styles: styles['hideOptionsMap']}"
			:streetViewControl="false"
			style="height:498px"
		>
			<gmap-marker
				v-for="loja of lojas"
				:key="loja._id"
				:position="loja.position"
				:clickable="true"
				:draggable="true"
				@click="infoWindow(loja)"
			/>
			<gmap-info-window
				v-if="content"
				:opened="showInfoWindow"
				:position="content.position"
				:options="styles.hideInfoWindow"
			>
				<div class="black--text">
					<h2>{{ content.nome }}</h2>
					<h6>{{ content.info }}</h6>
					<v-btn @click="submit(content)">Go</v-btn>
				</div>
			</gmap-info-window>
		</gmapMap>
		<v-btn @click="getEnderecoUser" text>Gerar</v-btn>

		<v-row>
			<v-col cols="4">
				<v-text-field v-model="endereco.logradouro" label="Endereço" filled shaped></v-text-field>
				<v-text-field v-model="endereco.numero" label="número" filled shaped></v-text-field>
				<v-text-field v-model="endereco.cidade" label="cidade" filled shaped></v-text-field>
				<v-text-field v-model="endereco.estado" label="Estado" filled shaped></v-text-field>
			</v-col>
			<v-btn @click="getEndereco" color="danger">OK</v-btn>
		</v-row>
	</v-container>
</template>

<script>
import axios from "axios";

export default {
	name: "GoogleMaps",
	data() {
		return {
			map: { lat: null, lng: null },
			linkIcone: "https://via.placeholder.com/50",
			content: null,
			showInfoWindow: false,
			endereco: {
				logradouro: null,
				numero: null,
				cidade: null,
				estado: null
			}
		};
	},
	methods: {
		getEndereco() {
			const logradouro = this.endereco.logradouro.split(" ").join("+");
			const numero = this.endereco.numero;
			const cidade = this.endereco.cidade;
			const estado = this.endereco.estado;
			const key = "AIzaSyDe4nn2DY_NSI4901lconIQk44fkee95pg";
			//https://maps.googleapis.com/maps/api/geocode/json?address=rua+vida+zonta,240,PR&key=chave
			const link = `https://maps.googleapis.com/maps/api/geocode/json?address=${logradouro},${numero},${cidade},${estado}&key=${key}`;

			const $self = this;
			axios.get(link).then(function(response) {
				try {
					const coordernadas = response.data.results[0].geometry.location;
					return $self.getEnderecoUser(coordernadas);
				} catch (error) {
					console.log(error.message);
				}
			});
		},
		getCoordenadasUser() {
			return new Promise(function(resolve, reject) {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});
		},
		async getEnderecoUser(coordernadas) {
			try {
				if (coordernadas.lat && coordernadas.lng) {
					this.map.lat = coordernadas.lat;
					this.map.lng = coordernadas.lng;
				} else {
					const position = await this.getCoordenadasUser();
					this.map.lat = position.coords.latitude;
					this.map.lng = position.coords.longitude;
				}
			} catch (error) {
				console.log(error.message);
			}
		},
		infoWindow(loja) {
			this.showInfoWindow = !this.showInfoWindow;
			this.content = loja;
		},
		submit(all) {
			console.log("ok");
		}
	},
	computed: {
		center() {
			return { lat: this.map.lat, lng: this.map.lng };
		},
		lojas() {
			return [
				{
					id: 1,
					nome: "Pizzaria 1",
					position: { lat: this.map.lat, lng: this.map.lng }, //, icon: this.linkIcone
					info: "Meu Local"
				},
				{
					id: 2,
					nome: "Pizzaria 2",
					position: { lat: -25.3499388, lng: -49.1779297 },
					info: "teste 1"
				},
				{
					id: 3,
					nome: "Pizzaria 3",
					position: { lat: -25.3484276, lng: -49.178759 },
					info: "teste 2"
				}
			];
		},
		styles() {
			return {
				hideOptionsMap: [
					{
						featureType: "all",
						stylers: [{ visibility: "off" }]
					},
					{
						featureType: "road",
						stylers: [{ visibility: "on" }]
					}
				],
				hideInfoWindow: {
					pixelOffset: {
						width: 0,
						height: -35
					}
				}
			};
		}
	}
};
</script>