<template>
	<v-container fill-height>
		<v-layout justify-center align-center>
			<v-flex md3>
				<v-card class="elevation-5">
					<v-toolbar color="teal darken-1" dark>
						<v-toolbar-title class="text-center">{{texts.toolbar}}</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-progress-circular v-show="isLoading" indeterminate size="35" color="white" />
					</v-toolbar>

					<v-card-text>
						<v-form>
							<v-text-field
								v-if="!isLogin"
								prepend-icon="fas fa-user"
								label="nome"
								type="text"
								:error-messages="nameErrors"
								:success="!$v.user.name.$invalid"
								v-model.trim="$v.user.name.$model"
							/>
							<v-text-field
								prepend-icon="fas fa-envelope"
								label="email"
								type="email"
								:error-messages="emailErrors"
								:success="!$v.user.email.$invalid"
								v-model.trim="$v.user.email.$model"
							/>
							<v-text-field
								prepend-icon="fas fa-lock"
								label="senha"
								type="password"
								:error-messages="passwordErrors"
								:success="!$v.user.password.$invalid"
								v-model.trim="$v.user.password.$model"
							/>
						</v-form>

						<v-btn @click="isLogin = !isLogin" block text color="white" class="mt-3">{{texts.button}}</v-btn>
					</v-card-text>

					<v-card-actions>
						<v-spacer />
						<v-btn :disabled="$v.$invalid" @click="submit" color="teal darken-1" large>{{texts.toolbar}}</v-btn>
					</v-card-actions>

					<v-snackbar v-model="showSnackbar" top>
						{{error}}
						<v-btn icon color="pink lighten-1" @click="showSnackbar = false">
							<v-icon>fas fa-times</v-icon>
						</v-btn>
					</v-snackbar>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import AuthService from "../services/auth-service";
import { formatError } from "@/utils"

export default {
	name: "Login",
	data() {
		return {
			user: { name: null, email: null, password: null },
			isLogin: true,
			isLoading: false,
			showSnackbar: false,
			error: null
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
	methods: {
		async submit() {
			this.isLoading = true;
			try {
				const authData = this.isLogin
					? await AuthService.login(this.user)
					: await AuthService.signup(this.user);
			} catch (error) {
				this.error = formatError(error.message)
				this.showSnackbar = true;
			} finally {
				this.isLoading = false;
			}
		}
	},
	computed: {
		nameErrors() {
			const errors = [];
			const name = this.$v.user.name;

			if (!name.$dirty) {
				return errors;
			}
			!name.required ? errors.push("Campo obrigatório") : null;
			!name.minLength
				? errors.push(`Mínimo ${name.$params.minLength.min} caracteres`)
				: null;

			return errors;
		},
		emailErrors() {
			const errors = [];
			const email = this.$v.user.email;

			if (!email.$dirty) {
				return errors;
			}
			!email.required ? errors.push("Campo obrigatório") : null;
			!email.email ? errors.push("Campo obrigatório") : null;

			return errors;
		},
		passwordErrors() {
			const errors = [];
			const password = this.$v.user.password;

			if (!password.$dirty) {
				return errors;
			}
			!password.required ? errors.push("Campo obrigatório") : null;
			!password.minLength
				? errors.push(`Mínimo ${password.$params.minLength.min} caracteres`)
				: null;

			return errors;
		},
		texts() {
			return this.isLogin
				? { toolbar: "Login", button: "Criar conta" }
				: { toolbar: "Criar Conta", button: "Já tenho uma conta" };
		}
	}
};
</script>
