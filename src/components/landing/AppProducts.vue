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
import Product from '@/components/layout/Product';

export default {
	name: 'AppProducts',
	components: {
		Product,
	},
	data() {
		return {
			products: [
				{
					_id: 1,
					name: 'Name',
				},
				{
					_id: 2,
					name: 'Name2',
				},
			],
		};
	},
};
</script>

<style scoped></style>
