<template>
	<div>
		<AppToolbar v-model="drawer" />
		<AppMenu v-model="drawer"/>

		<v-container grid-list-md>
			<v-layout>
				<v-flex md12>
					<slot/> <!--Puxando o router view de Dashboard-->
				</v-flex>
			</v-layout>
		</v-container>

		<AppFloatButton/>
	</div>
</template>

<script>
import AppToolbar from "./AppToolbar";
import AppFloatButton from "./AppFloatButton";
import AppMenu from "./AppMenu";

export default {
	name: "AppLayout",
	components: {
		AppToolbar,
		AppMenu,
		AppFloatButton
	},
	data(){
		return{
			drawer: false
		}
	}
};
</script>