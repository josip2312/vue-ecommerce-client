<template>
	<ItemContainer className="admin-smaller">
		<template #item-content>
			<div class="user-id">
				<span class="tag">ID: </span>
				<span>
					{{ userId }}
				</span>
			</div>
		</template>
		<template #item-main>
			<div class="user-name">
				<span class="tag">Name: </span>
				<span>
					{{ user.name }}
				</span>
			</div>
			<div class="user-email">
				<span class="tag">Email: </span>
				<span>
					{{ user.email }}
				</span>
			</div>
		</template>
		<template #item-sec>
			<div class="user-admin">
				<span class="tag">Role: </span>
				<span>
					{{ user.isAdmin ? 'Admin' : 'User' }}
				</span>
			</div>
		</template>
		<template #item-buttons>
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
		</template>
	</ItemContainer>
</template>

<script>
import ItemContainer from '@/components/layout/ItemContainer';

import { mapActions } from 'vuex';
import { FETCH_SINGLE_USER, DELETE_USER } from '@/store/constants/action_types';
export default {
	name: 'AdminUser',
	props: {
		user: {
			type: Object,
			required: true,
		},
	},
	components: {
		ItemContainer,
	},
	computed: {
		userId() {
			return this.user._id.slice(0, 10) + '...';
		},
	},
	methods: {
		...mapActions([FETCH_SINGLE_USER, DELETE_USER]),
	},
};
</script>

<style lang="scss" scoped></style>
