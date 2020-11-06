<template>
	<ValidationObserver v-slot="{ handleSubmit }" slim>
		<!-- eslint-disable -->
		<FormWrapper
			className="wider"
			title="Create product"
			@submit.prevent.native="
				handleSubmit(() =>
					editing
						? EDIT_PRODUCT({
								name: name.value,
								price: price.value,
								brand: brand.value,
								inStock: inStock.value,
								category: category.value,
								image: imagePath,
								description: description.value,
								id: $route.params.id,
						  })
						: CREATE_PRODUCT({
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
						step="0.01"
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
				<div class="form-group ">
					<FormInput
						reference="fileInput"
						:label="image.label"
						:type="image.type"
						:name="image.name"
						:id="image.id"
						v-model="image.value"
						:rules="image.rules"
						@change.native="setSelectedFile"
						ref="file"
					/>
					<div
						class="image"
						@click.prevent="$refs.file.$refs.fileInput.click()"
					>
						<span>
							Choose file
						</span>
						<button class="image-upload">
							Browse
						</button>
					</div>

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

import { EDIT_PRODUCT, CREATE_PRODUCT } from '@/store/constants/action_types';

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
			url: this.$route.params.image,
			imagePath: this.$route.params.image || '',
			editing: this.$route.params.editing,

			name: {
				label: 'Name',
				type: 'text',
				value: this.$route.params.name || null,
				rules: {
					required: true,
				},
				name: 'name',
				id: 'name',
			},
			price: {
				label: 'Price',
				type: 'number',
				value: this.$route.params.price || null,
				rules: {
					required: true,
				},
				name: 'price',
				id: 'price',
			},
			brand: {
				label: 'Brand',
				type: 'text',
				value: this.$route.params.brand || null,
				rules: {
					required: true,
				},
				name: 'brand',
				id: 'brand',
			},
			inStock: {
				label: 'In stock',
				type: 'number',
				value: this.$route.params.inStock || null,
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
				value: this.$route.params.category || null,
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
				value: this.$route.params.description || null,
				name: 'description',
				id: 'description',

				rules: {
					required: true,
				},
			},
		};
	},
	methods: {
		...mapActions([EDIT_PRODUCT, CREATE_PRODUCT]),
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

<style lang="scss" scoped>
.image {
	display: flex;
	align-items: center;
	cursor: pointer;
	justify-content: space-between;
	background-color: var(--grey);
	padding: 1rem 1.2rem;
}
.image-upload {
	border: none;
	padding: 0.75rem 2rem;
	border-radius: 3px;
	font-size: 1.8rem;
}
</style>
