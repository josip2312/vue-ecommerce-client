<template>
	<div class="star-rating">
		<img
			v-for="(star, index) in 5"
			:key="index"
			:src="
				rating >= star
					? makeUrl('star-full.svg')
					: rating >= star - 0.5
					? makeUrl('star-half.svg')
					: makeUrl('star-empty.svg')
			"
			alt=""
		/>
	</div>
</template>

<script>
export default {
	name: 'StarRating',
	props: {
		rating: {
			type: Number,
			required: true,
		},
	},
	methods: {
		makeUrl(filename) {
			return require(`@/assets/icons/${filename}`);
		},
	},
};
</script>

<style lang="scss" scoped>
.star-rating {
	display: flex;
	align-items: center;
}
img {
	width: 2rem;
	height: 2rem;
	margin-right: 0.5rem;
}
</style>
