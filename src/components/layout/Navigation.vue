<template>
	<nav class="navigation" v-if="!isLoggedIn">
		<router-link :to="{ name: 'Index' }" class="nav-link home">
			Home
		</router-link>
		<router-link :to="{ name: 'Products' }" class="nav-link products">
			Products
		</router-link>
		<router-link :to="{ name: 'Cart' }" class="nav-link">
			<img src="@/assets/icons/cart.svg" alt="Cart" />
			Cart
		</router-link>
		<router-link :to="{ name: 'Login' }" class="nav-link">
			Sign in
		</router-link>
		<router-link :to="{ name: 'Register' }" class="nav-link">
			Sign up
		</router-link>
	</nav>
	<nav v-else class="navigation">
		<router-link :to="{ name: 'Index' }" class="nav-link">
			Home
		</router-link>
		<router-link :to="{ name: 'Cart' }" class="nav-link">
			<img src="@/assets/icons/cart.svg" alt="Cart" />
			Cart
		</router-link>
	</nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "Navigation",

	computed: {
		...mapGetters(["isLoggedIn", "getUserName", "isAdmin"]),
	},
};
</script>

<style lang="scss" scoped>
.navigation {
	margin-left: auto;
	display: flex;
	flex-direction: row;
	position: relative;
	min-width: auto;
	z-index: 10;

	background-color: var(--primary);

	transition: transform 300ms ease-in-out;

	.nav-link {
		position: relative;
		display: flex;
		align-items: center;
		margin: 0 2rem;
		padding: 0.5rem 0;
		color: var(--font-secondary);

		@media only screen and(max-width:$v-8) {
			display: none;
		}
		&:last-child {
			margin-right: 0;
		}
		img {
			width: 2.5rem;
			height: 2.5rem;
			margin-right: 0.5rem;
		}
	}
	.home {
		display: block;
	}
	.products {
		display: block;
		@media only screen and(max-width:$v-8) {
			margin-right: 0;
		}
	}
	.nav-link::after {
		content: "";
		position: absolute;
		left: 0;
		bottom: 0;
		height: 2px;
		border-radius: 1rem;
		width: 100%;
		transform: scale(0, 1);
		transform-origin: left;
		transition: transform 200ms ease-in-out;
		background-color: var(--font-secondary);
	}
	.nav-link:hover::after {
		transform: scale(1, 1);
	}
	.router-link-exact-active::after {
		transform: scale(1, 1);
	}
}
</style>
