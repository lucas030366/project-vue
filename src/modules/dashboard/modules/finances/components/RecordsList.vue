<template>
	<div>
		<ToolbarByMonth format="MM-YYYY" @month="changeMonth"  />

		<v-card v-if="records.length > 0">
			<v-list two-line subheader>
				<template v-for="(lancamentos, date, index) of mappedRecords">
					<v-subheader :key="date">{{ date }}</v-subheader>
					<RecordsListItem v-for="record in lancamentos" :key="record.id" :record="record" />
					<v-divider :key="`${date}-${index}`"></v-divider>
				</template>
			</v-list>
			<v-footer color="pa-2">
				<v-flex text-right>
					<h4 class="font-weight-bolder">
						<span>Saldo do mês:</span>
						<strong class="ml-5" :class="amountColor(totalAmount)">{{ formatCurrency(totalAmount) }}</strong>
					</h4>
				</v-flex>
			</v-footer>
		</v-card>

		<v-card v-else>
			<v-card-text color="grey" class="text-center">
				<v-icon size="100" class="grey--text">fas fa-clipboard-list</v-icon>
				<p class="mt-2 font-weight-bold">Nenhum lançamento encontrado</p>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
import moment from "moment";
import { groupBy } from "@/utils";

import amountColorMixin from "@/mixins/amount-color";
import formatCurrencyMixin from "@/mixins/format-currency";

import RecordsListItem from "./RecordsListItem";
import ToolbarByMonth from "./ToolbarByMonth";

import RecordsService from "../services/records-service";

export default {
	name: "RecordsList",
	mixins: [amountColorMixin, formatCurrencyMixin],
	components: {
		RecordsListItem,
		ToolbarByMonth
	},
	data() {
		return {
			records: {}
		};
	},
	methods: {
		changeMonth(month) {
			this.setRecords(month);
		},
		async setRecords(month) {
			this.records = await RecordsService.records({ month });
		}
	},
	computed: {
		mappedRecords() {
			return groupBy(this.records, "date", (record, dateKey) => {
				return moment(record[dateKey]).format("DD/MM/YYYY");
			});
		},
		totalAmount() {
			return this.records.reduce(
				(amount, newAmount) => amount + newAmount.amount,
				0
			);
		}
	}
};
</script>

<style scoped>
.v-list.v-sheet hr:last-child {
	display: none;
}
</style>