<template>
	<div id="app">
		<TheHeader />
		<div class="wrap">
			<transition name="fade" mode="out-in">
				<router-view />
			</transition>
		</div>
		<TheFooter />
	</div>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader';
import TheFooter from '@/components/layout/TheFooter';

export default {
	name: 'App',
	components: {
		TheHeader,
		TheFooter,
	},
};
</script>
<style lang="scss">
@import '@/assets/sass/app.scss';
.wrap {
	min-height: 100vh;
}
@font-face {
	font-family: 'Vegan Style';
	src: local('vegan'), url('./assets/fonts/vegan.ttf') format('truetype');
}
</style>
