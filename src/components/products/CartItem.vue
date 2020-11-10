<template>
	<transition mode="out-in" name="fade">
		<div class="cart-item">
			<div class="cart-item-image">
				<img :src="cartItem.image" :alt="cartItem.name" />
			</div>
			<div class="cart-item-info">
				<div class="info-left">
					<div class="cart-item-name">{{ cartItem.name }}</div>
					<div class="cart-item-price">$ {{ cartItem.price }}</div>
				</div>
				<div class="info-right">
					<select
						class="cart-item-instock"
						:value="cartItem.quantity"
						@change="
							ADD_TO_CART({
								cartItem,
								quantity: $event.target.value,
							})
						"
					>
						<option
							v-for="(item, index) in cartItem.inStock"
							:key="index"
						>
							{{ item }}
						</option>
					</select>
					<button
						class="cart-item-delete"
						@click="REMOVE_FROM_CART(cartItem.product)"
					>
						<img src="@/assets/icons/trash.svg" alt="Delete" />
					</button>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { REMOVE_FROM_CART, ADD_TO_CART } from "@/store/constants/action_types";
import { mapActions } from "vuex";
export default {
	name: "CartItem",

	props: {
		cartItem: {
			type: Object,
		},
	},
	methods: {
		...mapActions([REMOVE_FROM_CART, ADD_TO_CART]),
	},
};
</script>

<style lang="scss" scoped>
.cart-item {
	display: flex;
	flex-direction: column;
	background-color: var(--grey-light);
	padding: 2rem 1.5rem;
	border-radius: 0.5rem;
	&:not(:last-child) {
		margin-bottom: 2.5rem;
	}
	@media only screen and(min-width:$v-9) {
		flex-direction: row;
	}
	&-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		@media only screen and(min-width:$v-9) {
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
		align-self: center;
		max-width: 35rem;
		margin-bottom: 2.5rem;
		@media only screen and(min-width:$v-9) {
			max-width: 25rem;

			margin-bottom: 0;
			margin-right: 2.5rem;
		}
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
