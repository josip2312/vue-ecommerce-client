<template>
	<div
		class="dropdown"
		:class="{ isUserDropdownVisible: isUserDropdownVisible }"
	>
		<router-link
			class="dropdown-link"
			:to="{ name: 'Profile' }"
			@click.native="$emit('hide-user-dropdown')"
		>
			Profile
		</router-link>
		<router-link
			class="dropdown-link"
			:to="{ name: 'Products' }"
			@click.native="$emit('hide-user-dropdown')"
		>
			Products
		</router-link>
		<a href="" class="dropdown-link logout" @click.prevent="LOGOUT_USER">
			Logout
		</a>
	</div>
</template>

<script>
import { LOGOUT_USER } from '@/store/constants/action_types';
import { mapActions } from 'vuex';
export default {
	name: 'UserDropdownMenu',
	props: {
		isUserDropdownVisible: {
			type: Boolean,
			required: true,
		},
	},

	methods: {
		...mapActions([LOGOUT_USER]),
	},
};
</script>

<style lang="scss" scoped>
.dropdown {
	position: absolute;
	left: -2rem;
	padding: 1rem 0;
	top: 100%;

	display: flex;
	flex-direction: column;
	background-color: var(--primary);

	transform: scaleY(0);
	transform-origin: top;
	opacity: 0;

	transition: transform 250ms ease-in-out, opacity 250ms ease;

	.dropdown-link {
		color: var(--font-secondary);
		font-size: 1.8rem;
		padding: 1rem 3rem;
		width: 100%;
		opacity: 0;
		transition: opacity 200ms ease-in-out 300ms;

		&:hover {
			color: var(--secondary-light);
		}
	}
}
.isUserDropdownVisible {
	opacity: 1;
	transform: scaleY(1);

	.dropdown-link {
		opacity: 1;
	}
}
.router-link-exact-active {
	background-color: var(--secondary-500);
}
</style>
