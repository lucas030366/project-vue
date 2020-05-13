<template>
	<RecordsList />
</template>

<script>
import { mapActions } from "vuex";
import RecordsList from "../components/RecordsList";

export default {
	name: "RecordsHome",
	components: {
		RecordsList
	},
	methods: {
		...mapActions(["setTitle"])
	},
	created() {
		this.setTitle({ title: "Lançamentos" });
	}
};
</script>