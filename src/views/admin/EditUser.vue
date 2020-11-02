<template>
	<ValidationObserver v-slot="{ handleSubmit }" slim>
		<FormWrapper
			title="Edit user"
			@submit.prevent.native="
				handleSubmit(() =>
					EDIT_USER({
						name: name.value,
						email: email.value,
						isAdmin: isAdmin.value,
						id: $route.params.id,
					}),
				)
			"
		>
			<template #form-content>
				<div class="form-group">
					<FormInput
						:label="name.label"
						:type="name.type"
						:name="name.name"
						:id="name.id"
						v-model="name.value"
						:rules="name.rules"
					/>
				</div>
				<div class="form-group">
					<FormInput
						:label="email.label"
						:type="email.type"
						:name="email.name"
						:id="email.id"
						v-model.trim="email.value"
						:rules="email.rules"
					/>
				</div>
				<div class="form-group">
					<label for="isAdmin">Is Admin</label>
					<input
						class="isAdmin"
						type="checkbox"
						name="isAdmin"
						id="isAdmin"
						v-model="isAdmin.value"
						:rules="isAdmin.rules"
					/>
				</div>

				<div class="form-group">
					<button class="btn">Update</button>
				</div>
			</template>
		</FormWrapper>
	</ValidationObserver>
</template>

<script>
import FormWrapper from '@/components/form/FormWrapper';
import FormInput from '@/components/form/FormInput';

import { ValidationObserver } from 'vee-validate';

import { EDIT_USER } from '@/store/constants/action_types';
import { mapActions } from 'vuex';
export default {
	name: 'EditUser',
	components: {
		FormWrapper,
		FormInput,
		ValidationObserver,
	},

	data() {
		return {
			name: {
				label: 'Full name',
				type: 'text',
				value: this.$store.state.userModule.searchedUser.name || null,
				rules: {
					required: true,
				},
				name: 'name',
				id: 'name',
			},
			email: {
				label: 'Email',
				type: 'email',
				value: this.$store.state.userModule.searchedUser.email || null,
				rules: {
					required: true,
					email: true,
				},
				name: 'email',
				id: 'email',
			},
			isAdmin: {
				label: 'Is admin',
				type: 'checkbox',
				value:
					this.$store.state.userModule.searchedUser.isAdmin || false,
				rules: {
					required: true,
				},
				name: 'isAdmin',
				id: 'isAdmin',
			},
		};
	},
	methods: {
		...mapActions([EDIT_USER]),
	},
};
</script>

<style lang="scss" scoped>
.isAdmin {
	display: block;
	width: 2rem;
	height: 2rem;
}
</style>
