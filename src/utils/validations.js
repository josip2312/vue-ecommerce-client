import { extend } from 'vee-validate';
import { configure } from 'vee-validate';
import { setInteractionMode } from 'vee-validate';
import {
	required,
	email,
	alpha,
	confirmed,
	numeric,
	min,
} from 'vee-validate/dist/rules';

setInteractionMode('eager');

configure({
	classes: {
		valid: 'valid',
		invalid: 'invalid',
	},
});

extend('email', {
	...email,
	message: 'Enter a valid email',
});

extend('password', {
	validate: (value) => {
		const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
		return re.test(value);
	},
	message:
		'The password needs to have atleast 6 characters, 1 capital letter and a number',
});

extend('required', {
	...required,
	message: 'This field cannot be empty',
});

extend('alpha', {
	...alpha,
	message: 'Only letters allowed',
});

extend('min', {
	...min,

	message: `The field needs to have atleast 6 characters`,
});

extend('minmax', {
	validate(value, { min, max }) {
		return value.length >= min && value.length <= max;
	},
	params: ['min', 'max'],
	message: `The field needs to have between {min} and {max} characters`,
});

extend('confirmed', {
	...confirmed,
	message: 'Passwords do not match',
});
extend('numeric', {
	...numeric,
	message: 'This field has to be a number',
});

extend('minmax_value', {
	validate(value, { min, max }) {
		return value >= min && value <= max;
	},
	params: ['min', 'max'],
	message: `The value needs to be between {min} and {max}`,
});
