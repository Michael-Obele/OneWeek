<script lang="ts">
	import { userRole } from '$lib/stores/globalStore'
	import StepsJobApply from '$lib/components/JobDetails/StepsJobApply.svelte'
	import { page } from '$app/state'

	let { data, children } = $props<{ data: any; children: any }>()
</script>

<div class="mx-auto max-w-7xl px-4">
	{#if $userRole === 'client'}
		{#await data.lazy?.bidsCount then bidsCount}
			<StepsJobApply {bidsCount} jobId={page.params.jobId} />
		{/await}
	{/if}

	{@render children()}
</div>
