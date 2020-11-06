<template>
	<div class="item" :class="className">
		<div class="item-content">
			<slot name="item-content"> </slot>
		</div>
		<div class="item-main">
			<slot name="item-main"> </slot>
		</div>
		<div class="item-sec">
			<slot name="item-sec"> </slot>
		</div>
		<div class="item-buttons">
			<slot name="item-buttons"> </slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AdminItemContainer',
	props: {
		className: {
			type: String,
		},
	},
};
</script>

<style lang="scss" scoped>
.item {
	background-color: var(--grey-light);
	padding: 2rem 1.5rem;
	border-radius: 0.5rem;
	color: var(--primary);
	&:not(:last-child) {
		margin-bottom: 2.5rem;
	}
	@media only screen and(min-width:$vp-14) {
		padding: 2rem 1rem;

		display: flex;
		align-items: center;
	}
	&-content,
	&-main,
	&-sec,
	&-buttons {
		.tag {
			color: var(--font-primary);
			font-weight: 600;
			@media only screen and(min-width:$vp-14) {
				margin-right: 0.5rem;
				display: flex;
				align-items: center;
			}
		}
		& > * {
			display: flex;
			justify-content: space-between;
			max-width: 50rem;
			margin: 0 auto;

			padding: 1rem 0;

			@media only screen and(min-width:$vp-14) {
				justify-content: flex-start;
			}
		}
	}
	&-main,
	&-sec {
		flex: 1;

		@media only screen and(min-width:$vp-14) {
			display: flex;

			& > * {
				flex: 1;
			}
			.user-admin {
				flex: 0.5;
			}
		}
	}
	&-content {
		flex: 0.5;
		@media only screen and(min-width:$vp-14) {
			display: flex;
			justify-content: center;
		}
	}
	&-main {
	}

	&-buttons {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 50rem;
		margin: 0 auto;
		button {
			padding: 1rem;
			cursor: pointer;
			background: none;
			border: none;
		}
		img:first-child {
			@media only screen and(min-width:$vp-14) {
			}
		}
		img {
			width: 2.5rem;
			height: 2.5rem;
		}
		img:hover {
			transform: scale(1.1);
		}
	}
}
.pointer {
	cursor: pointer;
}
.admin-smaller {
	.item-sec {
		flex: 0.5;
	}
}
</style>
