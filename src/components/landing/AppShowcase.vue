<template>
	<header class="showcase container">
		<div class="showcase-heading spacing">
			<h1 class="heading-1">Vue Ecommerce</h1>
			<p class="heading-desc">
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Praesentium, ut?
			</p>
			<div class="heading-buttons" v-if="!isLoggedIn">
				<button class="btn" @click="sendToLogin">Buy now</button>
				<button class="btn btn-sec" @click="sendToRegister">
					Join us
				</button>
			</div>
			<div class="heading-buttons" v-else>
				<a href="#products" class="btn">Buy now</a>
				<router-link :to="{ name: 'Profile' }" class="btn btn-sec">
					Join us
				</router-link>
			</div>
		</div>
		<div class="showcase-image">
			<img src="@/assets/images/showcase-image.jpg" alt="" />
		</div>
	</header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "Showcase",
	methods: {
		sendToLogin() {
			this.$router.push({ name: "Login" });
		},
		sendToRegister() {
			this.$router.push({ name: "Register" });
		},
	},
	computed: {
		...mapGetters(["isLoggedIn"]),
	},
};
</script>

<style scoped lang="scss">
.showcase {
	display: flex;
	flex-direction: column;
	align-items: center;
	@media only screen and(min-width:$v-12) {
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
	@media only screen and(min-width:$v-12) {
		padding-top: 0;
		align-items: flex-start;
		text-align: left;
		margin-right: 3.5rem;
	}

	.heading-desc {
		color: var(--font-paragraph);
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
		@media only screen and(min-width:$v-12) {
		}
	}
}
.showcase-image::after {
	content: "";
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
		animation: fadeLeft 500ms ease-in-out forwards 500ms;
	}
	.heading-desc {
		animation: fadeLeft 500ms ease-in-out forwards 700ms;
	}
	.heading-buttons {
		animation: fadeLeft 500ms ease-in-out forwards 900ms;
	}

	@media only screen and(max-width:$v-6) {
		.heading-1 {
			animation: fadeLeft 500ms ease-in-out forwards;
		}
		.heading-desc {
			animation: fadeLeft 500ms ease-in-out forwards 200ms;
		}
		.heading-buttons {
			animation: fadeLeft 500ms ease-in-out forwards 400ms;
		}
	}
}
.showcase-image {
	opacity: 0;
	animation: fadeLeft 750ms ease-in-out forwards;
	@media only screen and(max-width:$v-6) {
		animation: fadeLeft 750ms ease-in-out forwards 500ms;
	}
}
</style>
