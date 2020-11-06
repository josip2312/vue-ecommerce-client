<template>
	<div class="form-wrapper">
		<form class="form" :class="className">
			<div class="form-group">
				<h2 class="heading-2">{{ title }}</h2>
			</div>
			<slot name="form-content"></slot>
			<slot name="form-down"></slot>
		</form>
	</div>
</template>

<script>
export default {
	name: 'FormWrapper',
	props: {
		title: {
			type: String,
			required: true,
		},
		className: {
			type: String,
		},
	},
};
</script>

<style lang="scss" scoped>
.form-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;

	padding: 7.5rem 0;
	min-height: 91vh;
}
.form {
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	width: 90%;
	max-width: 50rem;
	padding: 2.5rem;

	background: var(--font-secondary);
	box-shadow: 0 3px 8px 0 hsla(0, 0%, 0%, 0.25);
	border-radius: 3px;

	.heading-2 {
		text-align: center;
	}

	.form-group {
		position: relative;
		margin: 2rem 0;

		label {
			text-transform: uppercase;
			letter-spacing: 1px;

			margin-bottom: 0.75rem;
		}
		span {
			display: flex;
			flex-direction: column;
		}
		.btn {
			width: 100%;
		}
	}
}
.wider {
	max-width: 60rem;
}
</style>
