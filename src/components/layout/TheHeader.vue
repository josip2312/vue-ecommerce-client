<template>
	<div class="header">
		<div class="wrapper">
			<router-link :to="{ name: 'Index' }" class="logo">
				Logo
			</router-link>

			<button ref="button-menu" class="nav-toggle" @click="toggleSidebar">
				<span
					class="hamburger"
					:class="{ active: isSidebarVisible }"
				></span>
			</button>
			<Navigation
				:isSidebarVisible="isSidebarVisible"
				v-clickOutside="{
					exclude: ['button-menu'],
					handler: 'hideSidebar',
				}"
			/>

			<div class="user-dropdown-toggle">
				<button
					ref="button-user"
					class="nav-link user-toggle-btn"
					@click="toggleUserDropdown"
					v-if="isLoggedIn"
				>
					<img class="user" src="@/assets/icons/user.svg" alt="" />
					<img src="@/assets/icons/chevronDown.svg" alt="" />
				</button>
				<UserDropdownMenu
					v-clickOutside="{
						exclude: ['button-user'],
						handler: 'hideUserDropdown',
					}"
					:isUserDropdownVisible="isUserDropdownVisible"
				/>
			</div>

			<div class="admin-dropdown-toggle">
				<button
					ref="button-admin"
					class="nav-link admin-toggle-btn"
					@click="toggleAdminDropdown"
					v-if="isLoggedIn && isAdmin"
				>
					<span>Admin</span>
					<img src="@/assets/icons/chevronDown.svg" alt="" />
				</button>
				<AdminDropdownMenu
					:isAdminDropdownVisible="isAdminDropdownVisible"
					v-clickOutside="{
						exclude: ['button-admin'],
						handler: 'hideAdminDropdown',
					}"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navigation from './Navigation';
import UserDropdownMenu from './UserDropdownMenu';
import AdminDropdownMenu from './AdminDropdownMenu';

import clickOutside from '@/directives/click-outside';

export default {
	name: 'TheHeader',
	components: {
		Navigation,
		UserDropdownMenu,
		AdminDropdownMenu,
	},
	data() {
		return {
			isSidebarVisible: false,
			isUserDropdownVisible: false,
			isAdminDropdownVisible: false,
		};
	},
	computed: {
		...mapGetters(['isLoggedIn', 'isAdmin']),
	},

	methods: {
		toggleSidebar() {
			this.isSidebarVisible = !this.isSidebarVisible;
		},
		toggleUserDropdown() {
			this.isUserDropdownVisible = !this.isUserDropdownVisible;
		},
		hideSidebar() {
			this.isSidebarVisible = false;
		},
		hideUserDropdown() {
			this.isUserDropdownVisible = false;
		},
		hideAdminDropdown() {
			this.isAdminDropdownVisible = false;
		},
		toggleAdminDropdown() {
			this.isAdminDropdownVisible = !this.isAdminDropdownVisible;
		},
	},
	directives: {
		clickOutside,
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
	position: relative;
	width: 80%;
	margin: 0 auto;
	max-width: 120rem;

	display: flex;
	align-items: center;

	.logo {
		padding: 1.75rem 0;
		color: var(--font-secondary);
	}
	.nav-toggle {
		margin-left: auto;

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

	.user-dropdown-toggle {
		position: relative;
		z-index: 15;
		margin-left: 2.5rem;

		padding: 0.5rem 0;

		.user-toggle-btn {
			display: flex;
			align-items: center;
			cursor: pointer;
			background: none;
			border: none;
		}

		.user {
			margin-right: 1rem;
		}
		img {
			width: 2.5rem;
			height: 2.5rem;
		}
		&:hover::after {
			transform: scale(0, 1);
		}
	}

	.admin-dropdown-toggle {
		position: relative;
		z-index: 15;
		margin-left: 3.5rem;

		padding: 0.5rem 0;

		.admin-toggle-btn {
			display: flex;
			align-items: center;
			cursor: pointer;
			background: none;
			border: none;
			color: var(--font-secondary);
		}

		span {
			margin-right: 1rem;
		}
		img {
			width: 2.5rem;
			height: 2.5rem;
		}
		&:hover::after {
			transform: scale(0, 1);
		}
	}
}
</style>
