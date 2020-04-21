<template>
	<mdb-container>
		<mdb-col lg="4" class="mx-auto mt-5">
			<form>
				<mdb-card class="z-depth-5 elegant-color">
					<mdb-card-header color="teal" class="text-center">{{ texts.text }}</mdb-card-header>

					<mdb-card-body>
						<mdb-input v-if="!isLogin" label="Nome" type="text" icon="user-circle white-text" v-model.trim="$v.user.name.$model"/>

						<mdb-input label="Email" type="email" icon="envelope white-text" v-model.trim="$v.user.email.$model" />

						<mdb-input label="Senha" type="password" icon="lock white-text" v-model.trim="$v.user.password.$model" />
					</mdb-card-body>
	
					<h6 @click="isLogin = !isLogin" class="white-text font-weight-bolder text-center">{{ texts.button }}</h6>

					<button type="submit" :disabled="$v.$invalid" @click="submit" class="btn btn-md teal float-right white-text">
						{{ texts.text }}
					</button>

				</mdb-card>
			</form>
		</mdb-col>
	</mdb-container>
</template>

<script>
import * as mdbvue from "mdbvue";

import { required, email, minLength } from "vuelidate/lib/validators";

export default {
	name: "Login",
	components: {
		...mdbvue
	},
	data() {
		return {
			user: { name: null, email: null, password: null },
			isLogin: true
		};
	},
	validations() {
		const validations = {
			user: {
				email: { required, email },
				password: { required, minLength: minLength(6) }
			}
		};

		if (this.isLogin) {
			return validations;
		}

		return {
			user: {
				...validations.user,
				name: { required, minLength: minLength(3) }
			}
		};
	},
	computed: {
		texts() {
			return this.isLogin
				? { text: "Login", button: "Criar Conta" }
				: { text: "Criar Conta", button: "Já tenho uma conta" };
		}
	},
	methods: {
		submit() {
			console.log("User: ", this.user);
		}
	}
};
</script>
