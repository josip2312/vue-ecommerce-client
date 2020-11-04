<template>
	<section class="orders container">
		<h3 class="heading-3">
			Orders
		</h3>
		<AdminOrder
			v-for="order in orders"
			:key="order._id"
			:order="order"
			@click.native="FETCH_SINGLE_ORDER(order._id)"
		/>
		<div class="no-orders" v-if="orders.length < 1">
			There are no orders
		</div>
	</section>
</template>

<script>
import AdminOrder from '@/components/admin/AdminOrder';

import {
	FETCH_ALL_ORDERS,
	FETCH_SINGLE_ORDER,
} from '@/store/constants/action_types';

import { mapState, mapActions } from 'vuex';

export default {
	name: 'AdminOrders',
	components: {
		AdminOrder,
	},
	computed: {
		...mapState({
			orders: (state) => state.ordersModule.allOrders,
		}),
	},
	methods: {
		...mapActions([FETCH_ALL_ORDERS, FETCH_SINGLE_ORDER]),
	},
	created() {
		this.FETCH_ALL_ORDERS();
	},
};
</script>

<style lang="scss" scoped>
.heading-3 {
	margin-bottom: 5rem;
}
</style>
