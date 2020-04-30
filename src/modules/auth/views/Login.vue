<template>
	<v-container fill-height>
		<v-layout justify-center align-center>
			<v-flex md3>
				<v-card class="elevation-5">
					<v-toolbar color="teal darken-1" dark>
						<v-toolbar-title>Login</v-toolbar-title>
					</v-toolbar>

					<v-card-text>
						<v-form>
							<v-text-field prepend-icon="fas fa-envelope" label="email" name="email" type="email" v-model.trim="$v.user.email.$model" />
							<v-text-field prepend-icon="fas fa-lock" label="senha" name="password" type="password" v-model.trim="$v.user.password.$model" />
						</v-form>

						<v-btn @click="log" block depressed color="secondary">Criar conta</v-btn>
					</v-card-text>

					<v-card-actions>
						<v-spacer />
						<v-btn :disabled="$v.$invalid" @click="submit" color="teal darken-1" large>Login</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
	name: "Login",
	data() {
		return {
			user: { email: null, password: null }
		};
	},
	validations: {
		user: {
			email: { required, email },
			password: { required, minLength: minLength(4) }
		}
	},
	methods:{
		log(){
			console.log("Vuelidate", this.$v)
		},
		submit(){
			console.log("User:", this.user)
		}
	}
};
</script>