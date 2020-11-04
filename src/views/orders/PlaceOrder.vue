<template>
	<section class="place-order container">
		<CheckoutSteps
			stepOne="stepOne"
			stepTwo="stepTwo"
			stepThree="stepThree"
		/>
		<div class="order">
			<div class="order-info spacing-xl">
				<div class="shipping-info">
					<h3 class="heading-3">Shipping</h3>
					<div class="address">
						{{ shippingInfo.address }} {{ shippingInfo.city }}
					</div>

					<div class="postal-code">{{ shippingInfo.postalCode }}</div>
					<div class="country">{{ shippingInfo.country }}</div>
				</div>
				<div class="payment">
					<h3 class="heading-3">Payment method</h3>
					<div class="payment-method">
						Method: {{ paymentInfo.paymentMethod }}
					</div>
				</div>
				<div class="order-items">
					<h3 class="heading-3">Order items</h3>
					<div
						class="order-item"
						v-for="item in cart"
						:key="item._id"
					>
						<div class="order-item-image">
							<img :src="item.image" :alt="item.name" />
						</div>
						<div class="order-item-name">
							{{ item.name }}
						</div>
						<div class="order-item-qty">
							{{ item.quantity }}x ${{ item.price }}
						</div>
					</div>
				</div>
			</div>
			<div class="order-summary">
				<h3 class="heading-3">Order summary</h3>
				<div class="items">
					<span>
						Items
					</span>
					<span> $ {{ subtotal }} </span>
				</div>
				<div class="shipping">
					<span>
						Shipping
					</span>
					<span> $ {{ shippingPrice }} </span>
				</div>
				<div class="tax">
					<span>
						Tax
					</span>
					<span> $ {{ taxPrice }} </span>
				</div>
				<div class="total">
					<span>
						Total
					</span>
					<span> $ {{ totalPrice }} </span>
				</div>
				<button
					class="btn"
					@click.prevent="
						CREATE_ORDER({
							orderItems: cart,
							shippingAddress: shippingInfo,
							paymentMethod: paymentInfo.paymentMethod,
							itemsPrice: subtotal,
							shippingPrice,
							taxPrice,
							totalPrice,
						})
					"
				>
					Place order
				</button>
			</div>
		</div>
	</section>
</template>

<script>
import CheckoutSteps from '@/components/orders/CheckoutSteps';

import { CREATE_ORDER } from '@/store/constants/action_types';

import { mapActions, mapState } from 'vuex';

export default {
	name: 'PlaceOrder',
	components: {
		CheckoutSteps,
	},

	computed: {
		...mapState({
			shippingInfo: (state) => state.ordersModule.shippingInfo,
			paymentInfo: (state) => state.ordersModule.paymentInfo,
			cart: (state) => state.productsModule.cart,
		}),

		subtotal() {
			let sum = this.cart.reduce((acc, item) => {
				return acc + item.quantity * item.price;
			}, 0);

			return sum;
		},
		taxPrice() {
			return this.addDecimals(Number((0.15 * this.subtotal).toFixed(2)));
		},
		shippingPrice() {
			return this.addDecimals(this.subtotal > 100 ? 0 : 10);
		},
		totalPrice() {
			return (
				Number(this.subtotal) +
				Number(this.shippingPrice) +
				Number(this.taxPrice)
			).toFixed(2);
		},
	},
	methods: {
		...mapActions([CREATE_ORDER]),
		addDecimals(num) {
			return (Math.round(num * 100) / 100).toFixed(2);
		},
	},
};
</script>

<style lang="scss" scoped>
.order {
	display: flex;

	flex-direction: column;
	@media only screen and(min-width:$vp-8) {
		align-items: flex-start;
		flex-direction: row;
	}
}
.order-info {
	flex: 2;
	display: flex;
	flex-direction: column;
}
.order-summary {
	flex: 1;
	margin-top: 5rem;
	display: flex;
	align-items: center;
	flex-direction: column;
	background-color: var(--grey-light);
	padding: 2.5rem;
	@media only screen and(min-width:$vp-8) {
		margin-top: 0;
	}
	.heading-3 {
		margin-bottom: 2.5rem;
	}
	& > * + * {
		margin-top: 2rem;
	}

	.btn {
		margin-top: 2.5rem;
		width: 100%;
	}
}
.items,
.shipping,
.tax,
.total {
	width: 100%;
	max-width: 40rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: 500;
}

.shipping-info {
	.heading-3 {
		padding-top: 2.5rem;
		margin-bottom: 2.5rem;
	}
	& > * + * {
		margin-top: 0.5rem;
	}
}
.payment {
	.heading-3 {
		margin-bottom: 2.5rem;
	}
}
.order-items {
	.heading-3 {
		margin-bottom: 2.5rem;
	}
}
.order-item {
	display: flex;
	align-items: center;
	padding: 2rem 1rem;
	background-color: var(--grey-light);

	&:not(:last-child) {
		border-bottom: 1px solid var(--grey);
	}
	&-image {
		flex: 1;
		max-width: 20rem;
		img {
			max-width: 10rem;
		}
	}
	&-name {
		flex: 1;
		max-width: 25rem;
		font-weight: 600;
	}
	&-qty {
		flex: 1;
		max-width: 10rem;
		font-weight: 600;
	}
}
</style>
