<template>
	<section id="top-products" class="container">
		<h3 class="heading-3">
			Top products
		</h3>
		<div class="top-products">
			<ProductShowcase
				v-for="product in topProducts"
				:key="product._id"
				:product="product"
			/>
		</div>
		<router-link :to="{ name: 'Products' }" class="btn"
			>See all products</router-link
		>
	</section>
</template>

<script>
import ProductShowcase from '@/components/products/ProductShowcase';

import { FETCH_TOP_PRODUCTS } from '@/store/constants/action_types';
import { mapActions, mapState } from 'vuex';

export default {
	name: 'AppTopProducts',
	components: {
		ProductShowcase,
	},
	methods: {
		...mapActions([FETCH_TOP_PRODUCTS]),
	},
	computed: {
		...mapState({
			topProducts: (state) => state.productsModule.topProducts,
		}),
	},

	created() {
		this.FETCH_TOP_PRODUCTS();
	},
};
</script>

<style lang="scss" scoped>
.heading-3 {
	margin-bottom: 5rem;
}
.top-products {
	display: grid;
	gap: 5rem;
	grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
}
.btn {
	display: flex;
	justify-content: center;
	max-width: 50rem;
	margin: 0 auto;
	margin-top: 5rem;
	font-size: 2rem;
	padding: 1em 1.6em;
}
</style>
