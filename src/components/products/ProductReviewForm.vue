<template>
	<ValidationObserver v-slot="{ handleSubmit }" slim v-if="isLoggedIn">
		<form
			class="form spacing"
			@submit.prevent="
				handleSubmit(() =>
					REVIEW_PRODUCT({
						productId,
						rating: rating,
						comment: comment.value,
					}),
				)
			"
		>
			<div class="form-group">
				<ValidationProvider rules="required" v-slot="v">
					<label for="rating">Rating</label>
					<select v-model="rating" name="rating" id="rating">
						<option value="1">1 - Poor</option>
						<option value="2">2 - Fair</option>
						<option value="3">3 - Good</option>
						<option value="4">4 - Very good</option>
						<option value="5">5 - Excellent</option>
					</select>
					<p>{{ v.errors[0] }}</p>
				</ValidationProvider>
			</div>
			<div class="form-group">
				<FormTextarea
					:label="comment.label"
					:name="comment.name"
					:id="comment.id"
					v-model="comment.value"
					:rules="comment.rules"
				/>
			</div>
			<div class="form-group">
				<button class="btn" type="submit">Send</button>
			</div>
		</form>
	</ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { mapActions, mapGetters } from 'vuex';
import { REVIEW_PRODUCT } from '@/store/constants/action_types';
import FormTextarea from '@/components/form/FormTextarea';

export default {
	name: 'ProductReviewForm',
	props: {
		productId: {
			type: String,
			required: true,
		},
	},
	components: {
		ValidationObserver,
		ValidationProvider,
		FormTextarea,
	},
	data() {
		return {
			rating: '',
			comment: {
				label: 'Leave a comment',
				name: 'comment',
				id: 'comment',
				value: null,
				rules: {
					required: true,
				},
			},
		};
	},
	computed: {
		...mapGetters(['isLoggedIn']),
	},
	methods: {
		...mapActions([REVIEW_PRODUCT]),
	},
};
</script>

<style lang="scss" scoped>
//review form
p {
	font-size: 1.2rem;
	margin-top: 0.6rem;
	color: var(--warning);
	display: inline-block;
	position: absolute;
	top: 97.5%;
	line-height: 1.1;
}
.product-details-review {
	.form-group {
		position: relative;
		max-width: 40rem;

		label {
			text-transform: uppercase;
			letter-spacing: 1px;
			display: block;
			margin-bottom: 0.75rem;
		}
	}
	.form-group:last-child {
		margin-top: 3rem;
	}
	span {
		display: flex;
		flex-direction: column;
	}

	select {
		@include input;
	}
	textarea {
		@include input;
	}
	textarea ~ p {
		top: 98.5%;
	}
}
</style>
