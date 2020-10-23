<template>
	<div class="form-wrapper">
		<form class="form">
			<div class="form-group">
				<h2 class="heading-2">{{ title }}</h2>
			</div>
			<slot name="form-content"></slot>
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
	},
};
</script>

<style lang="scss" scoped>
.form-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;

	padding: 5rem 0;
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
	box-shadow: 0 2px 8px 0 hsla(0, 0%, 0%, 0.3);
	border-radius: 3px;

	.heading-2 {
		text-align: center;
	}

	.form-group {
		display: flex;
		flex-direction: column;

		position: relative;
		margin: 2rem 0;

		label {
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 1px;

			margin-bottom: 0.75rem;
		}
		span {
			display: flex;
			flex-direction: column;
		}
	}
}
</style>
