<template>
	<section class="cart container">
		<CartItem
			v-for="product in cart"
			:key="product._id"
			:product="product"
		/>
		<div class="subtotal spacing-sm">
			<h4 class="heading-4">Subtotal ({{ itemsInCart }}) items</h4>
			<div class="total-price">$ {{ subtotal }}</div>
			<button class="btn">Proceed to checkout</button>
		</div>
	</section>
</template>

<script>
import CartItem from '@/components/products/CartItem';
import { mapState } from 'vuex';

export default {
	name: 'Cart',
	components: {
		CartItem,
	},

	computed: {
		...mapState({
			cart: (state) => state.productsModule.cart,
		}),
		subtotal() {
			let sum = this.cart.reduce((acc, item) => {
				return acc + item.quantity * item.price;
			}, 0);

			return sum;
		},
		itemsInCart() {
			let sum = this.cart.reduce((acc, item) => {
				return acc + parseInt(item.quantity);
			}, 0);

			return sum;
		},
	},
};
</script>

<style lang="scss" scoped>
.cart {
}
.subtotal {
	text-align: right;
	padding: 3rem 0;
	.items-in-cart {
	}
	.total-price {
		font-size: 2rem;
		font-weight: 600;
	}
}
</style>
