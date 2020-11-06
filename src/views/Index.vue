<template>
	<div class="home">
		<AppShowcase />
		<!-- <AppProducts /> -->
		<AppTopProducts />
	</div>
</template>

<script>
import AppShowcase from '@/components/landing/AppShowcase.vue';
/* import AppProducts from '@/components/landing/AppProducts.vue'; */
import AppTopProducts from '@/components/landing/AppTopProducts.vue';

export default {
	name: 'Index',
	components: {
		AppShowcase,
		/* AppProducts, */
		AppTopProducts,
	},
};
</script>
