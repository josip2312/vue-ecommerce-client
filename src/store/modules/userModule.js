import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import router from '@/router/index';

import {
	LOGIN_USER,
	LOGOUT_USER,
	REGISTER_USER,
	FETCH_USERS,
	FETCH_SINGLE_USER,
	DELETE_USER,
	EDIT_USER,
	UPDATE_PROFILE_INFO,
} from '../constants/action_types';

import {
	SET_USER,
	SET_LOGGED_OUT,
	SET_USERS,
	SET_USER_DELETED,
	SET_USER_DETAILS,
	SET_EDITING_USER,
	CLEAR_CART,
} from '../constants/mutation_types';

Vue.use(Vuex);

export default {
	state: {
		userData: {},
		users: [],
		searchedUser: {},
		editingUser: {},
		loggedIn: false,
	},
	getters: {
		getJWT: (state) => state.userData.token,
		isLoggedIn: (state) => state.loggedIn,
		isAdmin: (state) => state.userData.isAdmin,

		getSearchedUser: (state) => state.searchedUser,
		getUserName: (state) => state.userData.name,
		getUserId: (state) => state.userData._id,
	},
	mutations: {
		[SET_USER]: (state, data) => {
			state.userData = data;
			state.loggedIn = true;
		},
		[SET_USERS]: (state, data) => {
			state.users = data;
		},
		[SET_USER_DETAILS]: (state, data) => {
			state.searchedUser = data;
		},
		[SET_LOGGED_OUT]: (state) => {
			state.userData.token = null;
			state.loggedIn = false;
		},
		[SET_USER_DELETED]: (state, id) => {
			state.users = state.users.filter((user) => user._id !== id);
		},
		[SET_EDITING_USER]: (state, userData) => {
			let index = state.users.findIndex(
				(user) => user._id === userData._id,
			);
			state.users[index] = userData;
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
				console.error(error);
			}
		},
		[LOGOUT_USER]: async ({ commit }) => {
			commit(SET_LOGGED_OUT);
			commit(CLEAR_CART, null, { root: true });
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

				commit(SET_USER, res.data);
				router.push({ name: 'Index' });
			} catch (error) {
				console.error(error);
			}
		},
		[FETCH_USERS]: async ({ commit }) => {
			try {
				const { data } = await axios.get('/users');

				commit(SET_USERS, data);
			} catch (error) {
				console.error(error);
			}
		},
		[FETCH_SINGLE_USER]: async ({ commit }, id) => {
			try {
				const { data } = await axios.get(`users/${id}`);
				commit(SET_USER_DETAILS, data);
				router.push({ name: 'EditUser', params: { id } });
			} catch (error) {
				console.error(error);
			}
		},
		[DELETE_USER]: async ({ commit }, id) => {
			try {
				await axios.delete(`users/${id}`);

				commit(SET_USER_DELETED, id);
			} catch (error) {
				console.error(error);
			}
		},
		[EDIT_USER]: async ({ commit }, userData) => {
			try {
				const { name, email, isAdmin } = userData;
				const { data } = await axios.put(`users/${userData.id}`, {
					name,
					email,
					isAdmin,
				});

				commit(SET_EDITING_USER, data);
				router.push({ name: 'AdminUsers' });
			} catch (error) {
				console.error(error);
			}
		},
		[UPDATE_PROFILE_INFO]: async ({ commit }, userData) => {
			const { data } = await axios.put('/users/profile', userData);

			commit(SET_USER, data);
		},
	},
};
