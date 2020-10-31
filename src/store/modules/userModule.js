import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import router from '@/router/index';

import {
	LOGIN_USER,
	LOGOUT_USER,
	REGISTER_USER,
} from '../constants/action_types';

import { SET_USER, SET_LOGGED_OUT } from '../constants/mutation_types';

Vue.use(Vuex);

export default {
	state: {
		userData: {},
		loggedIn: false,
	},
	getters: {
		getJWT: (state) => state.userData.token,
		isLoggedIn: (state) => state.loggedIn,
		isAdmin: (state) => state.userData.isAdmin,

		getUserName: (state) => state.userData.name,
		getUserId: (state) => state.userData._id,
	},
	mutations: {
		[SET_USER]: (state, data) => {
			state.userData = data;
			state.loggedIn = true;
		},
		[SET_LOGGED_OUT]: (state) => {
			state.userData.token = null;
			state.loggedIn = false;
		},
	},
	actions: {
		[LOGIN_USER]: async ({ commit }, data) => {
			const { email, password } = data;
			try {
				const res = await axios.post('users/login', {
					email,
					password,
				});

				commit(SET_USER, res.data);
				router.push({ name: 'Index' });
			} catch (error) {
				console.log(error);
			}
		},
		[LOGOUT_USER]: async ({ commit }) => {
			commit(SET_LOGGED_OUT);
			location.reload();
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
