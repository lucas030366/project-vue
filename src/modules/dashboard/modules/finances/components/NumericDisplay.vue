<template>
	<v-card :color="color">
		<v-card-title>
			<v-spacer></v-spacer>
			<h3 class="display-2 font-weight-bolder pt-3">{{ display }}</h3>
		</v-card-title>
		<v-card-text>
			<v-row justify="end">
				<v-col v-for="numBtn of buttons" :key="numBtn" lg="4" class="px-2">
					<v-btn @click="change(numBtn, 'add')" :color="color" block class="headline">{{ numBtn }}</v-btn>
				</v-col>
				<v-col lg="4" class="px-2">
					<v-btn @click="change" icon>
						<v-icon>fas fa-backspace</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
import FormatCurrencyMixin from "@/mixins/format-currency";

export default {
	name: "NumericDisplay",
	mixins: [ FormatCurrencyMixin ],
	props: {
    color: String,
    value: Number
	},
	data() {
		return {
			buttons: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0], //ordem do teclado			
		};
  },
  methods: {
    change(numBtn, operation){
      const currentValue = this.value.toFixed(2)
      const total = operation === "add" ? (+(currentValue + numBtn) * 10) : (+currentValue.slice(0,-1) / 10)
      this.$emit('input', total)
    }
  },
  computed: {
    display(){
      return this.formatCurrency(this.value || 0)
    }
  }
};
</script>