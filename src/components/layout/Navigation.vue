<template>
	<nav
		class="navigation"
		:class="{ isSidebarVisible: isSidebarVisible }"
		v-if="!isLoggedIn"
	>
		<router-link :to="{ name: 'Index' }" class="nav-link">
			Home
		</router-link>
		<router-link :to="{ name: 'Cart' }" class="nav-link">
			Cart
		</router-link>
		<router-link :to="{ name: 'Login' }" class="nav-link">
			Sign in
		</router-link>
		<router-link :to="{ name: 'Register' }" class="nav-link">
			Sign up
		</router-link>
	</nav>
	<nav
		v-else
		class="navigation"
		:class="{ isSidebarVisible: isSidebarVisible }"
	>
		<router-link :to="{ name: 'Index' }" class="nav-link">
			Home
		</router-link>
		<router-link :to="{ name: 'Cart' }" class="nav-link">
			Cart
		</router-link>
	</nav>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'Navigation',
	props: {
		isSidebarVisible: {
			type: Boolean,
			required: true,
		},
	},
	computed: {
		...mapGetters(['isLoggedIn', 'getUserName', 'isAdmin']),
	},
};
</script>

<style lang="scss" scoped>
.navigation {
	margin-left: auto;

	position: fixed;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 10;
	min-width: 50vw;
	background-color: var(--primary);

	transform: translateX(50vw);
	transition: transform 300ms ease-in-out;
	transform-origin: right;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	@media only screen and(min-width:$vp-8) {
		transform: translateX(0);
		flex-direction: row;
		position: relative;
		min-width: auto;
	}

	.nav-link {
		position: relative;
		display: block;
		margin: 2.5rem 1rem;
		padding: 0.25rem 0;
		color: var(--font-secondary);
		font-size: 2.5rem;
		@media only screen and(min-width:$vp-8) {
			margin: 0 2.5rem;
			font-size: 1.6rem;
			&:last-child {
				margin-right: 0;
			}
		}
	}
	.nav-link::after {
		content: '';
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
.isSidebarVisible {
	opacity: 1;
	transform: translateX(0);
}
</style>
