<template>
	<v-container text-center>
		<v-layout row wrap>
			<v-col xs="12" sm="6" md="4" lg="4">
				<p>formulario</p>
			</v-col>
			<v-col xs="12" sm="6" md="8" lg="8">
				<v-card>
					<v-card-text>
						<v-form>

							<v-select name="account" label="Conta" prepend-icon="fas fa-university"></v-select>

							<v-select name="category" label="Categoria" prepend-icon="fas fa-shield-alt"></v-select>

							<v-text-field name="description" label="Descrição" prepend-icon="fas fa-align-left" type="text"></v-text-field>

							<v-text-field name="tags" label="Tags" prepend-icon="fas fa-tags" type="text"></v-text-field>

							<v-text-field name="note" label="Observação" prepend-icon="fas fa-sticky-note" type="text"></v-text-field>

						</v-form>
					</v-card-text>
				</v-card>
			</v-col>
		</v-layout>
	</v-container>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";
import { decimal, minLength, required } from "vuelidate/lib/validators";

export default {
	name: "RecordsAdd",
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
			}
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
		log(){
			console.log("Form: ", this.record)
		}
	},
	created() {
		this.changeTitle(this.$route.query.type);
	},
	beforeRouteUpdate(to, from, next) {
		const { type } = to.query;
		this.changeTitle(type);
		this.record.type = type.toUpperCase();
		next();
	}
};
</script>