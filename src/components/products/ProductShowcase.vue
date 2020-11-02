<template>
	<div class="product spacing-sm">
		<div class="product-image" @click="FETCH_SINGLE_PRODUCT(product._id)">
			<img :src="product.image" alt="A product image" />
		</div>
		<div class="product-info spacing">
			<div class="product-heading">
				<div class="brand">{{ product.brand }}</div>
				<div class="name">{{ product.name }}</div>
			</div>
			<div class="product-ratings">
				<StarRating :rating="product.rating" />

				<div class="num-reviews">{{ product.numReviews }} reviews</div>
			</div>
			<div class="price">$ {{ product.price }}</div>
		</div>
	</div>
</template>

<script>
import { FETCH_SINGLE_PRODUCT } from '@/store/constants/action_types';
import { mapActions } from 'vuex';

import StarRating from '@/components/products/StarRating';

export default {
	name: 'Product',
	components: {
		StarRating,
	},
	props: {
		product: {
			type: Object,
			required: true,
		},
	},
	methods: {
		...mapActions([FETCH_SINGLE_PRODUCT]),
	},
};
</script>

<style scoped lang="scss">
.product {
	.product-image {
		cursor: pointer;
		img {
			width: 100%;

			height: 100%;
			object-fit: cover;
		}
	}
}
.product-info {
	padding: 1rem 3.5rem;
	.product-heading {
		display: flex;
		align-items: center;
		font-size: 1.8rem;
		font-weight: 600;
		.brand {
			margin-right: 1.5rem;
		}
	}
	.product-ratings {
		display: flex;
		align-items: center;
		.num-reviews {
			margin-left: 1.5rem;
		}
	}
	.price {
		font-size: 2.5rem;
		font-weight: 600;
	}
}
</style>
