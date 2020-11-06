<template>
	<div class="pagination">
		<a @click.prevent="prevPage">Prev</a>
		<div class="page">{{ page }}</div>
		<a @click.prevent="nextPage">Next</a>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'Pagination',
	computed: {
		...mapState({
			page: (state) => state.productsModule.page,
			pages: (state) => state.productsModule.pages,
		}),
	},
	methods: {
		nextPage() {
			if (this.page + 1 <= this.pages) {
				this.$router.push(`/products/${this.page + 1}`);
			}
		},
		prevPage() {
			if (this.page - 1 >= 1) {
				this.$router.push(`/products/${this.page - 1}`);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.pagination {
	display: flex;
	justify-content: center;
	align-items: center;

	padding-top: 5rem;
	font-size: 1.8rem;
	a {
		padding: 0.5rem 1.5rem;
		font-weight: 500;
		color: var(--secondary);
		cursor: pointer;
	}
	.page {
		background-color: var(--secondary-light);
		padding: 1rem 2.5rem;
	}
}
</style>
