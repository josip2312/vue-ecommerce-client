import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import router from '@/router/index';

import {
	ADD_PAYMENT_INFO,
	ADD_SHIPPING_INFO,
	CREATE_ORDER,
	FETCH_MY_ORDERS,
	FETCH_ALL_ORDERS,
	FETCH_SINGLE_ORDER,
	PAY_ORDER,
	MARK_ORDER_DELIVERED,
} from '../constants/action_types';

import {
	SET_SHIPPING_INFO,
	SET_PAYMENT_INFO,
	PUSH_CREATED_ORDER,
	SET_MY_ORDERS,
	SET_ALL_ORDERS,
	SET_SINGLE_ORDER,
	SET_ORDER_PAID,
} from '../constants/mutation_types';

Vue.use(Vuex);

export default {
	state: {
		myOrders: [],
		allOrders: [],
		orderDetails: {},
		shippingInfo: {},
		paymentInfo: {},
	},
	getters: {},
	mutations: {
		[SET_SHIPPING_INFO]: (state, data) => {
			state.shippingInfo = data;
		},
		[SET_PAYMENT_INFO]: (state, data) => {
			state.paymentInfo = data;
		},
		[PUSH_CREATED_ORDER]: (state, order) => {
			state.orders.push(order);
		},
		[SET_MY_ORDERS]: (state, orders) => {
			state.myOrders = orders;
		},
		[SET_ALL_ORDERS]: (state, allOrders) => {
			state.allOrders = allOrders;
		},
		[SET_SINGLE_ORDER]: (state, order) => {
			state.orderDetails = order;
		},
		[SET_ORDER_PAID]: (state, order) => {
			state.orderDetails = order;
		},
	},
	actions: {
		[ADD_SHIPPING_INFO]: ({ commit }, shippingData) => {
			commit(SET_SHIPPING_INFO, shippingData);
			router.push({ name: 'Payment' });
		},
		[ADD_PAYMENT_INFO]: ({ commit }, paymentInfo) => {
			commit(SET_PAYMENT_INFO, paymentInfo);
			router.push({ name: 'PlaceOrder' });
		},

		[CREATE_ORDER]: async ({ commit }, order) => {
			try {
				const { data } = await axios.post('/orders', order);
				commit(PUSH_CREATED_ORDER, data);
				const id = data._id;
				router.push({
					name: 'OrderDetails',
					params: {
						id,
					},
				});
			} catch (error) {
				console.error(error);
			}
		},
		[FETCH_MY_ORDERS]: async ({ commit }) => {
			try {
				const { data } = await axios.get('/orders/myorders');

				commit(SET_MY_ORDERS, data);
			} catch (error) {
				console.error(error);
			}
		},
		[FETCH_ALL_ORDERS]: async ({ commit }) => {
			try {
				const { data } = await axios.get('/orders');
				commit(SET_ALL_ORDERS, data);
			} catch (error) {
				console.error(error);
			}
		},
		[FETCH_SINGLE_ORDER]: async ({ commit }, id) => {
			try {
				const { data } = await axios.get(`/orders/order/${id}`);
				commit(SET_SINGLE_ORDER, data);
			} catch (error) {
				console.error(error);
			}
		},
		[PAY_ORDER]: async ({ commit }, orderData) => {
			try {
				const { orderId, paymentResult } = orderData;
				const { data } = await axios.put(
					`orders/${orderId}/pay`,
					paymentResult,
				);
				commit(SET_ORDER_PAID, data);
			} catch (error) {
				console.error(error);
			}
		},
		[MARK_ORDER_DELIVERED]: async ({ commit }, id) => {
			try {
				const { data } = await axios.put(`/orders/${id}/deliver`);
				commit(SET_SINGLE_ORDER, data);
				console.log(data);
			} catch (error) {
				console.error(error);
			}
		},
	},
};
