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
} from '../constants/action_types';

import {
	SET_SHIPPING_INFO,
	SET_PAYMENT_INFO,
	PUSH_CREATED_ORDER,
	SET_MY_ORDERS,
	SET_ALL_ORDERS,
} from '../constants/mutation_types';

Vue.use(Vuex);

export default {
	state: {
		myOrders: [],
		allOrders: [],
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

		[CREATE_ORDER]: async ({ commit }, order) => {
			const { data } = await axios.post('/orders', order);
			commit(PUSH_CREATED_ORDER, data);
		},
		[FETCH_MY_ORDERS]: async ({ commit }) => {
			const { data } = await axios.get('/orders/myorders');
			console.log(data);
			commit(SET_MY_ORDERS, data);
		},
		[FETCH_ALL_ORDERS]: async ({ commit }) => {
			const { data } = await axios.get('/orders');
			console.log(data);
			commit(SET_ALL_ORDERS, data);
		},
	},
};
