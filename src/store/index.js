import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import productsModule from './modules/productsModule';
import userModule from './modules/userModule';
import ordersModule from './modules/ordersModule';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	plugins: [
		createPersistedState({
			storage: window.localStorage,

			/* reducer: (store) => {
				console.log(store);
				if (!store.userModule.loggedIn) {
					return {};
				}
				return store;
			}, */
		}),
	],
	mutations: {},
	actions: {},
	modules: {
		productsModule,
		userModule,
		ordersModule,
	},
});
