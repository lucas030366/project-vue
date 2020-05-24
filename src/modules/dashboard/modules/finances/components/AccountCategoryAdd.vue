<template>
	<v-card>
		<v-card-title class="headline">{{ title }}</v-card-title>
		<v-card-text>
			<v-text-field label="Descrição" v-model="$v.item.description.$model"></v-text-field>
			<v-select
				v-if="entity === 'category' "
				label="Operação"
				v-model="$v.item.operation.$model"
				:items="operations"
				item-text="description"
				item-value="value"
			></v-select>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text @click="$emit('close')">Cancelar</v-btn>
			<v-btn text :disabled="$v.$invalid" @click="save" color="primary">Salvar</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import AccoutsService from "../services/accounts-services";
import CategoriesService from "../services/categories-services";

import { required, minLength } from "vuelidate/lib/validators";
export default {
	name: "AccountCategoryAdd",
	props: {
		entity: String
	},
	data() {
		return {
			item: {
				description: null,
				operation: this.$route.query.type.toUpperCase()
			},
			operations: [
				{ description: "Receita", value: "CREDIT" },
				{ description: "Despesa", value: "DEBIT" }
			]
		};
	},
	validations() {
		const validations = {
			item: {
				description: { required, minLength: minLength(3) }
			}
		};

		if (this.entity === "account") {
			return validations;
		}

		return {
			item: {
				...validations.item,
				operation: { required }
			}
		};
	},
	methods: {
		async save() {
			let promise = null;

			switch (this.entity) {
				case 'account':
					promise = AccoutsService.createAccount(this.item);
					break;

				case 'category':
					promise = CategoriesService.createCategory(this.item);
					break;
			}
			const item = await promise;
	
			this.$emit("saved", item)
		}
	},
	computed: {
		title() {
			return this.entity === "account" ? "Nova Conta" : "Nova Categoria";
		}
	}
};
</script>