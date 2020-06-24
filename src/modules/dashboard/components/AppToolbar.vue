<template>
	<v-toolbar fixed color="primary">
		<v-app-bar-nav-icon @click="$emit('hide', !show)" />
		<v-toolbar-title>{{ title || 'Dashboard'}}</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-toolbar-items>
			<v-btn icon @click="showLogoutDialog = true">
				<v-icon>fas fa-sign-out-alt</v-icon>
			</v-btn>
		</v-toolbar-items>

		<v-dialog v-model="showLogoutDialog" max-width="300">
			<v-card>
				<v-card-title>
					<h3 class="subheading">Deseja realmente sair?</h3>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn text small @click="showLogoutDialog = false">Cancelar</v-btn>
						<v-btn text small @click="logout">OK</v-btn>
					</v-card-actions>
				</v-card-title>
			</v-card>
		</v-dialog>
	</v-toolbar>
</template>

<script>
import { mapState } from "vuex";

import apollo, { onLogout } from "@/plugins/apollo";

export default {
	name: "AppToolbar",
	data() {
		return {
			show: false,
			showLogoutDialog: false
		};
	},
	model: {
		prop: "show",
		event: "hide"
	},
	methods: {
		async logout() {
			this.$router.push("/login");
			await onLogout(apollo);
		}
	},
	computed: {
		...mapState(["title"])
	}
};
</script>