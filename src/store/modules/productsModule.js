import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

import { FETCH_PRODUCTS } from '../constants/action_types';
import { SET_PRODUCTS } from '../constants/mutation_types';

Vue.use(Vuex);

export default {
	state: {
		products: [],
	},
	getters: {},
	mutations: {
		[SET_PRODUCTS]: (state, data) => {
			state.products = data;
		},
	},
	actions: {
		[FETCH_PRODUCTS]: async ({ commit }) => {
			const res = await axios.get('products');
			console.log(res.data);
			commit(SET_PRODUCTS, res.data);
		},
	},
};
