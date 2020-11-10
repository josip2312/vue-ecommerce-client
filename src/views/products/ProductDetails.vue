<template>
	<div class="container">
		<div class="product-details" v-if="!isLoading">
			<div class="product-details-image">
				<img :src="product.image" :alt="product.name" />
			</div>
			<div class="product-details-info spacing">
				<h2 class="heading-2 product-details-name">
					{{ product.name }}
				</h2>
				<div class="product-details-brand">{{ product.brand }}</div>
				<div class="product-details-price">$ {{ product.price }}</div>
				<div class="row">
					<StarRating :rating="product.rating" />
					<div class="product-details-numreview">
						{{ product.numReviews }} reviews
					</div>
				</div>
				<div class="product-details-description">
					{{ product.description }}
				</div>
				<div class="row buttons">
					<select class="product-details-instock" v-model="quantity">
						<option
							v-for="(item, index) in product.inStock"
							:key="index"
						>
							{{ item }}
						</option>
					</select>
					<button
						class="btn"
						@click.prevent="
							ADD_TO_CART({
								cartItem: {
									product: product._id,
									name: product.name,
									image: product.image,
									price: product.price,
									inStock: product.inStock,
								},
								quantity,
							})
						"
					>
						Add to cart
					</button>
				</div>
			</div>
		</div>

		<div v-if="isLoading" class="loading">Loading....</div>

		<div class="product-details-review">
			<h3 class="heading-3">User reviews</h3>

			<ProductReviews :reviews="product.reviews" />

			<transition name="fade" mode="out-in">
				<div class="product-error row" v-if="error.showError">
					<span> {{ error.errorMessage }}! </span>
					<img src="@/assets/icons/warning.svg" alt="" />
				</div>
			</transition>
			<ProductReviewForm v-if="isLoggedIn" :productId="product._id" />

			<div class="review-login" v-else @click="sendToLogin">
				Please login to leave a review
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

import ProductReviews from "@/components/products/ProductReviews";
import ProductReviewForm from "@/components/products/ProductReviewForm";
import StarRating from "@/components/products/StarRating";

import {
	ADD_TO_CART,
	FETCH_SINGLE_PRODUCT,
} from "@/store/constants/action_types";

export default {
	name: "ProductDetails",
	components: {
		ProductReviews,
		ProductReviewForm,
		StarRating,
	},
	data() {
		return {
			quantity: 1,
		};
	},

	computed: {
		...mapState({
			product: (state) => state.productsModule.product,
			error: (state) => state.productsModule.error,
		}),
		...mapGetters(["isLoggedIn", "isLoading"]),
	},
	methods: {
		...mapActions([ADD_TO_CART, FETCH_SINGLE_PRODUCT]),
		sendToLogin() {
			this.$router.push({ name: "Login" });
		},
	},
	mounted() {
		this.FETCH_SINGLE_PRODUCT(this.$route.params.id);
	},
};
</script>

<style lang="scss" scoped>
.loading {
	font-size: 2rem;
	color: var(--empty);
}
.product-details {
	display: flex;
	flex-direction: column;
	@media only screen and(min-width:$v-10) {
		flex-direction: row;
	}
	&-image {
		align-self: center;
		flex: 1.5;
	}
	&-info {
		flex: 1;

		display: flex;
		flex-direction: column;
		align-items: flex-start;

		padding: 5rem 0;
		@media only screen and(min-width:$v-10) {
			padding: 1rem 0 1rem 5rem;
		}
	}

	.row.buttons {
		margin-top: 5rem;

		.product-details-instock {
			padding: 0.8em 1.4em;
			border-radius: 0.5rem;
			background-color: var(--font-secondary);
			margin-right: 2.5rem;
		}
	}
	&-name {
		font-size: 3.5rem;
	}
	&-brand {
		font-size: 2.2rem;
		color: var(--accent);
	}
	&-price {
		color: var(--accent);
		font-size: 3rem;
	}
	&-numreview {
		margin-left: 1rem;
		color: var(--font-paragraph);
	}
	&-description {
		max-width: 45rem;
		color: var(--font-paragraph);
	}
}

.product-details-review {
	padding: 5rem 0;

	.heading-3 {
		margin-bottom: 5rem;
	}
}

.product-error {
	padding: 2rem 1.5rem;
	background-color: var(--warning-light);
	border-radius: 0.5rem;
	max-width: 40rem;
	margin-bottom: 1.5rem;
	font-size: 1.8rem;
	img {
		margin-left: 1.5rem;
		width: 2rem;
		height: 2rem;
	}
}

.review-login {
	padding: 2rem 1.5rem;
	background-color: var(--secondary-light);
	border-radius: 0.5rem;
	max-width: 40rem;

	cursor: pointer;
}
</style>
