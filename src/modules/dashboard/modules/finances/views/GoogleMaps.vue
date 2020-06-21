<template>
	<v-container>
		<googlemaps-map
			:center="center"
			:zoom="17"
			:options="{styles: styles['hide']}"
			style="height:500px"
		>
			<googlemaps-marker v-for="marker of markers" :key="marker._id" :position="marker.position" />
		</googlemaps-map>
	</v-container>
</template>

<script>
export default {
	name: "GoogleMaps",
	data() {
		return {
			center: { lat: -25.3482577, lng: -49.1792121 },
			markers: [
				{ position: { lat: -25.3482577, lng: -49.1792121 } },
				{ position: { lat: -25.3499388, lng: -49.1779297 } }
			],
			styles: {
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
			}
		};
	}
};
</script>