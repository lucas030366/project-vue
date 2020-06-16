<template>
	<div>
		<TotalBalance class="mb-2" />
		<ToolbarByMonth
			format="MM-YYYY"
			:month="month || $route.query.month"
			:showSlot="true"
			@month="changeMonth"
		>
			<RecordsFilter @filter="filter" />
		</ToolbarByMonth>

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
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("finances");

import moment from "moment";
import { groupBy } from "@/utils";
import { Subject } from "rxjs";
import { mergeMap } from "rxjs/operators";

import amountColorMixin from "@/mixins/amount-color";
import formatCurrencyMixin from "@/mixins/format-currency";

import RecordsFilter from "./RecordsFilter";
import RecordsListItem from "./RecordsListItem";
import ToolbarByMonth from "./ToolbarByMonth";
import TotalBalance from "./TotalBalance";

import RecordsService from "../services/records-services";

export default {
	name: "RecordsList",
	mixins: [amountColorMixin, formatCurrencyMixin],
	components: {
		RecordsListItem,
		ToolbarByMonth,
		TotalBalance,
		RecordsFilter
	},
	data() {
		return {
			records: [],
			filtersSubject$: new Subject(), //emissor de eventos
			subscriptions: []
		};
	},
	methods: {
		...mapActions(["setMonth"]),
		changeMonth(month) {
			this.$router.push({
				path: this.$route.path,
				query: { month }
			});
			this.setMonth({ month });
			this.filter();
		},
		setRecords() {
			this.subscriptions.push(
				this.filtersSubject$
					.pipe(mergeMap(variables => RecordsService.records(variables)))
					.subscribe(records => (this.records = records))
			);
		},
		filter() {
			this.filtersSubject$.next({ month: this.month, ...this.filters });
		}
	},
	computed: {
		...mapState(["filters", "month"]),
		mappedRecords() {
			return groupBy(this.records, "date", (record, dateKey) => {
				return moment(record[dateKey].substr(0, 10)).format("DD/MM/YYYY");
			});
		},
		totalAmount() {
			return this.records.reduce(
				(amount, newAmount) => amount + newAmount.amount,
				0
			);
		}
	},
	created() {
		this.setRecords();
	},
	destroyed() {
		this.subscriptions.forEach(s => s.unsubscribe());
	}
};
</script>

<style scoped>
.v-list.v-sheet hr:last-child {
	display: none;
}
</style>