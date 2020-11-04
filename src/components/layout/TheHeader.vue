<template>
	<div class="header">
		<div class="wrapper">
			<router-link :to="{ name: 'Index' }" class="logo">
				Logo
			</router-link>

			<Navigation />

			<div class="user-dropdown-toggle" v-if="isLoggedIn">
				<button
					ref="button-user"
					class="nav-link user-toggle-btn"
					@click="toggleUserDropdown"
				>
					<img class="user" src="@/assets/icons/user.svg" alt="" />
					<img src="@/assets/icons/chevronDown.svg" alt="" />
				</button>
				<UserDropdownMenu
					@hide-user-dropdown="hideUserDropdown"
					v-clickOutside="{
						exclude: ['button-user'],
						handler: 'hideUserDropdown',
					}"
					:isUserDropdownVisible="isUserDropdownVisible"
				/>
			</div>

			<div class="admin-dropdown-toggle" v-if="isLoggedIn && isAdmin">
				<button
					ref="button-admin"
					class="nav-link admin-toggle-btn"
					@click="toggleAdminDropdown"
				>
					<span>Admin</span>
					<img src="@/assets/icons/chevronDown.svg" alt="" />
				</button>
				<AdminDropdownMenu
					:isAdminDropdownVisible="isAdminDropdownVisible"
					@hide-admin-dropdown="hideAdminDropdown"
					v-clickOutside="{
						exclude: ['button-admin'],
						handler: 'hideAdminDropdown',
					}"
				/>
			</div>
		</div>
		<TheMobileNav />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navigation from './Navigation';
import UserDropdownMenu from './UserDropdownMenu';
import AdminDropdownMenu from './AdminDropdownMenu';
import TheMobileNav from '@/components/layout/TheMobileNav';

import clickOutside from '@/directives/click-outside';

export default {
	name: 'TheHeader',
	components: {
		Navigation,
		UserDropdownMenu,
		AdminDropdownMenu,
		TheMobileNav,
	},
	data() {
		return {
			isUserDropdownVisible: false,
			isAdminDropdownVisible: false,
		};
	},
	computed: {
		...mapGetters(['isLoggedIn', 'isAdmin']),
	},

	methods: {
		toggleUserDropdown() {
			this.isUserDropdownVisible = !this.isUserDropdownVisible;
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
	width: 85%;
	margin: 0 auto;
	max-width: 120rem;

	display: flex;
	align-items: center;

	.logo {
		padding: 1.75rem 0;
		color: var(--font-secondary);
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
