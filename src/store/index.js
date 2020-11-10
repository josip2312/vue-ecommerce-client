import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import productsModule from './modules/productsModule';
import userModule from './modules/userModule';
import ordersModule from './modules/ordersModule';

import {
	SUCCESS,
	CLEAR_SUCCESS,
	ERROR,
	CLEAR_ERROR,
} from '@/store/constants/mutation_types';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		loading: false,
		success: true,
		successMessage: '',
		error: false,
		errorMessage: '',
	},
	plugins: [
		createPersistedState({
			storage: window.localStorage,
		}),
	],
	getters: {
		isLoading: (state) => state.loading,
		isError: (state) => state.error,
		isSuccess: (state) => state.success,
		getErrorMessage: (state) => state.errorMessage,
		getSuccessMessage: (state) => state.successMessage,
	},
	mutations: {
		[SUCCESS]: (state, successMessage) => {
			state.success = true;
			state.successMessage = successMessage;
		},
		[CLEAR_SUCCESS]: (state) => {
			state.success = false;
			state.successMessage = '';
		},
		[ERROR]: (state, errorMessage) => {
			state.error = true;
			state.errorMessage = errorMessage;
		},
		[CLEAR_ERROR]: (state) => {
			state.error = false;
			state.errorMessage = '';
		},
	},
	actions: {},
	modules: {
		productsModule,
		userModule,
		ordersModule,
	},
});
