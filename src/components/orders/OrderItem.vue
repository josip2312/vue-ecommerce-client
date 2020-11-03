<template>
	<div class="order">
		<div class="order-id">
			{{ orderId }}
		</div>

		<div class="order-main">
			<div class="order-name">
				{{ formatDate(order.createdAt) }}
			</div>
			<div class="order-price">$ {{ order.totalPrice }}</div>
		</div>

		<div class="order-sec">
			<div class="order-paid" :class="{ warning: !order.isPaid }">
				{{ order.isPaid ? 'Paid' : 'Not paid' }}
			</div>
			<div class="order-delivered" :class="{ warning: !order.isPaid }">
				{{ order.isDelivered ? 'Delivered ' : 'Not delivered' }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'OrderItem',
	props: {
		order: {
			type: Object,
			required: true,
		},
	},
	computed: {
		orderId() {
			return this.order._id.slice(5) + '...';
		},
	},
	methods: {
		formatDate(date) {
			return new Date(date).toLocaleDateString('hr');
		},
	},
};
</script>

<style lang="scss" scoped>
.order {
	background-color: var(--grey-light);
	padding: 2rem 1.5rem;
	border-radius: 0.5rem;

	display: flex;
	align-items: center;
	flex-direction: column;
	@media only screen and(min-width:$vp-12) {
		flex-direction: row;
	}
	cursor: pointer;
	& > * {
		display: flex;
		width: 100%;
		max-width: 40rem;
		align-items: center;
		justify-content: space-around;
		flex: 1;
		& > * {
			padding: 1.5rem 2rem;
		}
	}
	&-id {
		flex: 1;
		justify-content: center;
		text-align: center;
	}
	&-price {
		font-weight: 600;
	}
	&-paid {
		color: var(--success);
	}
	&-delivered {
		color: var(--success);
	}
}
.warning {
	color: var(--warning);
}
</style>
