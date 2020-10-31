<template>
	<div
		class="dropdown"
		:class="{ isUserDropdownVisible: isUserDropdownVisible }"
	>
		<router-link class="dropdown-link" :to="{ name: 'Profile' }">
			Profile
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
	left: -1rem;
	padding: 1rem 2.5rem;
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
		padding: 0.5rem 0;

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
</style>
