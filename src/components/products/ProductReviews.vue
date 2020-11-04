<template>
	<div class="reviews spacing-lg" v-if="reviews.length > 0">
		<SingleProductReview
			v-for="review in reviews"
			:key="review.id"
			:review="review"
		/>
	</div>
</template>

<script>
import SingleProductReview from './SingleProductReview';
export default {
	name: 'ProductReview',
	components: {
		SingleProductReview,
	},
	props: {
		reviews: {
			type: Array,
		},
	},
};
</script>

<style lang="scss" scoped>
.reviews {
	padding-bottom: 5rem;
}
</style>
