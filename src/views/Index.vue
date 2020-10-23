<template>
	<div class="home">
		<AppShowcase />
		<AppProducts />
	</div>
</template>

<script>
import AppShowcase from '@/components/landing/AppShowcase.vue';
import AppProducts from '@/components/landing/AppProducts.vue';

export default {
	name: 'Index',
	components: {
		AppShowcase,
		AppProducts,
	},
};
</script>
