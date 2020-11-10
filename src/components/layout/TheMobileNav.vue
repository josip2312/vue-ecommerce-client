<template>
	<div class="mobile-nav">
		<div class="mobile-nav-wrapper" v-if="!isLoggedIn">
			<router-link :to="{ name: 'Cart' }">
				<img src="@/assets/icons/cart.svg" alt="Home" />
				<span>Cart</span>
			</router-link>
			<router-link :to="{ name: 'Login' }">
				<img src="@/assets/icons/login.svg" alt="Sign in" />
				<span>Sign in</span>
			</router-link>
			<router-link :to="{ name: 'Register' }">
				<img src="@/assets/icons/useradd.svg" alt="Sign up" />
				<span>Sign up</span>
			</router-link>
		</div>
		<div class="mobile-nav-wrapper" v-else>
			<router-link :to="{ name: 'Products' }">
				<img src="@/assets/icons/products.svg" alt="Products" />
				<span>Products</span>
			</router-link>
			<router-link :to="{ name: 'Cart' }">
				<img src="@/assets/icons/cart.svg" alt="Rides" />
				<span>Cart</span>
			</router-link>
			<router-link :to="{ name: 'Profile' }">
				<img src="@/assets/icons/user.svg" alt="Profile" />
				<span> Profile</span>
			</router-link>
		</div>
	</div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
	name: "TheMobileNav",

	computed: {
		...mapGetters(["isLoggedIn"]),
	},
};
</script>
<style lang="scss" scoped>
.mobile-nav {
	@media only screen and(min-width:$v-8) {
		display: none;
	}
	display: block;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;

	width: 100%;
	background: var(--primary-dark);
	background: var(--accent);
	z-index: 1000;
	&-wrapper {
		display: flex;

		width: 100%;

		a {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			flex: 1;
			padding: 1.25rem 0;

			text-transform: uppercase;
			text-align: center;
			list-style: none;
			font-size: 1.4rem;
			cursor: pointer;

			transition: opacity 0.2s ease;
			text-decoration: none;
			color: var(--font-secondary);

			img {
				margin-right: 0.5rem;
				width: 2.5rem;
				height: 2.5rem;
			}
		}

		a:hover {
			background-color: var(--secondary-dark);
		}
		.router-link-exact-active::after {
			transform: scale(1, 1);
		}

		.router-link-exact-active {
			background-color: var(--secondary-dark);
		}
	}
}
</style>
