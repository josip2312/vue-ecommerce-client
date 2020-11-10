<template>
	<section class="products container spacing">
		<div class="products-top">
			<h3 class="heading-3">Products</h3>
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
		<div class="no-products" v-if="products.length < 1">
			There are no products
		</div>
	</section>
</template>

<script>
import AdminProduct from "@/components/admin/AdminProduct";

import { mapState } from "vuex";
export default {
	name: "AdminProducts",
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
	&-top {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 5rem;
		.heading-3 {
			margin-right: 1.5rem;
			@media only screen and(max-width:$v-6) {
				padding-bottom: 2.5rem;
			}
		}
	}
}
.no-products {
	font-size: 2rem;
	color: var(--empty);
}
</style>
