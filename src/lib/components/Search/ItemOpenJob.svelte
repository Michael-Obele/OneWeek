<script lang="ts">
	import { timeSince, durationToText, getDollarFormat, bidCountToGeneral } from '$lib/utils'
	import IconStar from '$lib/assets/icons/IconStar.svelte'
	import IconLocation from '$lib/assets/icons/IconLocation.svelte'
	import TagCategory from '$lib/components/Global/TagCategory.svelte'

	let { job, isContract = false }: { job: any; isContract?: boolean } = $props()
</script>

<tr class="hover:bg-base-300 block md:table-row">
	<td class="block md:table-cell">
		<div class="flex items-center justify-between gap-4">
			<div>
				<p class="text-xs tracking-wide">
					Posted {job.createdAt && timeSince(job.createdAt)}
				</p>

				<div class="mt-2 text-xl font-medium text-white">
					{job.title}
				</div>
			</div>
		</div>

		<p class="mt-4 text-xs tracking-wide">
			<span class="capitalize">{job.jobType}</span>: {getDollarFormat(job.amount)} -
			<span class="capitalize">{job.experience}</span>
			- Est. Time:
			{durationToText(job.duration)}
		</p>

		<div>
			<p class="mt-3 text-base">
				{job.description}
			</p>

			<div class="mt-4 flex flex-wrap items-center gap-2">
				<TagCategory category={job.categoryName} />
				<TagCategory category={job.subcategoryName} />
			</div>

			<div class="mt-3 flex flex-wrap items-center gap-6 gap-y-2 text-sm">
				<div class="flex gap-2">
					<IconStar />
					{job.averageRating}
				</div>

				<div>{getDollarFormat(job.totalAmountSpent)} spent</div>

				<div class="ml-6 flex items-center gap-1.5">
					<IconLocation />
					{job.location || 'unknown'}
				</div>
			</div>
			<div class="mt-2 text-sm">Bids: {bidCountToGeneral(job.bidCount)}</div>
		</div>
	</td>
	<td class="block align-top md:table-cell md:text-right">
		{#if isContract}
			<a class="btn btn-outline btn-sm w-full md:w-auto" href="/contracts/new?job={job._id}">
				View Bid
			</a>
		{:else}
			<a class="btn btn-primary btn-sm w-full md:w-auto" href="/contracts/new?job={job._id}">
				Send Bid
			</a>
		{/if}
	</td>
</tr>
