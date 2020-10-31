<template>
	<div id="app">
		<TheHeader />
		<div class="wrap">
			<transition name="fade" mode="out-in">
				<router-view />
			</transition>
		</div>
	</div>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader';
import { mapActions } from 'vuex';

import { FETCH_PRODUCTS } from '@/store/constants/action_types';

export default {
	name: 'App',
	components: {
		TheHeader,
	},
	methods: {
		...mapActions([FETCH_PRODUCTS]),
	},

	created() {
		this.FETCH_PRODUCTS();
	},
};
</script>
<style lang="scss">
@import '@/assets/sass/app.scss';
.wrap {
	min-height: 91vh;
}
</style>
