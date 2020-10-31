<template>
	<ValidationProvider :rules="rules" :name="name" v-slot="v">
		<label :for="id">{{ label }}</label>
		<textarea
			:id="id"
			:class="v.classes"
			:placeholder="placeholder"
			:value="value"
			cols="10"
			rows="5"
			@input="$emit('input', $event.target.value)"
		/>
		<p>{{ v.errors[0] }}</p>
	</ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
	name: 'FormInput',
	components: {
		ValidationProvider,
	},
	props: {
		value: {
			type: String,
			default: '',
		},
		label: { type: String, required: true },

		name: {
			type: String,
			default: '',
		},
		id: {
			type: String,
		},
		placeholder: {
			type: String,
		},

		rules: {
			type: [String, Object],
			default: '',
		},
	},
};
</script>

<style lang="scss" scoped>
textarea {
	@include input;
	margin-bottom: 0.2rem;
}

label {
	text-transform: uppercase;
	letter-spacing: 1px;

	margin-bottom: 0.75rem;
}
span {
	display: flex;
	flex-direction: column;
}
p {
	font-size: 1.2rem;
	margin-top: 0.6rem;
	color: var(--warning);
	display: inline-block;
	position: absolute;
	top: 98.5%;
	line-height: 1.1;
}

.form .form-group .invalid {
	border-bottom: 1px solid var(--warning);
}
.form .form-group textarea.invalid:focus {
	border-bottom: 1px solid var(--warning);
	outline: 1px solid var(--warning);
}
</style>
