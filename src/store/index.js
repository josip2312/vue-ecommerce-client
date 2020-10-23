import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import productsModule from './modules/productsModule';
import userModule from './modules/userModule';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	plugins: [createPersistedState()],
	mutations: {},
	actions: {},
	modules: {
		productsModule,
		userModule,
	},
});
