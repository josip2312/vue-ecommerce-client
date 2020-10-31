<template>
	<ValidationObserver v-slot="{ handleSubmit }" slim>
		<FormWrapper
			title="Sign up"
			@submit.prevent.native="
				handleSubmit(() =>
					REGISTER_USER({
						name: name.value,
						email: email.value,
						password: password.value,
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
					<FormInput
						:label="password.label"
						:vid="password.vid"
						:type="password.type"
						:name="password.name"
						:id="password.id"
						v-model="password.value"
						:rules="password.rules"
					/>
				</div>
				<div class="form-group">
					<FormInput
						:label="confirmPassword.label"
						rules="required|confirmed:confirmation"
						:type="confirmPassword.type"
						:name="confirmPassword.name"
						:id="confirmPassword.id"
						v-model="confirmPassword.value"
					/>
				</div>
				<div class="form-group">
					<button class="btn">Sign up</button>
				</div>
			</template>
		</FormWrapper>
	</ValidationObserver>
</template>

<script>
import FormWrapper from '@/components/form/FormWrapper';
import FormInput from '@/components/form/FormInput';

import { ValidationObserver } from 'vee-validate';

import { mapActions } from 'vuex';

import { REGISTER_USER } from '@/store/constants/action_types';

export default {
	name: 'Register',

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
				value: null,
				rules: {
					required: true,
				},
				name: 'name',
				id: 'name',
			},
			email: {
				label: 'Email',
				type: 'email',
				value: null,
				rules: {
					required: true,
					email: true,
				},
				name: 'email',
				id: 'email',
			},
			password: {
				label: 'Password',
				type: 'password',
				value: null,
				rules: {
					required: true,
					password: this.value,
				},
				name: 'password',
				id: 'password',
				vid: 'confirmation',
			},
			confirmPassword: {
				label: 'Confirm password',
				type: 'password',
				value: null,
				rules: {
					confirmed: { confirmation: true },
				},
				name: 'confirmPassword',
				id: 'confirmPassword',
			},
		};
	},

	methods: {
		...mapActions([REGISTER_USER]),
	},
};
</script>
<style lang="scss" scoped></style>
