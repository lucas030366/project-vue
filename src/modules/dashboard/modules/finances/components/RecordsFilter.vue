<template>
	<div>
		<div class="d-inline-flex">
			<v-col>
				<v-btn icon>
					<v-icon>fas fa-times</v-icon>
				</v-btn>
			</v-col>
			<v-col>
				<v-btn icon @click="showFilterDialog = !showFilterDialog">
					<v-icon>fas fa-filter</v-icon>
				</v-btn>
			</v-col>
		</div>

		<v-dialog v-model="showFilterDialog" max-width="350px">
			<v-card>
				<v-card-title>
					<h3 class="headline">Filtros</h3>
					<v-spacer></v-spacer>
					<v-btn icon @click="showFilterDialog = !showFilterDialog">
						<v-icon>fas fa-times</v-icon>
					</v-btn>
					<v-btn icon @click="filter">
						<v-icon>fas fa-check</v-icon>
					</v-btn>
				</v-card-title>

				<v-card-text>
					<v-list three-line>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>Tipo de Lançamento</v-list-item-title>
								<v-list-item-subtitle>
									<v-select
										placeholder="Todos os lançamentos"
										chips
										deletable-chips
										:items="operations"
										item-text="description"
										item-value="value"
										@change="localFilters.type = $event"
									></v-select>
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>

						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>Conta</v-list-item-title>
								<v-list-item-subtitle>
									<v-select
										placeholder="Todos as Contas"
										chips
										deletable-chips
										multiple
										:items="accounts"
										item-text="description"
										item-value="id"
										@change="localFilters.accountsIds = $event"
									></v-select>
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>

						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>Categoria</v-list-item-title>
								<v-list-item-subtitle>
									<v-select
										placeholder="Todos as Categorias"
										chips
										deletable-chips
										multiple
										:items="categories"
										item-text="description"
										item-value="id"
										@change="localFilters.categoriesIds = $event"
									></v-select>
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import AccountsService from "../services/accounts-services";
import CategoriesService from "../services/categories-services";

export default {
	name: "RecordsFilter",
	data() {
		return {
			accounts: [],
			categories: [],
			operations: [
				{ description: "Receita", value: "CREDIT" },
				{ description: "Despesa", value: "DEBIT" }
			],
			subscriptions: [],
			showFilterDialog: false,
			localFilters: {
				type: null,
				accountsIds: [],
				categoriesIds: []
			}
		};
	},
	methods: {
		filter() {
			console.log("KKK", this.localFilters);
		},
		setItems() {
			this.subscriptions.push(
				CategoriesService.categories().subscribe(
					categories => (this.categories = categories)
				)
			);
			this.subscriptions.push(
				AccountsService.accounts().subscribe(
					accounts => (this.accounts = accounts)
				)
			);
		}
	},
	created() {
		this.setItems();
	},
	destroyed() {
		this.subscriptions.forEach(s => s.unsubscribe());
	}
};
</script>