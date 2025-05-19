<script lang="ts">
	import { page } from '$app/state'

	let { bidsCount, jobId } = $props<{
		bidsCount?: any
		jobId?: string
	}>()

	const steps = [
		{ id: 1, name: 'View Job Post', path: `/jobs/${jobId}` },
		{ id: 2, name: 'Invite Freelancers', path: `/jobs/${jobId}/invite` },
		{
			id: 3,
			name: `Review Bids (${bidsCount?.reviewBidsCount || 0})`,
			path: `/jobs/${jobId}/review`
		},
		{ id: 4, name: `Hire (${bidsCount?.hiredBidsCount || 0})`, path: `/jobs/${jobId}/hire` }
	]

	let currentStep = $state(1)

	$effect(() => {
		currentStep = steps.find((step) => page.url.pathname.endsWith(step.path))?.id ?? 1
	})
</script>

<div class="mt-20 hidden items-center justify-center md:flex">
	{#each steps as step, index}
		<!-- Step box -->
		<a
			href={step.path}
			class="btn h-15.5 content-center px-4 py-2 text-center font-medium {index === 3
				? 'w-1/12'
				: 'w-1/6'} {currentStep === step.id
				? 'btn-primary font-semibold'
				: 'btn-outline border-neutral'}"
			tabindex="0">
			{step.name}
		</a>

		<!-- Connecting line (except after the last step) -->
		{#if index < steps.length - 1}
			<div class="mx-2 h-0.5 w-32 {index < currentStep - 1 ? 'bg-primary' : 'bg-gray-300'}"></div>
		{/if}
	{/each}
</div>
