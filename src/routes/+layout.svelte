<script lang="ts">
	import '../app.css'
	import { page } from '$app/state'
	import OptimizedImage from '$lib/components/Global/OptimizedImage.svelte'

	// @ts-ignore
	import NProgress from 'nprogress'
	import { navigating } from '$app/state'

	// NProgress Loading bar
	import '$lib/assets/styles/nprogress.css'

	let { children } = $props()
	let showLoginBackground = $state(false)

	NProgress.configure({
		minimum: 0.1,
		showSpinner: false,
		speed: 300,
		trickleSpeed: 150,
		easing: 'ease',
		trickle: true
	})

	$effect(() => {
		if (navigating.to) {
			NProgress.start()
		} else {
			NProgress.done()
		}
	})

	// Check if we should show the login background
	$effect(() => {
		showLoginBackground = page.url.pathname === '/login'
	})
</script>

<div class="h-screen items-center justify-center">
	{#if showLoginBackground}
		<div class="absolute inset-0 -z-10 overflow-hidden">
			<OptimizedImage
				src="/images/login-background.png"
				alt="Login background"
				className="h-full w-full object-cover blur-xs"
				width={1920}
				height={1080} />
		</div>
	{/if}
	<main class="w-screen overflow-hidden">
		{@render children()}
	</main>
</div>
