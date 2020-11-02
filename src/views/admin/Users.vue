<template>
	<section class="users container">
		<h3 class="heading-3">
			Users
		</h3>
		<AdminUser v-for="user in users" :key="user._id" :user="user" />
	</section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AdminUser from '@/components/admin/AdminUser';
import { FETCH_USERS, DELETE_USER } from '@/store/constants/action_types';
export default {
	name: 'Users',
	components: {
		AdminUser,
	},

	computed: {
		...mapState({
			users: (state) => state.userModule.users,
		}),
	},
	methods: {
		...mapActions([FETCH_USERS, DELETE_USER]),
	},
	created() {
		this.FETCH_USERS();
	},
};
</script>

<style lang="scss" scoped>
.heading-3 {
	margin-bottom: 5rem;
}
</style>
