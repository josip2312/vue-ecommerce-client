<template>
	<div class="products spacing">
		<div class="products-top">
			<h3 class="heading-3">
				Products
			</h3>
			<router-link
				:to="{ name: 'CreateProduct' }"
				class="btn create-product"
				>Create product</router-link
			>
		</div>

		<AdminProduct
			v-for="product in products"
			:key="product._id"
			:product="product"
		>
		</AdminProduct>
	</div>
</template>

<script>
import AdminProduct from '@/components/admin/AdminProduct';

import { mapState } from 'vuex';
export default {
	name: 'ProductsList',
	components: {
		AdminProduct,
	},
	computed: {
		...mapState({
			products: (state) => state.productsModule.products,
		}),
	},
};
</script>

<style lang="scss" scoped>
.products {
	width: 80%;
	max-width: 120rem;
	margin: 0 auto;
	padding: 7.5rem 0;

	&-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 5rem;
	}
}
</style>
