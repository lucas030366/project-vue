<template>
	<mdb-container>

		<mdb-col lg="4" class="mx-auto mt-5">

			<form>

				<mdb-card class="z-depth-5">
					<mdb-card-header color="teal" class="text-center">LOGIN</mdb-card-header>

					<mdb-card-body>
						<mdb-input label="Email" type="email" icon="envelope" v-model.trim="$v.user.email.$model" />
						<mdb-input label="Senha" type="password" icon="lock" v-model.trim="$v.user.password.$model" />
						<mdb-btn @click="log" class="text-center">Criar Conta</mdb-btn>
					</mdb-card-body>

					<mdb-footer>
						<mdb-btn :disabled="$v.$invalid" @click="submit" color="teal" size="md" class="float-right">Login</mdb-btn>
					</mdb-footer>
				</mdb-card>

			</form>

		</mdb-col>

	</mdb-container>
</template>

<script>
import * as mdbvue from "mdbvue";

import { required, email, minLength } from "vuelidate/lib/validators"
export default {
	name: "Login",
	components: {
		...mdbvue
	},
	data() {
		return {
			user: {
				email: null,
				password: null
			}
		};
	},
	validations: {
		user:{
			email: {
				required, 
				email
			},
			password: {
				required,
				minLength: minLength(6)
			}
		}
	},
	methods: {
		log(){
			console.log("Vuelidate: ", this.$v)
		},
		submit(){
			console.log("User: ", this.user)
		}
	}
};
</script>
