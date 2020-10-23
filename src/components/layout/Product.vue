<template>
	<div class="product">
		<div class="product-image">
			<img src="@/assets/images/product.jpg" alt="A product image" />
		</div>
		<div class="product-heading">
			<div class="name">{{ product.name }}</div>
			<div class="brand">{{ product.brand }}</div>
		</div>
		<div class="product-ratings">
			<div class="rating">{{ product.rating }}</div>
			<div class="num-reviews">{{ product.numReviews }}</div>
		</div>
		<div class="price">
			{{ product.price }}
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: 'Product',

	props: {
		product: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style scoped lang="scss"></style>
