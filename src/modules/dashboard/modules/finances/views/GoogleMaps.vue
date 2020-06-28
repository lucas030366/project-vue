<template>
	<v-container>
		<p>{{ center}}</p>
		<googlemaps-map
			v-if="this.map.lat"
			:center="center"
			:zoom="17"
			:options="{styles: styles['hide']}"
			:streetViewControl="false"
			style="height:500px"
		>
			<googlemaps-marker
				v-for="loja of lojas"
				:key="loja._id"
				:position="loja.position"
				:icon="loja.icon"
				@click="infoWindow(loja)"
			/>
		</googlemaps-map>		

		<v-sheet v-else color="grey " class="px-3 pt-3 pb-3">
			<v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
		</v-sheet>

		<h3>Teste</h3>
	</v-container>
</template>

<script>
export default {
	name: "GoogleMaps",
	data() {
		return {
			map: { lat: null, lng: null },
			linkIcone: "https://via.placeholder.com/50"
		};
	},
	methods: {
		local() {
			if (localStorage.center) {
				this.map = JSON.parse(localStorage.center);
			} else {
				navigator.geolocation.getCurrentPosition(
					position => {
						(this.map.lat = position.coords.latitude),
							(this.map.lng = position.coords.longitude);
					},
					error => {
						console.log(error.message);
					}
				);
			}
		},
		infoWindow(loja) {
			console.log("InfoView:", loja.info);
		}
	},
	computed: {
		center() {
			return { lat: this.map.lat, lng: this.map.lng };
		},
		lojas() {
			return [
				{
					position: { lat: this.map.lat, lng: this.map.lng }, //, icon: this.linkIcone
					info: "Meu Local"
				},
				{
					position: { lat: -25.3499388, lng: -49.1779297 },
					info: "teste1"
				},
				{
					position: { lat: -25.3484276, lng: -49.178759 },
					info: "teste2"
				}
			];
		},
		styles() {
			return {
				hide: [
					{
						featureType: "all",
						stylers: [{ visibility: "off" }]
					},
					{
						featureType: "road",
						stylers: [{ visibility: "on" }]
					}
				]
			};
		}
	},
	created() {
		this.local();
	}
};
</script>