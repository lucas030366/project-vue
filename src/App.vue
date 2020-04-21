<template>
	<section color="elegant-color">
		<router-view></router-view>
	</section>
</template>

<script>
import * as mdbvue from "mdbvue";
export default {
	components: {
		...mdbvue
	}
};
</script>

