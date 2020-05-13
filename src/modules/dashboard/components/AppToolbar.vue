<template>
	<v-toolbar fixed color="primary">
		<v-app-bar-nav-icon @click="$emit('hide', !show)" />
		<v-toolbar-title>{{ title || 'Dashboard'}}</v-toolbar-title>
	</v-toolbar>
</template>

<script>

import { mapState } from "vuex"

export default {
	name: "AppToolbar",
	data() {
		return {
			show: false
		};
	},
	model: {
		prop: "show",
		event: "hide"
	},
	computed:{
		...mapState(["title"])
	}
};
</script>