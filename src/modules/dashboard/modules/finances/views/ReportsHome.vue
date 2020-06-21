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
		createChart(chartId, options) {
			const ref = Array.isArray(this.$refs[chartId])
				? this.$refs[chartId][0]
				: this.$refs[chartId];

			const ctx = ref.getContext("2d");

			return new Chart(ctx, options);
		},
		setCharts() {
			const chartRecDesConfigs = generateChartJsConfig({
				type: "bar",
				items: this.records,
				keyToGroup: "type", //DEBIT ou CREDIT
				keyOfValue: "amount",
				aliases: { CREDIT: "Receitas", DEBIT: "Despesas" },
				bgColor: ["#00897b", "#c2185b"]
			});

			if (this.recXdes) {
				this.recXdes.data.datasets = chartRecDesConfigs.data.datasets;
				this.recXdes.update();
			} else {
				this.recXdes = this.createChart("recXdes", chartRecDesConfigs);
			}
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