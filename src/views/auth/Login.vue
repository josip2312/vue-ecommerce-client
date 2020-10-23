<template>
	<ValidationObserver v-slot="{ handleSubmit }" slim>
		<FormWrapper
			title="Login"
			@submit.prevent.native="
				handleSubmit(() =>
					LOGIN_USER({
						email: email.value,
						password: password.value,
					}),
				)
			"
		>
			<template #form-content>
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
						:type="password.type"
						:name="password.name"
						:id="password.id"
						v-model="password.value"
						:rules="password.rules"
					/>
				</div>
				<div class="form-group">
					<button class="btn">Login</button>
				</div>
			</template>

			<!-- <template #form-down>
				<div class="form-group">
					<button class="btn">
						Prijavi se
					</button>
				</div>
				<div class="form-footer">
					<router-link :to="{ name: 'ForgotPassword' }" tag="a">
						Zaboravili ste lozinku?
					</router-link>
					<router-link :to="{ name: 'Register' }" tag="a">
						Registriraj se!
					</router-link>
				</div>
			</template> -->
		</FormWrapper>
	</ValidationObserver>
</template>

<script>
import FormWrapper from '@/components/form/FormWrapper';
import FormInput from '@/components/form/FormInput';

import { ValidationObserver } from 'vee-validate';
import { mapActions } from 'vuex';

import { LOGIN_USER } from '@/store/constants/action_types';

export default {
	name: 'Login',

	components: {
		FormWrapper,
		FormInput,
		ValidationObserver,
	},
	data() {
		return {
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
			},
		};
	},

	methods: {
		...mapActions([LOGIN_USER]),
	},
};
</script>
<style lang="scss" scoped></style>
