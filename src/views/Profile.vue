<template>
	<div class="profile container">
		<ValidationObserver
			v-slot="{ handleSubmit }"
			tag="div"
			class="profile-form"
		>
			<SimpleFormWrapper
				className="align-left"
				@submit.prevent.native="
					handleSubmit(() =>
						UPDATE_PROFILE_INFO({
							name: name.value,
							email: email.value,
							password: password.value,
						}),
					)
				"
			>
				<template #form-content>
					<h3 class="heading-3">User profile</h3>
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
					<button class="form-group btn">
						Update
					</button>
				</template>
			</SimpleFormWrapper>
		</ValidationObserver>

		<div class="profile-orders">
			<h3 class="heading-3">Orders</h3>
			<OrderItem
				v-for="order in orders"
				:key="order._id"
				:order="order"
			/>
			<div class="no-orders" v-if="orders.length < 1">No orders</div>
		</div>
	</div>
</template>

<script>
import FormInput from '@/components/form/FormInput';
import SimpleFormWrapper from '@/components/form/SimpleFormWrapper';

import OrderItem from '@/components/orders/OrderItem';
import { FETCH_MY_ORDERS } from '@/store/constants/action_types';

import { ValidationObserver } from 'vee-validate';
import { mapActions, mapState } from 'vuex';
export default {
	name: 'Profile',
	components: {
		FormInput,
		SimpleFormWrapper,
		OrderItem,
		ValidationObserver,
	},
	computed: {
		...mapState({
			orders: (state) => state.ordersModule.myOrders,
		}),
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
		...mapActions([FETCH_MY_ORDERS]),
	},
	created() {
		this.FETCH_MY_ORDERS();
	},
};
</script>

<style lang="scss" scoped>
.profile {
	display: flex;
	flex-direction: column;
	@media only screen and(min-width:$vp-12) {
		flex-direction: row;
	}
}
.profile-form {
	margin-bottom: 5rem;
	@media only screen and(min-width:$vp-12) {
		margin-right: 5rem;
		margin-bottom: 0;
	}
}
.profile-orders {
	.heading-3 {
		margin-bottom: 2.5rem;
	}
	flex: 1;
}
</style>
