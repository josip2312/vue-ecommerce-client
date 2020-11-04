import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/Index.vue';
import store from '@/store/index';

Vue.use(VueRouter);

//protect routes

const loggedOutGuard = (to, from, next) => {
	if (to.matched.some((rec) => rec.meta.requiresAuth)) {
		if (store.state.userModule.loggedIn) {
			next();
		} else {
			next({ name: 'Login' });
		}
	}
};
const loggedOutAdminGuard = (to, from, next) => {
	if (to.matched.some((rec) => rec.meta.requiresAuth)) {
		if (
			store.state.userModule.loggedIn &&
			store.state.userModule.userData.isAdmin
		) {
			next();
		} else {
			next({ name: 'Login' });
		}
	}
};

const loggedInGuard = (to, from, next) => {
	if (!store.state.userModule.loggedIn) {
		next();
	} else {
		next({ name: 'Index' });
	}
};
const routes = [
	{
		path: '/',
		name: 'Index',
		component: Index,
	},

	{
		path: '/login',
		name: 'Login',
		component: () =>
			import(/* webpackChunkName: "about" */ '@/views/auth/Login.vue'),
		beforeEnter: loggedInGuard,
	},
	{
		path: '/register',
		name: 'Register',
		component: () =>
			import(/* webpackChunkName: "about" */ '@/views/auth/Register.vue'),
		beforeEnter: loggedInGuard,
	},
	{
		path: '/forgot-password',
		name: 'ForgotPassword',
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/auth/ForgotPassword.vue'
			),
		beforeEnter: loggedInGuard,
	},

	{
		path: '/product',
		name: 'ProductDetails',
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/products/ProductDetails.vue'
			),
	},

	{
		path: '/profile',
		name: 'Profile',
		component: () =>
			import(/* webpackChunkName: "about" */ '@/views/Profile.vue'),
		meta: {
			requiresAuth: true,
		},
		beforeEnter: loggedOutGuard,
	},

	{
		path: '/cart',
		name: 'Cart',
		component: () =>
			import(/* webpackChunkName: "about" */ '@/views/Cart.vue'),
	},

	{
		path: '/shipping',
		name: 'Shipping',
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/orders/Shipping.vue'
			),
		meta: {
			requiresAuth: true,
		},
		beforeEnter: loggedOutGuard,
	},
	{
		path: '/payment',
		name: 'Payment',
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/orders/Payment.vue'
			),
		meta: {
			requiresAuth: true,
		},
		beforeEnter: loggedOutGuard,
	},
	{
		path: '/place-order',
		name: 'PlaceOrder',
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/orders/PlaceOrder.vue'
			),
		meta: {
			requiresAuth: true,
		},
		beforeEnter: loggedOutGuard,
	},
	{
		path: '/order/:id',
		name: 'OrderDetails',
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/orders/OrderDetails.vue'
			),
		meta: {
			requiresAuth: true,
		},
		beforeEnter: loggedOutGuard,
	},

	//admin routes
	{
		path: '/admin/products',
		name: 'AdminProducts',
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/admin/AdminProducts.vue'
			),
		meta: {
			requiresAuth: true,
		},
		beforeEnter: loggedOutAdminGuard,
	},
	{
		path: '/admin/users',
		name: 'AdminUsers',
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/admin/AdminUsers.vue'
			),
		meta: {
			requiresAuth: true,
		},
		beforeEnter: loggedOutAdminGuard,
	},
	{
		path: '/admin/create-product',
		name: 'CreateProduct',
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/admin/CreateProduct.vue'
			),
		meta: {
			requiresAuth: true,
		},
		beforeEnter: loggedOutAdminGuard,
	},
	{
		path: '/admin/orders',
		name: 'AdminOrders',
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/admin/AdminOrders.vue'
			),
		meta: {
			requiresAuth: true,
		},
		beforeEnter: loggedOutAdminGuard,
	},
	{
		path: '/admin/edit-user',
		name: 'EditUser',
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/admin/EditUser.vue'
			),
		meta: {
			requiresAuth: true,
		},
		beforeEnter: loggedOutAdminGuard,
	},
];

const router = new VueRouter({
	mode: 'history',
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
	base: process.env.BASE_URL,
	routes,
});

export default router;
