<script lang="ts">
	import IconStar from '$lib/assets/icons/IconStar.svelte'
	import IconSuitcase from '$lib/assets/icons/IconSuitcase.svelte'
	import ItemOpenJob from '$lib/components/Search/ItemOpenJob.svelte'
	import TagStatus from '$lib/components/Global/TagStatus.svelte'
	import Tabs from '$lib/components/Global/Tabs.svelte'
	import { userRole } from '$lib/stores/globalStore'

	let { data } = $props()
	let selectedOpenJobsTab = $state('Most Recent')
</script>

{#if $userRole === 'freelancer'}
	<div class="">
		<div class="flex items-center justify-between">
			<div class="text-xl font-semibold tracking-wide">Open Jobs</div>
		</div>

		<div class="w-full overflow-x-auto pt-6 pb-4">
			<div role="tablist" class="tabs flex w-full items-center gap-4 whitespace-nowrap">
				<Tabs
					customTabs={[{ title: 'Most Recent' }, { title: 'Best Matches' }]}
					selectedTabTitle={selectedOpenJobsTab}
					onTabChange={(tab) => (selectedOpenJobsTab = tab)} />
				<a href="/search?tab=open-jobs" class="link ml-auto text-sm font-medium"> Explore Jobs </a>
			</div>
		</div>

		{#if selectedOpenJobsTab === 'Most Recent'}
			{#await data?.lazy?.freelancerData?.mostRecent then value}
				{@render JobsTable(value?.results)}
			{/await}
		{:else}
			{#await data?.lazy?.freelancerData?.bestMatches then value}
				{@render JobsTable(value?.results)}
			{/await}
		{/if}
	</div>
{:else if $userRole === 'client'}
	<div class="flex items-end justify-between">
		<div class="text-xl font-semibold">Client Hires</div>
		<a href="/search?tab=contracts" class="link text-sm"> View All </a>
	</div>
	{#await data?.lazy?.clientData?.hired then value}
		<div
			class="mt-2 grid auto-cols-[calc((100%_-_theme(space.12))_/_3)] grid-flow-col gap-6 overflow-x-auto pb-10">
			{#each value?.results as hire}
				<div class="bg-base-300 p-4">
					<div class="flex items-center gap-4">
						<img src={hire.avatar} alt="freelancer" class="aspect-square w-10 shrink-0" />

						<div>
							<div class="text-lg font-semibold">{hire.displayName}</div>
							<div class="text-silver -mt-1 text-sm">{hire.location}</div>
						</div>
					</div>

					<h3 class="mt-4 text-xl font-semibold">
						{hire.title}
					</h3>

					<div class="text-silver mt-3 grid grid-cols-[2fr_3fr] text-xs whitespace-nowrap">
						<div
							class="tooltip tooltip-top flex w-fit items-center gap-2"
							data-tip="Average Rating">
							<IconStar />
							{hire.averageRating}
						</div>

						<div class="tooltip tooltip-top flex w-fit items-center gap-2" data-tip="Total Jobs">
							<IconSuitcase />
							{hire.totalJobs}
						</div>
					</div>

					<div class="mt-4 flex flex-wrap gap-2">
						<TagStatus status={hire.status} />
					</div>

					<a
						href="/bid-details/{hire.bidId}"
						class="btn btn-primary mt-4 h-fit min-h-0 w-full py-2 text-base">
						View bid
					</a>
				</div>
			{/each}
		</div>
	{/await}
{/if}

{#snippet JobsTable(jobs: any[])}
	<table class="table w-full table-auto">
		<thead class="hidden">
			<tr>
				<th class="w-full md:w-3/5">Job</th>
				<th class="hidden md:table-cell md:w-1/5">Budget</th>
				<th class="hidden md:table-cell md:w-1/5">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each jobs as job}
				<ItemOpenJob {job} />
			{/each}
		</tbody>
	</table>
{/snippet}
