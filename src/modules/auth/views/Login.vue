<template>
	<v-container fill-height color="red">
		<v-col lg="4" class="mx-auto">

			<v-card class="elevation-5">
				<v-toolbar color="primary" dark>
					<v-toolbar-title>Login</v-toolbar-title>
				</v-toolbar>

				<v-card-text>
					<v-form>
						<v-text-field prepend-icon="fas fa-envelope" label="email" name="email" type="email">
						</v-text-field>
						<v-text-field prepend-icon="fas fa-lock" label="senha" name="password" type="password"></v-text-field>
					</v-form>

					<v-btn block depressed>Criar conta</v-btn>

				</v-card-text>

				<v-card-actions>
					<v-spacer/>
					<v-btn color="primary" large>Login</v-btn>
				</v-card-actions>

			</v-card>

		</v-col>
	</v-container>
</template>

<script>
export default {
	name: "Login"
};
</script>