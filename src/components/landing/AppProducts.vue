<template>
	<section id="products" class="products">
		<Product
			v-for="product in products"
			:key="product._id"
			:product="product"
		/>
	</section>
</template>

<script>
import Product from '@/components/products/ProductShowcase';

import { mapState } from 'vuex';

export default {
	name: 'AppProducts',
	components: {
		Product,
	},
	computed: {
		...mapState({
			products: (state) => state.productsModule.products,
		}),
	},
	data() {
		return {};
	},
};
</script>

<style scoped lang="scss">
.products {
	width: 85%;
	max-width: 120rem;
	margin: 0 auto;
	padding: 7.5rem 0;

	display: grid;
	column-gap: 3.5rem;
	grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
}
</style>
