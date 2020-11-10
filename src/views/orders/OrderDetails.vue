<template>
	<section class="container">
		<h2 class="heading-2">Order {{ $route.params.id }}</h2>
		<div class="order">
			<div class="order-info spacing-xl">
				<div class="shipping-info">
					<h3 class="heading-3">Shipping</h3>
					<div class="address">
						{{ order.shippingAddress.address }}
						{{ order.shippingAddress.city }}
					</div>

					<div class="postal-code">
						{{ order.shippingAddress.postalCode }}
					</div>
					<div class="country">
						{{ order.shippingAddress.country }}
					</div>
					<div
						class="delivered"
						:class="{ warning: !order.isDelivered }"
					>
						{{ isDelivered }}
					</div>
				</div>
				<div class="payment">
					<h3 class="heading-3">Payment method</h3>
					<div class="payment-method">
						Method:
						<span>
							{{ order.paymentMethod }}
						</span>
					</div>

					<div class="paid" :class="{ warning: !order.isPaid }">
						{{ isPaid }}
					</div>
				</div>
				<div class="order-items">
					<h3 class="heading-3">Order items</h3>
					<div
						class="order-item"
						v-for="item in order.orderItems"
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
					<span> Items </span>
					<span> $ {{ subtotal }} </span>
				</div>
				<div class="shipping">
					<span> Shipping </span>
					<span> $ {{ order.shippingPrice }} </span>
				</div>
				<div class="tax">
					<span> Tax </span>
					<span> $ {{ order.taxPrice }} </span>
				</div>
				<div class="total">
					<span> Total </span>
					<span> $ {{ order.totalPrice }} </span>
				</div>

				<div v-if="!isAdmin" id="paypal-button"></div>
				<button
					v-else
					class="btn"
					@click="MARK_ORDER_DELIVERED(order._id)"
				>
					Mark as delivered
				</button>
			</div>
		</div>
		<OrderModal
			:isOrderPlaced="isOrderPlaced"
			@hide-order-modal="hideOrderModal"
		/>
	</section>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters, mapState } from "vuex";

import OrderModal from "@/components/orders/OrderModal";
import {
	PAY_ORDER,
	MARK_ORDER_DELIVERED,
	FETCH_SINGLE_ORDER,
} from "@/store/constants/action_types";

export default {
	name: "OrderDetails",
	data() {
		return {
			isOrderPlaced: false,
		};
	},
	components: {
		OrderModal,
	},
	computed: {
		...mapState({
			order: (state) => state.ordersModule.orderDetails,
		}),
		...mapGetters(["isAdmin"]),
		isPaid() {
			return this.order.isPaid
				? `Paid on ${this.formatDate(this.order.paidAt)}`
				: "Not paid";
		},
		isDelivered() {
			return this.order.isDelivered
				? `Delivered on ${this.formatDate(this.order.deliveredAt)}`
				: "Not delivered";
		},
		subtotal() {
			let sum = this.order.orderItems.reduce((acc, item) => {
				return acc + item.quantity * item.price;
			}, 0);

			return sum;
		},
	},
	methods: {
		...mapActions([PAY_ORDER, MARK_ORDER_DELIVERED, FETCH_SINGLE_ORDER]),
		formatDate(date) {
			return new Date(date).toLocaleDateString("hr");
		},
		async addPayPalScript() {
			try {
				const { data: clientId } = await axios.get(
					"/api/config/paypal"
				);
				const script = document.createElement("script");
				script.type = "text/javascript";
				script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`;
				script.async = true;
				script.onload = () => {
					this.renderPayPalButton();
				};
				document.body.appendChild(script);
			} catch (error) {
				console.error(error);
			}
		},
		renderPayPalButton() {
			let vm = this;
			window.paypal
				.Buttons({
					env: "sandbox",

					locale: "en-BA",
					style: {
						color: "gold",
					},
					createOrder: function (data, actions) {
						return actions.order.create({
							purchase_units: [
								{
									amount: {
										value: vm.order.totalPrice,
									},
								},
							],
						});
					},
					onApprove: function (data, actions) {
						return actions.order.capture().then(function (details) {
							vm.PAY_ORDER({
								orderId: vm.order._id,
								paymentResult: {
									id: details.id,
									status: details.status,
									email_address: details.payer.email_address,
									update_time: details.update_time,
								},
							});
							vm.showOrderModal();
						});
					},
				})
				.render("#paypal-button");
		},
		showOrderModal() {
			this.isOrderPlaced = true;
			setTimeout(() => {
				if (this.isOrderPlaced) {
					this.isOrderPlaced = false;
				}
			}, 5000);
		},
		hideOrderModal() {
			this.isOrderPlaced = false;
		},
	},

	mounted() {
		this.FETCH_SINGLE_ORDER(this.$route.params.id);
		if (!this.isAdmin) {
			this.addPayPalScript();
		}
	},
};
</script>

<style lang="scss" scoped>
.heading-2 {
	margin-bottom: 5rem;
}
.order {
	display: flex;

	flex-direction: column;
	@media only screen and(min-width:$v-10) {
		align-items: flex-start;
		flex-direction: row;
	}
}
.order-info {
	flex: 2;
	display: flex;
	flex-direction: column;
	margin-right: 2.5rem;
}
.order-summary {
	flex: 1;
	margin-top: 5rem;
	display: flex;
	align-items: center;
	flex-direction: column;
	background-color: var(--grey-light);
	padding: 2.5rem;
	@media only screen and(min-width:$v-10) {
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

	&-method {
		span {
			font-weight: 600;
		}
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
		font-weight: 600;
		max-width: 25rem;
	}
	&-qty {
		max-width: 10rem;
		font-weight: 600;

		flex: 1;
	}
}
#paypal-button {
	width: 100%;
}
.paid {
	margin-top: 1rem;
	padding: 1.5rem 2.5rem;
	background-color: #b5fbdd;
	font-size: 1.8rem;
	font-weight: 600;
	max-width: 50rem;
	border-radius: 0.5rem;
}
.delivered {
	margin-top: 1rem;
	padding: 1.5rem 2.5rem;
	background-color: #b5fbdd;
	font-size: 1.8rem;
	font-weight: 600;
	max-width: 50rem;
	border-radius: 0.5rem;
}
.warning {
	background-color: var(--warning-light);
	color: var(--warning);
}
</style>
