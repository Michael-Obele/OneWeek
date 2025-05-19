<script lang="ts">
	import Toolbar from '$lib/components/Global/Toolbar.svelte'
	
	let { children } = $props()
</script>

<Toolbar />
{@render children()}
