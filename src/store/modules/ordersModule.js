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
		[ADD_SHIPPING_INFO]: async ({ commit }, shippingData) => {
			commit(SET_SHIPPING_INFO, shippingData);
			router.push({ name: 'Payment' });
		},
		[ADD_PAYMENT_INFO]: async ({ commit }, paymentInfo) => {
			commit(SET_PAYMENT_INFO, paymentInfo);
			router.push({ name: 'PlaceOrder' });
		},

		[CREATE_ORDER]: async ({ commit, dispatch }, order) => {
			const { data } = await axios.post('/orders', order);
			commit(PUSH_CREATED_ORDER, data);
			dispatch(FETCH_SINGLE_ORDER, data._id);
		},
		[FETCH_MY_ORDERS]: async ({ commit }) => {
			const { data } = await axios.get('/orders/myorders');

			commit(SET_MY_ORDERS, data);
		},
		[FETCH_ALL_ORDERS]: async ({ commit }) => {
			const { data } = await axios.get('/orders');
			commit(SET_ALL_ORDERS, data);
		},
		[FETCH_SINGLE_ORDER]: async ({ commit }, id) => {
			const { data } = await axios.get(`/orders/order/${id}`);
			commit(SET_SINGLE_ORDER, data);

			router.push({
				name: 'OrderDetails',
				params: {
					id,
				},
			});
		},
		[PAY_ORDER]: async ({ commit }, orderData) => {
			const { orderId, paymentResult } = orderData;
			const { data } = await axios.put(
				`orders/${orderId}/pay`,
				paymentResult,
			);

			commit(SET_ORDER_PAID, data);
		},
		[MARK_ORDER_DELIVERED]: async ({ commit }, id) => {
			const { data } = await axios.put(`/orders/${id}/deliver`);
			commit(SET_SINGLE_ORDER, data);
			console.log(data);
		},
	},
};
