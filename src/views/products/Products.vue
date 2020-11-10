<template>
	<section id="products" class="container">
		<h3 class="heading-3">Products</h3>
		<div class="search">
			<img src="@/assets/icons/search.svg" alt="Search" />
			<input
				type="text"
				name="search"
				id="search"
				placeholder="Search items..."
				v-model="searchTerm"
			/>
		</div>
		<div v-if="filteredProducts.length < 1" class="no-products">
			Sorry, there are no products available
		</div>
		<transition-group name="fade" mode="out-in" tag="div" class="products">
			<ProductShowcase
				v-for="product in filteredProducts"
				:key="product._id"
				:product="product"
			/>
		</transition-group>

		<Pagination />
	</section>
</template>

<script>
import ProductShowcase from "@/components/products/ProductShowcase";
import Pagination from "@/components/layout/Pagination";

import { mapActions, mapState } from "vuex";

import { FETCH_PRODUCTS } from "@/store/constants/action_types";

export default {
	name: "Products",
	components: {
		ProductShowcase,
		Pagination,
	},
	data() {
		return {
			searchTerm: "",
		};
	},
	computed: {
		...mapState({
			products: (state) => state.productsModule.products,
		}),
		filteredProducts() {
			return this.products.filter((product) => {
				return (
					product.name
						.toLowerCase()
						.match(this.searchTerm.toLowerCase()) ||
					product.brand
						.toLowerCase()
						.match(this.searchTerm.toLowerCase())
				);
			});
		},
	},
	methods: {
		...mapActions([FETCH_PRODUCTS]),
	},
	watch: {
		$route: function () {
			this.FETCH_PRODUCTS(this.$route.params.pageNumber);
		},
	},
	created() {
		this.FETCH_PRODUCTS(this.$route.params.pageNumber);
	},
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
	transition: opacity 200ms ease-in-out;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
.products {
	display: grid;
	min-height: 90vh;
	gap: 5rem;
	grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
	animation: up 1000ms ease forwards;
}
.no-products {
	font-size: 2rem;
	color: var(--empty);
}
.heading-3 {
	margin-bottom: 5rem;
}
.search {
	padding: 1rem 2rem;
	margin-bottom: 5rem;
	border-radius: 0.5rem;
	display: flex;
	align-items: center;
	background-color: var(--grey-light);
	img {
		margin-right: 1.5rem;
		width: 4rem;
	}
	input {
		width: 100%;
		padding: 1rem;
		background-color: var(--grey-light);
		outline: none;
		border: none;
		border-bottom: 1px solid var(--grey-light);
		transition: border 250ms ease-in-out;
	}
	input:focus {
		border-bottom: 1px solid var(--accent);
	}
}
</style>
