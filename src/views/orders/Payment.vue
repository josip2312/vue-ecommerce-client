<template>
	<section class="payment container">
		<CheckoutSteps stepOne="stepOne" stepTwo="stepTwo" />

		<h3 class="heading-3">Payment method</h3>
		<div class="payment-method spacing">
			<div class="select-heading">Select method</div>
			<div class="select-method">
				<input
					type="radio"
					name="paymentMethod"
					id="paymentMethod"
					v-model="paymentMethod"
					value="PayPal"
				/>
				<label for="paymentMethod">Paypal or debit card</label>
			</div>
			<button
				@click.prevent="ADD_PAYMENT_INFO({ paymentMethod })"
				class="btn"
			>
				Continue
			</button>
		</div>
	</section>
</template>

<script>
import CheckoutSteps from '@/components/orders/CheckoutSteps';

import { ADD_PAYMENT_INFO } from '@/store/constants/action_types';

import { mapActions } from 'vuex';
export default {
	name: 'Payment',
	components: {
		CheckoutSteps,
	},
	data() {
		return {
			paymentMethod: '',
		};
	},
	methods: {
		...mapActions([ADD_PAYMENT_INFO]),
	},
};
</script>

<style lang="scss" scoped>
.heading-3 {
	width: 100%;
	max-width: 60rem;
	margin: 0 auto;
	padding-bottom: 5rem;
}
.payment-method {
	width: 100%;
	max-width: 60rem;
	margin: 0 auto;

	.select-heading {
		font-size: 2.5rem;
		font-weight: 500;
		margin-bottom: 2rem;
	}
	.select-method {
		display: flex;
		align-items: center;
	}
	input {
		display: inline-block;
		width: 2rem;
		height: 2rem;
		margin-right: 2rem;
	}
}
</style>
