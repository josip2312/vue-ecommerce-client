<template>
	<header class="showcase">
		<div class="showcase-heading spacing">
			<h1 class="heading-1">Vue ecommerce</h1>
			<p class="heading-desc">
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Praesentium, ut?
			</p>
			<div class="heading-buttons">
				<button class="btn">Buy now</button>
				<button class="btn btn-sec">See more</button>
			</div>
		</div>
		<div class="showcase-image">
			<img src="@/assets/images/showcase-image.jpg" alt="" />
		</div>
	</header>
</template>

<script>
export default {
	name: 'Showcase',
};
</script>

<style scoped lang="scss">
.showcase {
	width: 80%;
	max-width: 120rem;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	@media only screen and(min-width:$vp-10) {
		flex-direction: row;
		justify-content: center;
		min-height: 90vh;
	}
}
.showcase-heading {
	width: 100%;
	max-width: 45rem;
	padding-top: 10em;
	padding-bottom: 5em;

	text-align: center;

	display: flex;
	flex-direction: column;
	align-items: center;
	@media only screen and(min-width:$vp-10) {
		padding-top: 0;
		align-items: flex-start;
		text-align: left;
		margin-right: 3.5rem;
	}

	.heading-buttons {
		display: flex;
		justify-content: center;
		.btn {
			margin-right: 1.5rem;
		}
	}
}
.showcase-image {
	position: relative;
	z-index: -1;
	img {
		border-radius: 3px;
	}
}
.showcase-image::after {
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 3px;
	z-index: -2;
	top: -2.5rem;
	left: 2.5rem;
	background-color: var(--secondary);
}

//animations on land
.showcase-heading {
	& > * {
		opacity: 0;
	}
	.heading-1 {
		animation: fadeLeft 750ms ease-in-out forwards 500ms;
	}
	.heading-desc {
		animation: fadeLeft 750ms ease-in-out forwards 750ms;
	}
	.heading-buttons {
		animation: fadeLeft 750ms ease-in-out forwards 1000ms;
	}
}
.showcase-image {
	opacity: 0;
	animation: fadeLeft 750ms ease-in-out forwards;
}
</style>
