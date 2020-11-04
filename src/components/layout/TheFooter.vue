<template>
	<div>
		<footer class="footer">
			<div class="footer-social">
				<a href="https://github.com/josip2312" target="_blank">
					<img src="@/assets/icons/github.svg" alt="Github" />
				</a>
				<a
					href="https://www.linkedin.com/in/josip-ivancic-b3521a1b4/"
					target="_blank"
				>
					<img src="@/assets/icons/linkedin.svg" alt="LinkedIn" />
				</a>
			</div>
			<div class="footer-copyright">
				Vue Ecommerce &copy;
			</div>
		</footer>
	</div>
</template>

<script>
export default {
	name: 'Footer',
};
</script>

<style lang="scss" scoped>
.footer {
	display: flex;
	align-items: center;
	flex-direction: column;

	padding: 5rem 0;
	background-color: var(--primary-dark);
	color: var(--font-secondary);

	&-social {
		display: flex;
		align-items: center;
		padding: 2.5rem 0;
		width: 100%;
		max-width: 30rem;
		justify-content: space-around;
		img {
			width: 3rem;
			height: 3rem;
		}
	}
	&-copyright {
		display: flex;
		align-items: center;
		padding: 2.5rem 0;
	}
}
</style>
