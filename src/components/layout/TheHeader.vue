<template>
	<div class="header">
		<div class="wrapper">
			<div class="logo">
				Logo
			</div>
			<button class="nav-toggle" @click="toggleSidebar">
				<span
					class="hamburger"
					:class="{ active: isSidebarVisible }"
				></span>
			</button>
			<nav
				class="navigation"
				:class="{ isSidebarVisible: isSidebarVisible }"
			>
				<router-link :to="{ name: 'Index' }" class="nav-link" href="#"
					>Home
				</router-link>

				<router-link :to="{ name: 'Login' }" class="nav-link" href="#"
					>Login
				</router-link>

				<router-link
					:to="{ name: 'Register' }"
					class="nav-link"
					href="#"
					>Register
				</router-link>
			</nav>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TheHeader',
	data() {
		return {
			isSidebarVisible: false,
		};
	},
	methods: {
		toggleSidebar() {
			this.isSidebarVisible = !this.isSidebarVisible;
		},
	},
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
.header {
	display: flex;

	align-items: center;
	position: sticky;
	top: 0;
	z-index: 1;
	background-color: var(--primary);
	color: var(--font-secondary);
}

.wrapper {
	width: 80%;
	margin: 0 auto;
	max-width: 120rem;

	display: flex;
	align-items: center;
	justify-content: space-between;

	.logo {
		padding: 1.75rem 0;
	}
	.nav-toggle {
		display: inline-block;
		@media only screen and(min-width:$vp-8) {
			display: none;
		}
		border: 0;
		border-radius: 0.25em 0 0 0.25em;
		background-color: var(--primary);
		padding: 1em 0.5em;
		cursor: pointer;
		z-index: 15;
		.hamburger {
			position: relative;
			display: block;
		}
		//hamburger animations
		.hamburger,
		.hamburger::before,
		.hamburger::after {
			height: 3px;
			width: 1.5em;
			border-radius: 1rem;
			background-color: var(--font-secondary);
			transition: transform 250ms ease-in-out, opacity 250ms linear;
		}

		.hamburger::before,
		.hamburger::after {
			content: '';
			position: absolute;
			left: 0;
		}

		.hamburger::before {
			bottom: 0.8rem;
		}
		.hamburger::after {
			top: 0.8rem;
		}

		.hamburger.active {
			transform: rotate(135deg);
		}
		.hamburger.active::before {
			bottom: 0rem;
			opacity: 0;
		}
		.hamburger.active::after {
			transform: rotate(90deg) translate(-0.8rem);
		}
	}

	.navigation {
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
			@media only screen and(min-width:$vp-8) {
				margin: 0 2.5rem;

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
}
</style>
