<template>
	<transition name="fade" mode="out-in">
		<div class="overlay" v-if="isLoading">
			<div class="lds-dual-ring"></div>
		</div>
	</transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "LoadingSpinner",
	computed: {
		...mapGetters(["isLoading"]),
	},
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
	transition-duration: 350ms;
	transition-property: opacity;
	transition-timing-function: ease-in-out;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.overlay {
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	position: fixed;
}
.lds-dual-ring {
	display: inline-block;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 8rem;
	height: 8rem;
}
.lds-dual-ring:after {
	content: " ";
	display: block;
	width: 7rem;
	height: 7rem;
	margin: 0.8rem;
	border-radius: 50%;
	border: 0.7rem solid #fff;
	border-color: #fff transparent #fff transparent;
	animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>