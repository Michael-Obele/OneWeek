<script lang="ts">
	import IconAppStore from '$lib/assets/icons/IconAppStore.svelte'
	import IconLogo from '$lib/assets/icons/IconLogo.svelte'
	import IconPlayStore from '$lib/assets/icons/IconPlayStore.svelte'
	import IconLinkArrow from '$lib/assets/icons/IconLinkArrow.svelte'

	const currentYear = new Date().getFullYear()
</script>

<footer class="text-base-content mb-10 border-y border-white/10 px-6 py-14 md:px-10">
	<div class="footer md:footer-horizontal mx-auto max-w-5xl justify-between">
		<aside class="text-white">
			<a href="/">
				<div class="flex items-center gap-3 text-xl font-semibold">
					<IconLogo /> OneWeek
				</div>
			</a>

			<div class="mt-4 flex items-center gap-4">
				<IconAppStore />
				<IconPlayStore />
			</div>

			<div class="mt-14 text-xs font-medium max-md:hidden">
				Code Crow &copy; {currentYear} <span class="ml-4 text-white/50">v{__VERSION__} [beta]</span>
			</div>
		</aside>
		<nav>
			<h2 class="mb-4 text-sm font-medium">Socials</h2>
			<a
				href="https://github.com/CodeCrowCorp"
				class="group relative mb-1.5 text-white/60 no-underline hover:text-white"
				>GitHub<IconLinkArrow
					class="absolute top-1 -right-5 h-2 w-2 duration-100 group-hover:-right-6"
					color={`var(--link-arrow-color, #888888)`} /></a>
			<a
				href="https://twitter.com/gagansuie"
				class="group relative mb-1.5 text-white/60 no-underline hover:text-white"
				>Twitter<IconLinkArrow
					class="absolute top-1 -right-5 h-2 w-2 duration-100 group-hover:-right-6"
					color={`var(--link-arrow-color, #888888)`} /></a>
			<a
				href="https://twitch.tv/gagansuie"
				class="group relative mb-1.5 text-white/60 no-underline hover:text-white"
				>Twitch<IconLinkArrow
					class="absolute top-1 -right-5 h-2 w-2 duration-100 group-hover:-right-6"
					color={`var(--link-arrow-color, #888888)`} /></a>
			<a
				href="https://youtube.com/@gagansuie"
				class="group relative mb-1.5 text-white/60 no-underline hover:text-white"
				>YouTube<IconLinkArrow
					class="absolute top-1 -right-5 h-2 w-2 duration-100 group-hover:-right-6"
					color={`var(--link-arrow-color, #888888)`} /></a>
			<a
				href="https://tiktok.com/@gagansuie"
				class="group relative mb-1.5 text-white/60 no-underline hover:text-white"
				>TikTok<IconLinkArrow
					class="absolute top-1 -right-5 h-2 w-2 duration-100 group-hover:-right-6"
					color={`var(--link-arrow-color, #888888)`} /></a>
		</nav>
		<nav>
			<h2 class="mb-4 text-sm font-medium">Company</h2>
			<a href="/" class="group relative mb-1.5 text-white/60 no-underline hover:text-white"
				>About<IconLinkArrow
					class="absolute top-1 -right-5 h-2 w-2 duration-100 group-hover:-right-6"
					color={`var(--link-arrow-color, #888888)`} /></a>
			<a
				href="https://codecrow.io/careers"
				class="group relative mb-1.5 text-white/60 no-underline hover:text-white"
				>Careers<IconLinkArrow
					class="absolute top-1 -right-5 h-2 w-2 duration-100 group-hover:-right-6"
					color={`var(--link-arrow-color, #888888)`} /></a>
			<a
				href="https://codecrow.io/contact"
				class="group relative mb-1.5 text-white/60 no-underline hover:text-white"
				>Contact us<IconLinkArrow
					class="absolute top-1 -right-5 h-2 w-2 duration-100 group-hover:-right-6"
					color={`var(--link-arrow-color, #888888)`} /></a>
			<a
				href="https://codecrow.io/legal"
				class="group relative mb-1.5 text-white/60 no-underline hover:text-white"
				>Legal<IconLinkArrow
					class="absolute top-1 -right-5 h-2 w-2 duration-100 group-hover:-right-6"
					color={`var(--link-arrow-color, #888888)`} /></a>
		</nav>
	</div>
	<div class="mt-14 text-xs font-medium md:hidden">
		Code Crow &copy; {currentYear} <span class="ml-4 text-white/50">v{__VERSION__} [beta]</span>
	</div>
</footer>

<style>
	:global(.group:hover) {
		--link-arrow-color: white;
	}
</style>
