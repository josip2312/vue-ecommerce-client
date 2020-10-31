import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import router from '@/router/index';

import {
	FETCH_PRODUCTS,
	FETCH_SINGLE_PRODUCT,
	REVIEW_PRODUCT,
	CREATE_PRODUCT,
	DELETE_PRODUCT,
	ADD_TO_CART,
} from '../constants/action_types';

import {
	SET_PRODUCTS,
	SET_SINGLE_PRODUCT,
	SET_REVIEWED_PRODUCT,
	SET_PRODUCT_ERROR,
	SET_DELETE_PRODUCT,
	PUSH_CREATED_PRODUCT,
	SET_CART,
} from '../constants/mutation_types';

Vue.use(Vuex);

export default {
	state: {
		cart: [],

		products: [],
		product: {},
		error: {
			errorMessage: '',
			showError: false,
		},
	},
	getters: {},
	mutations: {
		[SET_CART]: (state, productData) => {
			const { product, quantity } = productData;
			//adding quantity field for cart

			let found = state.cart.findIndex(
				(prod) => product._id === prod._id,
			);
			if (found !== -1) {
				console.log(state.cart[found]);
				state.cart[found].quantity += +quantity;
				return;
			} else {
				product.quantity = quantity;
				state.cart.push(product);
			}
		},
		[SET_PRODUCTS]: (state, data) => {
			state.products = data;
		},
		[SET_SINGLE_PRODUCT]: (state, product) => {
			state.product = product;
		},
		[SET_REVIEWED_PRODUCT]: (state, id) => {
			let product = state.products.find((product) => product._id === id);
			state.product = product;
		},
		[SET_DELETE_PRODUCT]: (state, id) => {
			state.products = state.products.filter(
				(product) => product._id !== id,
			);
		},

		[SET_PRODUCT_ERROR]: (state, errorMessage) => {
			state.error.errorMessage = errorMessage;
			state.error.showError = true;
			setTimeout(() => {
				state.error.showError = false;
			}, 3000);
		},
		[PUSH_CREATED_PRODUCT]: (state, product) => {
			state.products.push(product);
		},
	},
	actions: {
		[FETCH_PRODUCTS]: async ({ commit }) => {
			const res = await axios.get('products');

			commit(SET_PRODUCTS, res.data);
		},
		[FETCH_SINGLE_PRODUCT]: async ({ commit }, id) => {
			const res = await axios.get(`products/${id}`);
			commit(SET_SINGLE_PRODUCT, res.data);
			if (router.history.currentRoute !== 'ProductDetails') {
				router.push({ name: 'ProductDetails' });
			}
		},

		[REVIEW_PRODUCT]: async ({ commit, dispatch }, data) => {
			try {
				const { rating, comment, productId } = data;

				await axios.post(`products/${productId}/reviews`, {
					rating,
					comment,
				});

				dispatch(FETCH_SINGLE_PRODUCT, productId);
			} catch (error) {
				console.log(error.response);
				commit(SET_PRODUCT_ERROR, error.response.data.message);
			}
		},
		[DELETE_PRODUCT]: async ({ commit }, id) => {
			try {
				await axios.delete(`products/${id}`);

				commit(SET_DELETE_PRODUCT, id);
			} catch (error) {
				console.error(error);
			}
		},

		[CREATE_PRODUCT]: async ({ commit }, productData) => {
			try {
				const {
					name,
					price,
					brand,
					inStock,
					category,
					image,
					description,
				} = productData;

				const { data } = await axios.post('/products', {
					name,
					price,
					brand,
					inStock,
					category,
					image,
					description,
				});

				commit(PUSH_CREATED_PRODUCT, data);
			} catch (error) {
				console.error(error);
			}
		},
		[ADD_TO_CART]: async ({ commit }, productData) => {
			console.log(productData);
			commit(SET_CART, productData);
			router.push({ name: 'Cart' });
		},
	},
};
