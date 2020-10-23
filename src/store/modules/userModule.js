import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

import { LOGIN_USER, REGISTER_USER } from '../constants/action_types';
import { SET_USER } from '../constants/mutation_types';
import router from '@/router/index';

Vue.use(Vuex);

export default {
	state: {
		userData: {},
	},
	getters: {
		getJWT: (state) => state.userData.token,
	},
	mutations: {
		[SET_USER]: (state, data) => {
			state.userData = data;
		},
	},
	actions: {
		[LOGIN_USER]: async ({ commit }) => {
			try {
				const res = await axios.post('users/login');
				console.log(res.data);
				commit(SET_USER, res.data);
				router.push({ name: 'Index' });
			} catch (error) {
				console.log(error);
			}
		},
		[REGISTER_USER]: async ({ commit }, userData) => {
			try {
				const { name, email, password } = userData;
				const res = await axios.post('users/register', {
					name,
					email,
					password,
				});
				console.log(res.data);
				commit(SET_USER, res.data);
				router.push({ name: 'Index' });
			} catch (error) {
				console.log(error);
			}
		},
	},
};
