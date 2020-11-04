<template>
	<ItemContainer className="pointer">
		<template #item-content>
			<div class="order-id">
				<span class="tag">ID: </span>
				<span>
					{{ orderId }}
				</span>
			</div>
		</template>
		<template #item-main>
			<div class="order-date">
				<span class="tag">Date: </span>
				<span>
					{{ formatDate(order.createdAt) }}
				</span>
			</div>
			<div class="order-price">
				<span class="tag">Price: </span>

				<span> $ {{ order.totalPrice }} </span>
			</div>
		</template>
		<template #item-sec>
			<div class="order-paid" :class="{ warning: !order.isPaid }">
				{{ order.isPaid ? 'Paid' : 'Not paid' }}
			</div>
			<div
				class="order-delivered"
				:class="{ warning: !order.isDelivered }"
			>
				{{ order.isDelivered ? 'Delivered ' : 'Not delivered' }}
			</div>
		</template>
	</ItemContainer>
</template>

<script>
import ItemContainer from '@/components/layout/ItemContainer';

export default {
	name: 'OrderItem',
	props: {
		order: {
			type: Object,
			required: true,
		},
	},
	components: {
		ItemContainer,
	},
	computed: {
		orderId() {
			return this.order._id.slice(0, 10) + '...';
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
.order-paid {
	color: var(--success);
}
.order-delivered {
	color: var(--success);
}
.warning {
	color: var(--warning);
}
</style>
