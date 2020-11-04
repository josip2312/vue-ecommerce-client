<template>
	<ItemContainer
		@click.native="FETCH_SINGLE_PRODUCT(product._id)"
		className="pointer"
	>
		<template #item-content>
			<div class="product-id">
				<span class="tag">ID: </span>
				<span>
					{{ product._id }}
				</span>
			</div>
		</template>
		<template #item-main>
			<div class="product-name">
				<span class="tag">Name: </span>
				<span>
					{{ product.name }}
				</span>
			</div>
			<div class="product-price">
				<span class="tag">Price: </span>
				<span>$ {{ product.price }} </span>
			</div>
		</template>
		<template #item-sec>
			<div class="product-category">
				<span class="tag">Category: </span>
				<span>
					{{ product.category }}
				</span>
			</div>
			<div class="product-brand">
				<span class="tag">Brand: </span>
				<span>
					{{ product.brand }}
				</span>
			</div>
		</template>
		<template #item-buttons>
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
		</template>
	</ItemContainer>
</template>

<script>
import ItemContainer from '@/components/layout/ItemContainer';

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
	components: {
		ItemContainer,
	},
	computed: {
		productId() {
			return this.product._id.slice(5) + '...';
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

<style lang="scss" scoped></style>
