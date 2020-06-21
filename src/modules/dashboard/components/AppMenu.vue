<template>
	<v-navigation-drawer
		:value="value"
		@input="$emit('input', $event)"
		:mini-variant="mini"
		absolute
		app
		temporary
	>
		<v-list>
			<v-list-item v-if="mini" @click="mini = !mini">
				<v-list-item-action>
					<v-icon>fas fa-chevron-right</v-icon>
				</v-list-item-action>
			</v-list-item>

			<v-list-item>
				<v-list-item-icon>
					<v-icon>fas fa-user-circle</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>{{user.name}}</v-list-item-title>
				</v-list-item-content>

				<v-list-item-action>
					<v-btn icon text @click="mini = !mini">
						<v-icon>fas fa-chevron-left</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>
		</v-list>

		<v-list class="pt-0" dense>
			<v-divider light />

			<v-list-item v-for="item of items" :key="item.title" :to="item.url" :exact="item.exact">
				<v-list-item-icon>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title @click="$emit('input', false)">{{item.title}}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import AuthService from "@/modules/auth/services/auth-service";
export default {
	name: "AppMenu",
	props: {
		value: Boolean
	},
	data() {
		return {
			items: [
				{
					title: "Home",
					icon: "fas fa-tachometer-alt",
					url: "/dashboard",
					exact: true
				},
				{
					title: "Receita",
					icon: "fas fa-plus-circle",
					url: "/dashboard/records/add?type=credit",
					exact: true
				},
				{
					title: "Despesa",
					icon: "fas fa-minus-circle",
					url: "/dashboard/records/add?type=debit",
					exact: true
				},
				{
					title: "Relatórios",
					icon: "fas fa-chart-bar",
					url: "/dashboard/reports",
					exact: true
				},
				{
					title: "Maps",
					icon: "fas fa-map",
					url: "/dashboard/maps",
					exact: true
				}
			],
			mini: false,
			user: null
		};
	},
	async created() {
		this.user = await AuthService.user();
	}
};
</script>