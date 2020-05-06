<template>
	<v-toolbar color="primary">
		<v-layout align-center>
			<v-flex xs1>
				<div class="text-left">
					<v-btn icon text @click="decrement">
						<v-icon>fas fa-chevron-left</v-icon>
					</v-btn>
				</div>
			</v-flex>
			<v-flex xs10>
				<v-toolbar-title class="text-center">
					<span>{{ currentMonth }}</span>
				</v-toolbar-title>
			</v-flex>
			<v-flex xs1>
				<div class="text-right">
					<v-btn icon text @click="increment">
						<v-icon>fas fa-chevron-right</v-icon>
					</v-btn>
				</div>
			</v-flex>
		</v-layout>
	</v-toolbar>
</template>

<script>
import moment from "moment";

export default {
	name: "ToolbarByMonth",
	props: {
		format: String
	},
	data() {
		return {
			date: moment()
		};
	},
	methods: {
		emit() {
			this.$emit("month", this.date.format(this.format));
		},
		increment() {
			this.date = this.date.clone().add(1, "month");
			this.emit();
		},
		decrement() {
			this.date = this.date.clone().subtract(1, "month");
			this.emit();
		}
	},
	computed: {
		currentMonth() {
			return this.date.format("MMMM YYYY");
		}
	},
	created() {
		this.emit();
	}
};
</script>