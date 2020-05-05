<template>
	<div>
		<v-list v-if="records.length > 0" two-line>    
			<RecordsListItem v-for="record in records" :key="record.id" :record="record" />
		</v-list>

   <v-alert v-else type="warning" dense bolder="top" class="mt-4">
      Sem registros
    </v-alert>
	</div>
</template>

<script>
import RecordsListItem from "./RecordsListItem";

import RecordsService from "../services/records-service";

export default {
	name: "RecordsList",
	components: {
		RecordsListItem
	},
	data() {
		return {
			records: {}
		};
	},
	async created() {
    this.records = await RecordsService.records();
	}
};
</script>