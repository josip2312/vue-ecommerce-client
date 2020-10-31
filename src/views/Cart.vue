<template>
	<section class="cart">
		<CartItem
			v-for="product in cart"
			:key="product._id"
			:product="product"
		/>
		{{ subtotal }}
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
			console.log(sum);
			return sum;
		},
	},
};
</script>

<style lang="scss" scoped>
.cart {
	padding: 7.5rem 0;
	width: 80%;
	max-width: 120rem;
	margin: 0 auto;
}
.subtotal {
	text-align: right;
	padding: 2rem 0;
}
</style>
