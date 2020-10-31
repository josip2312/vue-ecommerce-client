<template>
	<div class="cart-item">
		<div class="cart-item-image">
			<img :src="product.image" alt="Product image" />
		</div>
		<div class="cart-item-info">
			<div class="info-left">
				<div class="cart-item-name">{{ product.name }}</div>
				<div class="cart-item-price">$ {{ product.price }}</div>
			</div>
			<div class="info-right">
				<select class="cart-item-instock" :value="product.quantity">
					<option
						v-for="(item, index) in product.quantity"
						:key="index"
					>
						{{ item }}
					</option>
				</select>
				<button class="cart-item-delete">
					<img src="@/assets/icons/trash.svg" alt="Delete" />
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CartItem',

	props: {
		product: {
			type: Object,
		},
	},
};
</script>

<style lang="scss" scoped>
.cart-item {
	display: flex;

	align-items: center;
	background-color: var(--grey-light);
	padding: 2rem 1.5rem;
	border-radius: 0.5rem;

	&-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		@media only screen and(min-width:$vp-9) {
			flex-direction: row;
		}

		.info-left,
		.info-right {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			padding: 1.5rem 1rem;
		}
	}
	&-image {
		max-width: 25rem;
		margin-right: 2.5rem;
	}
	&-name,
	&-price,
	&-image,
	&-instock {
	}
	&-name {
		font-size: 2rem;
		font-weight: 600;
	}
	&-price {
		font-size: 2rem;
		font-weight: 600;
	}
	&-instock {
		max-width: 10rem;
		margin-right: 2.5rem;
		padding: 0.6em 1.2em;
		border-radius: 0.5rem;
		background-color: var(--font-secondary);
	}

	&-delete {
		cursor: pointer;
		background: none;
		border: none;
		padding: 1rem;
		flex-shrink: 0;
		img {
			width: 3rem;
			height: 3rem;
		}
		img:hover {
			transform: scale(1.1);
		}
	}
}
</style>
