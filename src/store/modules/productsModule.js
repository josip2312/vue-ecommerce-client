import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import router from '@/router/index';

import {
	FETCH_PRODUCTS,
	FETCH_SINGLE_PRODUCT,
	REVIEW_PRODUCT,
	CREATE_PRODUCT,
	EDIT_PRODUCT,
	DELETE_PRODUCT,
	ADD_TO_CART,
	REMOVE_FROM_CART,
	FETCH_TOP_PRODUCTS,
} from '../constants/action_types';

import {
	SET_PRODUCTS,
	SET_SINGLE_PRODUCT,
	SET_REVIEWED_PRODUCT,
	SET_PRODUCT_ERROR,
	SET_DELETE_PRODUCT,
	PUSH_CREATED_PRODUCT,
	PUSH_UPDATED_PRODUCT,
	SET_ADD_CART,
	CLEAR_CART,
	SET_REMOVE_CART,
	SET_TOP_PRODUCTS,
} from '../constants/mutation_types';

Vue.use(Vuex);

export default {
	state: {
		cart: [],

		products: [],
		page: 1,
		pages: 1,
		topProducts: [],
		product: {},
		error: {
			errorMessage: '',
			showError: false,
		},
	},
	getters: {},
	mutations: {
		[SET_ADD_CART]: (state, cartData) => {
			const { cartItem, quantity } = cartData;

			let found = state.cart.findIndex(
				(prod) => cartItem.product === prod.product,
			);

			if (found !== -1) {
				state.cart[found].quantity = quantity;
			} else {
				cartItem.quantity = quantity;

				state.cart.push(cartItem);
			}
		},
		[SET_REMOVE_CART]: (state, id) => {
			state.cart = state.cart.filter(
				(cartItem) => cartItem.product !== id,
			);
		},
		[CLEAR_CART]: (state) => {
			state.cart = [];
		},
		[SET_PRODUCTS]: (state, data) => {
			state.products = data.products;
			state.page = data.page;
			state.pages = data.pages;
		},
		[SET_TOP_PRODUCTS]: (state, data) => {
			state.topProducts = data;
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
		[PUSH_UPDATED_PRODUCT]: (state, product) => {
			let index = state.products.findIndex(
				(prod) => prod._id === product._id,
			);
			state.products[index] = product;
		},
	},
	actions: {
		[FETCH_PRODUCTS]: async ({ commit }, pageNumber = '') => {
			try {
				const { data } = await axios.get(
					`products?pageNumber=${pageNumber}`,
				);

				commit(SET_PRODUCTS, data);
			} catch (error) {
				console.error(error);
			}
		},
		[FETCH_TOP_PRODUCTS]: async ({ commit }) => {
			try {
				const { data } = await axios.get('products/all/top');
				commit(SET_TOP_PRODUCTS, data);
			} catch (error) {
				console.error(error);
			}
		},
		[FETCH_SINGLE_PRODUCT]: async ({ commit }, id) => {
			try {
				const res = await axios.get(`products/${id}`);
				commit(SET_SINGLE_PRODUCT, res.data);
			} catch (error) {
				console.error(error);
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
				console.error(error.response);
				commit(SET_PRODUCT_ERROR, error.response.data.message);
			}
		},
		[EDIT_PRODUCT]: async ({ commit }, productData) => {
			try {
				const {
					id,
					name,
					price,
					brand,
					inStock,
					category,
					image,
					description,
				} = productData;
				const { data } = await axios.put(`/products/${id}`, {
					name,
					price,
					brand,
					inStock,
					category,
					image,
					description,
				});

				commit(PUSH_UPDATED_PRODUCT, data);
				router.push({ name: 'AdminProducts' });
			} catch (error) {
				console.error(error);
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
				router.push({ name: 'AdminProducts' });
			} catch (error) {
				console.error(error);
			}
		},
		[ADD_TO_CART]: ({ commit }, cartItem) => {
			commit(SET_ADD_CART, cartItem);

			if (router.history.current.name !== 'Cart') {
				router.push({ name: 'Cart' });
			}
		},
		[REMOVE_FROM_CART]: ({ commit }, cartItemId) => {
			commit(SET_REMOVE_CART, cartItemId);
		},
	},
};
