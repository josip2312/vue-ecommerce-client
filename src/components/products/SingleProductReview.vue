<template>
	<div class="review spacing-xsm">
		<div class="review-name">{{ review.name }}</div>
		<StarRating :rating="review.rating" />
		<div class="timestamp">{{ formatDate(review.createdAt) }}</div>
		<div class="review-comment">{{ review.comment }}</div>
	</div>
</template>

<script>
import StarRating from './StarRating';

export default {
	name: 'SingleProductReview',
	props: {
		review: {
			type: Object,
			required: true,
		},
	},
	components: {
		StarRating,
	},
	methods: {
		formatDate(date) {
			return new Date(date).toLocaleDateString('hr');
		},
	},
};
</script>

<style lang="scss" scoped>
.review {
	border-bottom: 1px solid var(--secondary-light);
	max-width: 50rem;
	&-name {
	}
	&-timestamp {
	}
	&-comment {
		padding: 1.5rem 0;
	}
}
</style>
