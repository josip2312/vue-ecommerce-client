<template>
	<ValidationObserver v-slot="{ handleSubmit }" slim>
		<FormWrapper
			className="wider"
			title="Create product"
			@submit.prevent.native="
				handleSubmit(() =>
					CREATE_PRODUCT({
						name: name.value,
						price: price.value,
						brand: brand.value,
						inStock: inStock.value,
						category: category.value,
						image: imagePath,
						description: description.value,
					}),
				)
			"
		>
			<template #form-content>
				<div class="form-group">
					<FormInput
						:label="name.label"
						:type="name.type"
						:name="name.name"
						:id="name.id"
						v-model="name.value"
						:rules="name.rules"
					/>
				</div>
				<div class="form-group">
					<FormInput
						:label="price.label"
						:type="price.type"
						:name="price.name"
						:id="price.id"
						v-model="price.value"
						:rules="price.rules"
					/>
				</div>
				<div class="form-group">
					<FormInput
						:label="brand.label"
						:type="brand.type"
						:name="brand.name"
						:id="brand.id"
						v-model="brand.value"
						:rules="brand.rules"
					/>
				</div>
				<div class="form-group">
					<FormInput
						:label="inStock.label"
						:type="inStock.type"
						:name="inStock.name"
						:id="inStock.id"
						v-model="inStock.value"
						:rules="inStock.rules"
					/>
				</div>
				<div class="form-group">
					<FormInput
						:label="category.label"
						:type="category.type"
						:name="category.name"
						:id="category.id"
						v-model="category.value"
						:rules="category.rules"
					/>
				</div>
				<div class="form-group">
					<FormInput
						:label="image.label"
						:type="image.type"
						:name="image.name"
						:id="image.id"
						v-model="image.value"
						:rules="image.rules"
						@change.native="setSelectedFile"
					/>
					<img v-if="url" :src="url" alt="" />
				</div>
				<div class="form-group">
					<FormTextarea
						:label="description.label"
						:name="description.name"
						:id="description.id"
						v-model="description.value"
						:rules="description.rules"
					/>
				</div>
				<div class="form-group">
					<button class="btn">Create</button>
				</div>
			</template>
		</FormWrapper>
	</ValidationObserver>
</template>

<script>
import FormWrapper from '@/components/form/FormWrapper';
import FormInput from '@/components/form/FormInput';
import FormTextarea from '@/components/form/FormTextarea';
import { ValidationObserver } from 'vee-validate';

import { CREATE_PRODUCT } from '@/store/constants/action_types';

import axios from 'axios';
import { mapActions } from 'vuex';

export default {
	name: 'CreateProduct',
	components: {
		FormWrapper,
		FormInput,
		ValidationObserver,

		FormTextarea,
	},
	data() {
		return {
			selectedFile: null,
			url: null,
			imagePath: '',

			name: {
				label: 'Name',
				type: 'text',
				value: null,
				rules: {
					required: true,
				},
				name: 'name',
				id: 'name',
			},
			price: {
				label: 'Price',
				type: 'number',
				value: null,
				rules: {
					required: true,
					numeric: true,
				},
				name: 'price',
				id: 'price',
			},
			brand: {
				label: 'Brand',
				type: 'text',
				value: null,
				rules: {
					required: true,
				},
				name: 'brand',
				id: 'brand',
			},
			inStock: {
				label: 'In stock',
				type: 'number',
				value: null,
				rules: {
					required: true,
					numeric: true,
				},
				name: 'inStock',
				id: 'inStock',
			},
			category: {
				label: 'Category',
				type: 'text',
				value: null,
				rules: {
					required: true,
				},
				name: 'category',
				id: 'category',
			},
			image: {
				label: 'Image',
				type: 'file',
				value: null,
				name: 'image',
				id: 'image',
			},
			description: {
				label: 'Description',
				value: null,
				name: 'description',
				id: 'description',

				rules: {
					required: true,
				},
			},
		};
	},
	methods: {
		...mapActions([CREATE_PRODUCT]),
		async setSelectedFile(e) {
			this.selectedFile = e.target.files[0];
			const file = e.target.files[0];
			const formData = new FormData();
			formData.append('image', file);
			this.url = URL.createObjectURL(file);

			try {
				const config = {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				};
				const { data } = await axios.post('/uploads', formData, config);
				this.imagePath = data;
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
