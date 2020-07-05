<template>
	<v-container>
		{{ map }}
		<gmapMap
			v-if="this.map.lat"
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
	</v-container>
</template>

<script>
export default {
	name: "GoogleMaps",
	data() {
		return {
			map: { lat: null, lng: null },
			linkIcone: "https://via.placeholder.com/50",
			content: null,
			showInfoWindow: false
		};
	},
	methods: {
		getCoordenadasUser() {
			return new Promise(function(resolve, reject) {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});
		},
		async getEnderecoUser() {
			try {
				const position = await this.getCoordenadasUser();
				this.map.lat = position.coords.latitude;
				this.map.lng = position.coords.longitude;
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