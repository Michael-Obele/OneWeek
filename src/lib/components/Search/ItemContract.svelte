<script lang="ts">
	import { getDateMMMDD } from '$lib/utils'
	import IconOptionDots from '$lib/assets/icons/IconOptionDots.svelte'
	import RatingStars from '$lib/components/Global/RatingStars.svelte'

	// Props for the component using Svelte 5 runes
	let { contract } = $props()

	// Get payment status text
	function getPaymentButtonText(contract: any) {
		if (!contract) return 'Pay Now'

		if (contract.status === 'completed') {
			return 'Completed'
		} else if (contract.paymentPending) {
			return 'Pay Now'
		} else if (contract.status === 'active' || contract.status === 'in_progress') {
			return 'View Contract'
		} else {
			return 'View Details'
		}
	}
</script>

<tr class="hover:bg-base-300 block md:table-row">
	<!-- Section 1: Freelancer info column -->
	{@render Section1()}
	<!-- Section 2: Contract status and budget column -->
	{@render Section2()}
	<!-- Section 3: Action buttons column -->
	{@render Section3()}
</tr>

{#snippet Section1()}
	<td class="block md:table-cell">
		<h3 class="line-clamp-2 max-w-xs overflow-hidden text-xl font-semibold break-words">
			{contract.title || 'Untitled Contract'}
		</h3>
		<div class="mt-2 flex gap-4">
			<img src={contract.avatar} class="h-12 w-12" alt="Freelancer avatar" />
			<div>
				<p class="font-semibold">{contract.displayName}</p>
				<p class="text-silver-light text-sm">{contract.localTime || 'Unknown timezone'}</p>
			</div>
		</div>
		<p class="mt-2">
			{getDateMMMDD(contract.startDate)} - {contract.endDate
				? getDateMMMDD(contract.endDate)
				: 'Present'}
		</p>
	</td>
{/snippet}

{#snippet Section2()}
	<td class="block align-top md:table-cell">
		{#if !contract.isActive}
			<div class="flex gap-2">
				<span class="badge badge-neutral font-semibold">Ended</span>
				<div class="badge flex gap-1 border-none">
					<RatingStars rating={contract.averageRating} />
					<span class="ml-1 font-semibold">{contract.averageRating?.toFixed(1) ?? 'N/A'}</span>
				</div>
			</div>
		{:else}
			<div class="flex gap-2">
				<span class="badge badge-primary font-semibold">Active</span>
				<span class="badge border-none font-semibold"
					>Milestone {contract.currentMilestoneNumber || 'Unknown'}</span>
			</div>
			<p class="text-silver-light mt-2 text-sm">
				{contract.currentMilestoneDescription || 'No description available'}
			</p>
		{/if}
		<p class="mt-3">${contract.amount || '0'} Budget</p>
		{#if contract.isActive}<p>${contract.currentMilestoneAmount || '0'} in Project funds</p>{/if}
	</td>
{/snippet}

{#snippet Section3()}
	<td class="block text-left md:table-cell md:text-right md:align-top">
		<div class="flex w-full justify-between gap-2 md:justify-end">
			<button class="btn btn-outline btn-sm flex-1 md:flex-initial">
				{getPaymentButtonText(contract)}
			</button>

			<div class="dropdown dropdown-left">
				<button class="btn btn-ghost btn-sm">
					<IconOptionDots />
				</button>

				<ul class="menu dropdown-content bg-base-100 z-10 w-60 gap-1 border p-2 shadow">
					<li><a href="/contracts/{contract.id || ''}">View milestones & payments</a></li>
					<li><a href="/messages/{contract.id || ''}">Send a message</a></li>
					<li><a href="/contracts/{contract.id || ''}/terms">View terms & settings</a></li>
					<li><a href="/contracts/{contract.id || ''}/bonus">Give bonus</a></li>
					<li><a href="/contracts/{contract.id || ''}/feedback">Give feedback</a></li>
					<li><a href="/jobs/new">End contract</a></li>
					<li><a href="/jobs/new">View profile</a></li>
				</ul>
			</div>
		</div>
	</td>
{/snippet}
