<template>
	<div class="product">
		<div class="product-name">
			{{ product.name }}
		</div>
		<div class="product-price">
			{{ product.price }}
		</div>
		<div class="product-category">
			{{ product.category }}
		</div>
		<div class="product-brand">
			{{ product.brand }}
		</div>
		<button class="product-edit" title="Edit">
			<img src="@/assets/icons/edit.svg" alt="Edit" />
		</button>
		<button
			class="product-delete"
			title="Delete"
			@click="DELETE_PRODUCT(product._id)"
		>
			<img src="@/assets/icons/trash.svg" alt="Delete" />
		</button>
	</div>
</template>

<script>
import { DELETE_PRODUCT, EDIT_PRODUCT } from '@/store/constants/action_types';
import { mapActions } from 'vuex';
export default {
	name: 'AdminProduct',
	props: {
		product: {
			type: Object,
			required: true,
		},
	},
	methods: {
		...mapActions([DELETE_PRODUCT, EDIT_PRODUCT]),
	},
};
</script>

<style lang="scss" scoped>
.product {
	display: flex;
	align-items: center;
	background-color: var(--grey);
	padding: 2rem 1.5rem;
	border-radius: 0.5rem;
	&-name,
	&-price,
	&-category,
	&-brand {
		flex: 1;
	}
	&-name {
	}
	&-price {
	}
	&-category {
	}
	&-brand {
	}
	&-edit,
	&-delete {
		cursor: pointer;
		background: none;
		border: none;
	}
	&-edit {
		margin-right: 2.5rem;
	}
	&-delete {
		background-color: var(--warning-light);
		padding: 1rem;
		border-radius: 3px;
	}
	img {
		width: 3rem;
		height: 3rem;
	}
	img:hover {
		transform: scale(1.1);
	}
}
</style>
