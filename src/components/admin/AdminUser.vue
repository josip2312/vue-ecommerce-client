<template>
	<div class="user">
		<div class="user-id">
			{{ user._id }}
		</div>
		<div class="user-main">
			<div class="user-name">
				{{ user.name }}
			</div>
			<div class="user-email">
				{{ user.email }}
			</div>
		</div>
		<div class="user-admin">
			Role: {{ user.isAdmin ? 'Admin' : 'User' }}
		</div>
		<div class="user-buttons">
			<button
				class="user-edit"
				title="Edit"
				@click.stop="FETCH_SINGLE_USER(user._id)"
			>
				<img src="@/assets/icons/edit.svg" alt="Edit" />
			</button>
			<button
				class="user-delete"
				title="Delete"
				@click.stop="DELETE_USER(user._id)"
			>
				<img src="@/assets/icons/trash.svg" alt="Delete" />
			</button>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import { FETCH_SINGLE_USER } from '@/store/constants/action_types';
export default {
	name: 'AdminUser',
	props: {
		user: {
			type: Object,
			required: true,
		},
	},
	methods: {
		...mapActions([FETCH_SINGLE_USER]),
	},
};
</script>

<style lang="scss" scoped>
.user {
	background-color: var(--grey-light);
	padding: 2rem 1.5rem;
	border-radius: 0.5rem;

	@media only screen and(min-width:$vp-10) {
		display: flex;
		align-items: center;
	}
	&-id {
		text-align: center;
	}
	&-main {
		display: flex;
		align-items: center;
		justify-content: space-around;
		@media only screen and(min-width:$vp-10) {
			flex: 1;
		}
	}
	&-admin {
		display: flex;
		justify-content: center;
	}

	&-name,
	&-email,
	&-admin {
		padding: 1.5rem;
	}

	&-buttons {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	&-edit,
	&-delete {
		cursor: pointer;
		background: none;
		border: none;
		padding: 1.5rem;
		flex-shrink: 0;
	}
	&-delete {
		background-color: var(--warning-light);

		border-radius: 3px;
	}
	&-edit {
		margin-right: 1rem;
	}

	img {
		width: 2.5rem;
		height: 2.5rem;
	}
	img:hover {
		transform: scale(1.1);
	}
}
</style>
