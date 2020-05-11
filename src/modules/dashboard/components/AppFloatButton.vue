<template>
	<v-speed-dial
		v-model="fab"
		fixed
		bottom
		right
		direction="top"
		transition="slide-y-reverse-transition"
	>
		<template v-slot:activator>
			<v-btn v-model="fab" fab color="warning">
				<v-icon v-if="!fab">fas fa-plus</v-icon>
				<v-icon v-else>fas fa-times</v-icon>
			</v-btn>
		</template>
		<v-btn fab small color="error" title="Nova despesa" @click="addRecord('debit')">
			<v-icon>fas fa-minus</v-icon>
		</v-btn>
		<v-btn fab small color="primary" title="Nova receita" @click="addRecord('credit')">
			<v-icon>fas fa-plus</v-icon>
		</v-btn>
	</v-speed-dial>
</template>

<script>
export default {
  name: "AppFloatButton",
  data(){
    return{
      fab: false
    }
  },
  methods: {
    addRecord(type){
      this.$router.push({
        name: 'recordsAdd',
        query: { type }
      })
    }
  }
}
</script>