<template>
	<transition name="fade" mode="out-in">
		<div class="modal" v-if="isOrderPlaced">
			<div class="overlay">
				<div
					class="modal-message spacing"
					v-clickOutside="{
						exclude: ['button-order'],
						handler: 'hideOrderModal',
					}"
				>
					<p>
						Order successfully paid
					</p>
					<button
						ref="button-order"
						class="btn"
						@click="hideOrderModal"
					>
						Ok
					</button>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import clickOutside from '@/directives/click-outside';

export default {
	name: 'ProfileSuccessModal',
	props: {
		isOrderPlaced: {
			type: Boolean,
			required: true,
		},
	},
	methods: {
		hideOrderModal() {
			this.$emit('hide-order-modal');
		},
	},
	directives: {
		clickOutside,
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
	background-color: rgba(0, 0, 0, 0.8);
	position: fixed;
}
.modal-message {
	position: absolute;
	top: 50%;
	left: 50%;
	padding: 5rem 7.5rem;

	font-size: 2.5rem;
	font-weight: 500;
	transform: translate(-50%, -50%);

	background-color: var(--font-secondary);
}

.btn {
	width: 100%;
}
</style>
