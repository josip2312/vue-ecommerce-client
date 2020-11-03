<template>
	<section class="cart container">
		<h3 class="heading-3">Cart</h3>

		<CartItem
			v-for="cartItem in cart"
			:key="cartItem.product"
			:cartItem="cartItem"
		/>

		<div v-if="cart.length < 1" class="no-cart">No items in cart</div>

		<div class="subtotal spacing-sm">
			<h4 class="heading-4">Subtotal ({{ itemsInCart }}) items</h4>
			<div class="total-price">$ {{ addDecimals(subtotal) }}</div>
			<router-link :to="{ name: 'Shipping' }" class="btn"
				>Proceed to checkout</router-link
			>
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
	methods: {
		addDecimals(num) {
			return (Math.round(num * 100) / 100).toFixed(2);
		},
	},
};
</script>

<style lang="scss" scoped>
.heading-3 {
	margin-bottom: 5rem;
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
