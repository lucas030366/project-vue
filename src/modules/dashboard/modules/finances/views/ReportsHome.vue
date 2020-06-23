<template>
	<v-container>
		<ToolbarByMonth
			format="MM-YY"
			:month="month || $route.query.month"
			@month="changeMonth"
			color="primary"
		/>

		<v-row>
			<v-col lg="6" v-for="grafico of charts" :key="grafico.title">
				<v-card>
					<v-card-text>
						<h2 class="font-weight-bolder my-2">{{ grafico.title }}</h2>
						<canvas :ref="grafico.refId"></canvas>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import chart from "chart.js";
import { mapActions, mapState } from "vuex";

import { generateChartJsConfig } from "@/utils";

import { Subject } from "rxjs";
import { mergeMap } from "rxjs/operators";

import ToolbarByMonth from "../components/ToolbarByMonth";
import recordsServices from "../services/records-services";

export default {
	name: "ReportHome",
	components: { ToolbarByMonth },
	data() {
		return {
			monthSubject$: new Subject(),
			records: [],
			subscriptions: [],
			recXdes: null,
			catDes: null,
			charts: [
				{ title: "Receitas x Despesas", refId: "recXdes" },
				{ title: "Despesas por Categoria", refId: "catDes" }
			]
		};
	},
	methods: {
		...mapActions(["setTitle"]),
		...mapActions("finances", ["setMonth"]),
		changeMonth(month) {
			this.$router.push({
				path: this.$route.month,
				query: { month }
			});
			this.setMonth({ month });
			this.monthSubject$.next(month);
		},
		setRecords() {
			this.subscriptions.push(
				this.monthSubject$
					.pipe(mergeMap(month => recordsServices.records({ month })))
					.subscribe(records => {
						this.records = records;
						this.setCharts();
					})
			);
		},
		updateOrCreateChart(chartId, options) {
			if (this[chartId]) {
				this[chartId].data.datasets = options.data.datasets;

				if (options.data.labels) {
					this[chartId].data.labels = options.data.labels;
				}

				this[chartId].update();
				return this[chartId];
			}

			const ref = Array.isArray(this.$refs[chartId])
				? this.$refs[chartId][0]
				: this.$refs[chartId];

			const ctx = ref.getContext("2d");

			this[chartId] = new Chart(ctx, options);
			return this[chartId]
		},
		setCharts() {
			//RECEITAS E DESPESAS
			this.updateOrCreateChart("recXdes", generateChartJsConfig({
				type: "bar",
				items: this.records,
				keyToGroup: "type", //DEBIT ou CREDIT
				keyOfValue: "amount",
				aliases: { CREDIT: "Receitas", DEBIT: "Despesas" },
				bgColor: ["#c2185b", "#00897b"]
			}))

			//DESPESAS POR CATEGORIAS
			this.updateOrCreateChart("catDes", generateChartJsConfig({
				type: "doughnut",
				items: this.records.filter(r => r.type == "DEBIT"),
				keyToGroup: "category.description",
				keyOfValue: "amount",
				bgColor: ["orange", "blue", "green", "yellow"]
			}))

		}
	},
	computed: {
		...mapState("finances", ["month"])
	},
	created() {
		this.setTitle({ title: "Relatórios" });
		this.setRecords();
	},
	destroyed() {
		this.subscriptions.forEach(s => s.unsubscribe());
	}
};
</script>