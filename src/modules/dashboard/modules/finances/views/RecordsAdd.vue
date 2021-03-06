<template>
	<v-container text-center>
		<v-layout row wrap>
			<v-col xs="12" sm="6" md="4" lg="4">
				<NumericDisplay :color="color" v-model="$v.record.amount.$model" />
			</v-col>
			<v-col xs="12" sm="6" md="8" lg="8">
				<v-card>
					<v-card-text>
						<v-form>
							<v-dialog
								ref="dateDialog"
								v-model="showDateDialog"
								:return-value.sync="record.date"
								persistent
								width="290px"
								fullWidth
							>
								<template v-slot:activator="{ on }">
									<v-text-field
										name="date"
										label="Vencimento"
										prepend-icon="fas fa-calendar-alt"
										type="text"
										readonly
										:value="formattedDate"
										v-on="on"
									></v-text-field>
								</template>

								<v-date-picker :color="color" locale="pt-br" scrollable v-model="dateDialogValue">
									<v-spacer></v-spacer>
									<v-btn @click="cancelDateDialog" text :color="color">Cancelar</v-btn>
									<v-btn @click="$refs.dateDialog.save(dateDialogValue)" text :color="color">Ok</v-btn>
								</v-date-picker>
							</v-dialog>

							<v-select
								name="account"
								label="Conta"
								prepend-icon="fas fa-university"
								:items="accounts"
								item-text="description"
								item-value="id"
								v-model="$v.record.accountId.$model"
							>
								<v-list-item slot="prepend-item" ripple @click="add('account')">
									<v-list-item-action>
										<v-icon>fas fa-plus</v-icon>
									</v-list-item-action>
									<v-list-item-title>Conta</v-list-item-title>
									<v-divider />
								</v-list-item>
							</v-select>

							<v-select
								name="category"
								label="Categoria"
								prepend-icon="fas fa-shield-alt"
								:items="categories"
								item-text="description"
								item-value="id"
								v-model="$v.record.categoryId.$model"
							>
								<v-list-item slot="prepend-item" ripple @click="add('category')">
									<v-list-item-action>
										<v-icon>fas fa-plus</v-icon>
									</v-list-item-action>
									<v-list-item-title>Categoria</v-list-item-title>
									<v-divider slot="prepend-item" class="mt-2"></v-divider>
								</v-list-item>
							</v-select>

							<v-text-field
								name="description"
								label="Descrição"
								prepend-icon="fas fa-align-left"
								type="text"
								v-model.trim="$v.record.description.$model"
							></v-text-field>

							<v-text-field
								v-show="showTagsInput"
								name="tags"
								label="Tags"
								prepend-icon="fas fa-tags"
								type="text"
								v-model.trim="record.tags"
							></v-text-field>

							<v-text-field
								v-show="showNoteInput"
								name="note"
								label="Observação"
								prepend-icon="fas fa-sticky-note"
								type="text"
								v-model.trim="record.note"
							></v-text-field>
						</v-form>

						<v-tooltip left>
							<template v-slot:activator="{ on }">
								<v-btn @click="showTagsInput = !showTagsInput" v-on="on" icon small class="ma-3">
									<v-icon :color="color">fas fa-tags</v-icon>
								</v-btn>
							</template>
							<span>Adicionar Tags</span>
						</v-tooltip>

						<v-tooltip right>
							<template v-slot:activator="{ on }">
								<v-btn @click="showNoteInput = !showNoteInput" v-on="on" icon small class="ma-3">
									<v-icon :color="color">fas fa-sticky-note</v-icon>
								</v-btn>
							</template>
							<span>Adicionar uma observação</span>
						</v-tooltip>
					</v-card-text>
				</v-card>
				<v-btn @click="$router.back()" color="secondary" large fab class="ma-4">
					<v-icon>fas fa-times</v-icon>
				</v-btn>

				<v-btn @click="submit" :color="color" :disabled="$v.$invalid" large fab class="ma-4">
					<v-icon>fas fa-check</v-icon>
				</v-btn>
			</v-col>
		</v-layout>
		<v-dialog v-model="showAccountCategoryDialog" max-width="350px" persistent>
			<v-card>
				<AccountCategoryAdd
					v-if="showAccountCategoryDialog"
					@close="showAccountCategoryDialog=false"
					@saved="accountCategorySaved"
					:entity="entity"
				/>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import { mapActions } from "vuex";
import moment, { min } from "moment";
import { decimal, minLength, required } from "vuelidate/lib/validators";

import AccountsService from "../services/accounts-services";
import CategoriesService from "../services/categories-services";
import RecordsService from "../services/records-services";

import NumericDisplay from "../components/NumericDisplay";
import AccountCategoryAdd from "../components/AccountCategoryAdd";

import { Subject } from "rxjs";
import { mergeMap, distinctUntilChanged } from "rxjs/operators";

export default {
	name: "RecordsAdd",
	components: { NumericDisplay, AccountCategoryAdd },
	data() {
		return {
			record: {
				type: this.$route.query.type.toUpperCase(),
				amount: 0,
				date: moment().format("YYYY-MM-DD"),
				categoryId: null,
				accountId: null,
				description: null,
				note: null,
				tags: null
			},
			entity: null,
			operationSubject$: new Subject(),
			accounts: [],
			categories: [],
			subscriptions: [],
			showNoteInput: false,
			showTagsInput: false,
			showDateDialog: false,
			showAccountCategoryDialog: false,
			dateDialogValue: moment().format("YYYY-MM-DD")
		};
	},
	validations: {
		record: {
			type: { required },
			amount: { required, decimal, different: value => value != 0 },
			date: { required },
			accountId: { required },
			categoryId: { required },
			description: { required, minLength: minLength(6) }
		}
	},
	methods: {
		...mapActions(["setTitle"]),
		changeTitle(recordType) {
			let title = null;
			switch (recordType) {
				case "credit":
					title = "Nova Receita";
					break;

				case "debit":
					title = "Nova Despesa";
					break;

				default:
					title = "Novo Lançamento";
					break;
			}
			this.setTitle({ title });
		},
		async submit() {
			try {
				await RecordsService.createRecord(this.record);
				this.$router.push("/dashboard/records");
			} catch (error) {
				console.log("ERRO AO CRIAR", error);
			}
			console.log("Record: ", this.record);
		},
		cancelDateDialog() {
			this.showDateDialog = false;
			this.dateDialogValue = this.record.date;
		},
		add(entity) {
			this.showAccountCategoryDialog = true;
			this.entity = entity;
		},
		accountCategorySaved(item) {
			this.showAccountCategoryDialog = false;
			this.record[`${this.entity}Id`] = item.id;
		}
	},
	computed: {
		color() {
			switch (this.record.type) {
				case "CREDIT":
					return "primary";

				case "DEBIT":
					return "error";

				default:
					return "primary";
			}
		},
		formattedDate() {
			return moment(this.record.date).format("DD / MMM / YYYY"); //16-05-2020
		}
	},
	created() {
		this.changeTitle(this.$route.query.type);

		this.subscriptions.push(
			AccountsService.accounts().subscribe(
				accounts => (this.accounts = accounts)
			)
		);

		this.subscriptions.push(
			this.operationSubject$
				.pipe(
					distinctUntilChanged(),
					mergeMap(operation => CategoriesService.categories({ operation }))
				)
				.subscribe(categories => (this.categories = categories))
		);

		this.operationSubject$.next(this.$route.query.type);
	},
	beforeRouteUpdate(to, from, next) {
		const { type } = to.query;
		this.changeTitle(type);
		this.record.type = type.toUpperCase();
		this.record.categoryId = null;
		this.operationSubject$.next(type);
		next();
	},
	destroyed() {
		this.subscriptions.forEach(s => s.unsubscribe());
		console.log(this.subscriptions);
	}
};
</script>