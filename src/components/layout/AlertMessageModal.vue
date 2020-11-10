<template>
	<transition name="fade" mode="out-in">
		<div class="overlay" v-if="isSuccess || isError">
			<div v-if="isSuccess" class="success">
				<div>
					{{ getSuccessMessage }}
				</div>
				<button class="btn" @click="CLEAR_SUCCESS">Ok</button>
			</div>
			<div v-if="isError" class="error">
				<div>
					{{ getErrorMessage }}
				</div>
				<button class="btn" @click="CLEAR_ERROR">Ok</button>
			</div>
		</div>
	</transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import { CLEAR_ERROR, CLEAR_SUCCESS } from "@/store/constants/mutation_types";

export default {
	name: "AlertMessageModal",
	computed: {
		...mapGetters([
			"isError",
			"isSuccess",
			"getErrorMessage",
			"getSuccessMessage",
		]),
	},
	methods: {
		...mapMutations([CLEAR_ERROR, CLEAR_SUCCESS]),
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
.error,
.success {
	position: absolute;
	top: 50%;
	left: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	transform: translate(-50%, -50%);
	padding: 5rem 7.5rem;
	div {
		margin-bottom: 3.5rem;
	}
}
.error {
	background-color: var(--warning-light);
	font-weight: 500;
	font-size: 2.5rem;

	min-width: 25rem;
	text-align: center;
	border-radius: 0.5rem;
}
.success {
	background-color: var(--success-light);
	font-weight: 500;
	font-size: 2.5rem;

	min-width: 25rem;
	text-align: center;
	border-radius: 0.5rem;
}
.btn {
	width: 100%;
}
</style>