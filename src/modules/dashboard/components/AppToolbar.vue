<template>
	<v-toolbar fixed color="primary">
		<v-app-bar-nav-icon @click="$emit('hide', !show)"/>
		<v-toolbar-title>Dashboard</v-toolbar-title>
	</v-toolbar>
</template>

<script>
export default {
	name: "AppToolbar",
	props: {
		show: true
	},
	model: {
		prop: "show",
		event: "hide"
	}
};
</script>