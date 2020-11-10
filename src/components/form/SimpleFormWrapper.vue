<template>
	<form class="form" :class="className">
		<slot name="form-content"> </slot>
	</form>
</template>

<script>
export default {
	name: "FormWrapper",
	props: {
		className: {
			type: String,
		},
	},
};
</script>

<style lang="scss" scoped>
.form {
	display: flex;
	flex-direction: column;

	width: 100%;
	max-width: 60rem;

	margin: 0 auto;
	@media only screen and(min-width:$v-12) {
		min-width: auto;
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
	}
}
.align-left {
	@media only screen and(min-width:$v-12) {
		margin: 0;
		max-width: 50rem;
	}
}
</style>
