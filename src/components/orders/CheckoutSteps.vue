<template>
	<div class="checkout-steps">
		<div class="shipping" :class="{ completed: stepOne }">Shipping</div>
		<div class="payment" :class="{ completed: stepTwo }">Payment</div>
		<div class="place-order" :class="{ completed: stepThree }">
			Place order
		</div>
	</div>
</template>

<script>
export default {
	name: 'CheckoutSteps',
	props: {
		stepOne: {
			type: String,
		},
		stepTwo: {
			type: String,
		},
		stepThree: {
			type: String,
		},
	},
};
</script>

<style lang="scss" scoped>
.checkout-steps {
	display: flex;
	justify-content: space-between;
	margin: 0 auto;
	width: 100%;
	max-width: 60rem;
	padding-bottom: 5rem;

	font-size: 1.8rem;
	& > * {
		opacity: 0.7;
	}
}
.completed {
	opacity: 1;
	font-weight: 600;
}
</style>
