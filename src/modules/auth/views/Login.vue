<template>
	<mdb-container>
		<mdb-col lg="4" class="mx-auto mt-5">
			<form>
				<mdb-card class="z-depth-5">
					<mdb-card-header color="teal" class="text-left py-3">
						{{ texts.text }}
						<div v-show="isLoading" class="spinner-border float-right" role="status"></div>
					</mdb-card-header>

					<mdb-card-body>
						<mdb-input
							v-if="!isLogin"
							label="Nome"
							type="text"
							icon="user-circle"
							v-model.trim="$v.user.name.$model"
						/>

						<mdb-input label="Email" type="email" icon="envelope" v-model.trim="$v.user.email.$model" />

						<mdb-input label="Senha" type="password" icon="lock" v-model.trim="$v.user.password.$model" />
					</mdb-card-body>

					<h6
						@click="isLogin = !isLogin"
						class="blue-text font-weight-bolder text-center"
					>{{ texts.button }}</h6>

					<button
						type="button"
						:disabled="$v.$invalid"
						@click="submit"
						class="btn btn-md teal float-right white-text"
					>{{ texts.text }}</button>
				</mdb-card>

				<mdb-alert v-show="showAlert" color="warning" class="mt-4">
					<i @click="showAlert = !showAlert" class="fas fa-times float-right"></i>
					{{ error }}
				</mdb-alert>
			</form>
		</mdb-col>
	</mdb-container>
</template>

<script>
import * as mdbvue from "mdbvue";
import {formatError} from "@/utils"

import AuthService from "../services/auth-service";

import { required, email, minLength } from "vuelidate/lib/validators";

export default {
	name: "Login",
	components: {
		...mdbvue
	},
	data() {
		return {
			user: { name: null, email: null, password: null },
			isLogin: true,
			isLoading: false,
			error: null,
			showAlert: false
		};
	},
	validations() {
		const validations = {
			user: {
				email: { required, email },
				password: { required, minLength: minLength(4) }
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
		async submit() {
			this.isLoading = true;

			try {
				this.isLogin
					? await AuthService.login(this.user)
					: await AuthService.signup(this.user);
				this.$router.push(this.$route.query.redirect || "/dashboard")
			} catch (error) {
				this.error = formatError(error.message);
				this.showAlert = true;
			} finally {
				this.isLoading = false;
			}
		}
	}
};
</script>
