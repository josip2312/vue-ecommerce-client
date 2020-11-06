<template>
	<div class="product spacing-sm">
		<div class="product-image" @click="sendToProductDetails(product._id)">
			<img :src="product.image" alt="A product image" />
		</div>
		<div class="product-info spacing">
			<div class="product-heading">
				<div class="name">{{ product.brand }} {{ product.name }}</div>
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
		sendToProductDetails(id) {
			this.$router.push({
				name: 'ProductDetails',
				params: {
					id,
				},
			});
		},
	},
};
</script>

<style scoped lang="scss">
.appear-enter-active,
.appear-leave-active {
	transition: opacity 750ms ease-in-out;
}
.appear-enter,
.appear-leave-to {
	opacity: 0;
}
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
		font-size: 1.8rem;
		font-weight: 600;
		color: var(--primary-dark);
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
