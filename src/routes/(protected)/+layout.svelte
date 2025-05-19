<script lang="ts">
	import { page } from '$app/state'
	import Footer from '$lib/components/Global/Footer.svelte'
	import ToolbarAuthed from '$lib/components/Global/ToolbarAuthed.svelte'
	import { initializeWebSocket, cleanupWebSocket } from '$lib/stores/websocketStore'
	import { categories } from '$lib/stores/globalStore'
	import { get } from '$lib/api'
	import { userRole } from '$lib/stores/globalStore'

	let { children } = $props()

	$effect.root(() => {
		userRole.set(page.data?.user?.user?.role)
		initializeWebSocket()
		get(`categories`, { userId: page.data.user.userId, token: page.data.user.token }).then(
			(rawCategories) => {
				categories.set(
					rawCategories.map((category: any, index: number) => ({
						...category,
						key: String.fromCharCode(65 + index) // A, B, C, etc.
					}))
				)
			}
		)

		return () => {
			cleanupWebSocket()
		}
	})
</script>

{#if page.url.pathname != '/jobs/new'}
	<ToolbarAuthed />
{/if}

{@render children()}

{#if !page.url.pathname.startsWith('/messages') && !page.url.pathname.startsWith('/jobs') && !page.url.pathname.startsWith('/search') && !page.url.pathname.startsWith('/bids')}
	<Footer />
{/if}
