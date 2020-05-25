<template>
	<div>
		<div class="d-inline-flex">
			<v-col>
				<v-btn icon>
					<v-icon>fas fa-times</v-icon>
				</v-btn>
			</v-col>
			<v-col>
				<v-btn icon @click="showFilterDialog = !showFilterDialog">
					<v-icon>fas fa-filter</v-icon>
				</v-btn>
			</v-col>
		</div>

		<v-dialog v-model="showFilterDialog" max-width="350px">
			<v-card>
				<v-card-title>
					<h3 class="headline">Filtros</h3>
          <v-spacer></v-spacer>
          <v-btn icon @click="showFilterDialog = !showFilterDialog">
            <v-icon>fas fa-times</v-icon>
          </v-btn>
          <v-btn icon @click="filter">
            <v-icon>fas fa-check</v-icon>
          </v-btn>
				</v-card-title>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	name: "RecordsFilter",
	data() {
		return {
			showFilterDialog: false
		};
  },
  methods: {
    filter(){
      console.log("KKK")
    }
  }
};
</script>