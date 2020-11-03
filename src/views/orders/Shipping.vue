<template>
	<section class="shipping container">
		<CheckoutSteps stepOne="stepOne" />
		<h3 class="heading-3">Shipping</h3>
		<ValidationObserver v-slot="{ handleSubmit }" slim>
			<SimpleFormWrapper
				@submit.prevent.native="
					handleSubmit(() =>
						ADD_SHIPPING_INFO({
							address: address.value,
							city: city.value,
							postalCode: postalCode.value,
							country: country.value,
						}),
					)
				"
			>
				<template #form-content>
					<div class="form-group">
						<FormInput
							:label="address.label"
							:type="address.type"
							:name="address.name"
							:id="address.id"
							v-model="address.value"
							:rules="address.rules"
						/>
					</div>
					<div class="form-group">
						<FormInput
							:label="city.label"
							:type="city.type"
							:name="city.name"
							:id="city.id"
							v-model="city.value"
							:rules="city.rules"
						/>
					</div>
					<div class="form-group">
						<FormInput
							:label="postalCode.label"
							:type="postalCode.type"
							:name="postalCode.name"
							:id="postalCode.id"
							v-model="postalCode.value"
							:rules="postalCode.rules"
						/>
					</div>
					<div class="form-group">
						<FormInput
							:label="country.label"
							:type="country.type"
							:name="country.name"
							:id="country.id"
							v-model="country.value"
							:rules="country.rules"
						/>
					</div>
					<button class="form-group btn">
						Continue
					</button>
				</template>
			</SimpleFormWrapper>
		</ValidationObserver>
	</section>
</template>

<script>
import FormInput from '@/components/form/FormInput';
import SimpleFormWrapper from '@/components/form/SimpleFormWrapper';
import CheckoutSteps from '@/components/orders/CheckoutSteps';

import { ADD_SHIPPING_INFO } from '@/store/constants/action_types';

import { mapActions } from 'vuex';
import { ValidationObserver } from 'vee-validate';

export default {
	name: 'Shipping',
	components: {
		FormInput,
		CheckoutSteps,
		ValidationObserver,
		SimpleFormWrapper,
	},
	data() {
		return {
			address: {
				label: 'Address',
				type: 'text',
				value: null,
				rules: {
					required: true,
				},
				name: 'address',
				id: 'address',
			},
			city: {
				label: 'City',
				type: 'text',
				value: null,
				rules: {
					required: true,
				},
				name: 'city',
				id: 'city',
			},
			postalCode: {
				label: 'Postal code',
				type: 'text',
				value: null,
				rules: {
					required: true,
				},
				name: 'postalCode',
				id: 'postalCode',
			},
			country: {
				label: 'Country',
				type: 'text',
				value: null,
				rules: {
					required: true,
				},
				name: 'country',
				id: 'country',
			},
		};
	},
	methods: {
		...mapActions([ADD_SHIPPING_INFO]),
		nextStep() {
			this.$router.push({ name: 'Payment' });
		},
	},
};
</script>

<style lang="scss" scoped>
.heading-3 {
	max-width: 60rem;
	margin: 0 auto;
	padding-bottom: 3rem;
}
</style>
