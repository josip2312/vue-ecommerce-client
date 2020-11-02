<template>
	<div class="product" @click="FETCH_SINGLE_PRODUCT(product._id)">
		<div class="product-id">
			{{ product._id }}
		</div>
		<div class="product-main">
			<div class="product-name">
				{{ product.name }}
			</div>
			<div class="product-price">$ {{ product.price }}</div>
		</div>
		<div class="product-sec">
			<div class="product-category">
				{{ product.category }}
			</div>
			<div class="product-brand">
				{{ product.brand }}
			</div>
		</div>

		<div class="product-buttons">
			<button
				class="product-edit"
				title="Edit"
				@click.stop="sendToCreateProduct(product)"
			>
				<img src="@/assets/icons/edit.svg" alt="Edit" />
			</button>
			<button
				class="product-delete"
				title="Delete"
				@click.stop="DELETE_PRODUCT(product._id)"
			>
				<img src="@/assets/icons/trash.svg" alt="Delete" />
			</button>
		</div>
	</div>
</template>

<script>
import {
	DELETE_PRODUCT,
	EDIT_PRODUCT,
	FETCH_SINGLE_PRODUCT,
} from '@/store/constants/action_types';
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
		...mapActions([DELETE_PRODUCT, EDIT_PRODUCT, FETCH_SINGLE_PRODUCT]),
		sendToCreateProduct(product) {
			const {
				_id,
				name,
				brand,
				price,
				category,
				image,
				description,
				inStock,
			} = product;
			this.$router.push({
				name: 'CreateProduct',
				params: {
					id: _id,
					name,
					price,
					category,
					image,
					description,
					inStock,
					brand,
					editing: true,
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.product {
	background-color: var(--grey-light);
	padding: 2rem 1.5rem;
	border-radius: 0.5rem;

	cursor: pointer;
	@media only screen and(min-width:$vp-12) {
		display: flex;
		align-items: center;
	}
	&-id {
		flex: 1;
		text-align: center;
	}
	&-main,
	&-sec {
		display: flex;
		align-items: center;
		justify-content: space-around;
		& > * {
			@media only screen and(min-width:$vp-12) {
				flex: 1;
			}
		}
		@media only screen and(min-width:$vp-12) {
			justify-content: flex-start;
			flex: 1;
		}
	}
	&-buttons {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	&-name,
	&-price,
	&-category,
	&-brand {
		padding: 1.5rem 2rem;
	}
	&-name {
	}
	&-price {
		font-weight: 600;
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
		padding: 1.5rem 2rem;
		flex-shrink: 0;
	}
	&-edit {
		margin-right: 1rem;
	}
	&-delete {
		background-color: var(--warning-light);
		padding: 1rem;
		border-radius: 3px;
	}
	img {
		width: 2.5rem;
		height: 2.5rem;
	}
	img:hover {
		transform: scale(1.1);
	}
}
</style>
