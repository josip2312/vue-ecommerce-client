<template>
	<AdminItemContainer className="pointer">
		<template #item-content>
			<div class="order-id">
				<span>ID: </span>
				{{ order._id }}
			</div>
		</template>
		<template #item-main>
			<div class="order-date">
				<span>Date: </span>
				{{ formatDate(order.createdAt) }}
			</div>
			<div class="order-price">
				<span>Price: </span>$ {{ order.totalPrice }}
			</div>
		</template>
		<template #item-sec>
			<div class="order-paid" :class="{ warning: !order.isPaid }">
				{{ order.isPaid ? 'Paid' : 'Not paid' }}
			</div>
			<div class="order-delivered" :class="{ warning: !order.isPaid }">
				{{ order.isDelivered ? 'Delivered ' : 'Not delivered' }}
			</div>
		</template>
	</AdminItemContainer>
</template>

<script>
import AdminItemContainer from './AdminItemContainer';

export default {
	name: 'AdminOrder',
	props: {
		order: {
			type: Object,
			required: true,
		},
	},
	components: {
		AdminItemContainer,
	},
	methods: {
		formatDate(date) {
			return new Date(date).toLocaleDateString('hr');
		},
	},
};
</script>

<style lang="scss" scoped>
span {
	font-weight: 600;
	margin-right: 1rem;
}
.warning {
	color: var(--warning);
}
</style>
