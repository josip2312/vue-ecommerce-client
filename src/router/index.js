import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/Index.vue';

Vue.use(VueRouter);

//protect routes

const routes = [
	{
		path: '/',
		name: 'Index',
		component: Index,
	},

	{
		path: '/login',
		name: 'Login',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '@/views/auth/Login.vue'),
	},
	{
		path: '/register',
		name: 'Register',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '@/views/auth/Register.vue'),
	},
	{
		path: '/forgot-password',
		name: 'ForgotPassword',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/auth/ForgotPassword.vue'
			),
	},

	{
		path: '/product',
		name: 'ProductDetails',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/products/ProductDetails.vue'
			),
	},

	{
		path: '/profile',
		name: 'Profile',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '@/views/Profile.vue'),
	},

	{
		path: '/cart',
		name: 'Cart',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '@/views/Cart.vue'),
	},

	{
		path: '/shipping',
		name: 'Shipping',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/orders/Shipping.vue'
			),
	},
	{
		path: '/payment',
		name: 'Payment',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/orders/Payment.vue'
			),
	},
	{
		path: '/place-order',
		name: 'PlaceOrder',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/orders/PlaceOrder.vue'
			),
	},

	//admin routes
	{
		path: '/admin/products',
		name: 'AdminProducts',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/admin/AdminProducts.vue'
			),
	},
	{
		path: '/admin/users',
		name: 'AdminUsers',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/admin/AdminUsers.vue'
			),
	},
	{
		path: '/admin/create-product',
		name: 'CreateProduct',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/admin/CreateProduct.vue'
			),
	},
	{
		path: '/admin/orders',
		name: 'AdminOrders',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/admin/AdminOrders.vue'
			),
	},
	{
		path: '/admin/edit-user',
		name: 'EditUser',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ '@/views/admin/EditUser.vue'
			),
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
