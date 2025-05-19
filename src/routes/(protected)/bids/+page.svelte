<script lang="ts">
	import { goto } from '$app/navigation'
	import { navigating } from '$app/state'
	import IconBoosted from '$lib/assets/icons/IconBoosted.svelte'
	import { capitalizeFirstLetter, bidInitiatedDate, timeSince } from '$lib/utils'
	import Tabs from '$lib/components/Global/Tabs.svelte'
	import Pagination from '$lib/components/Global/Pagination.svelte'

	// Get props using Svelte 5 runes
	let { data } = $props()

	// Tab management
	const tabs = $state(['Active', 'Submitted', 'Offers', 'Archived'])
	let currentTab = $state(capitalizeFirstLetter(data.currentTab || 'active'))

	// Pagination state
	let currentPage = $state(data.currentPage || 1)
	let limit = $state(data.limit || 10)

	// Get current promise based on the selected tab
	function getCurrentPromise() {
		switch (currentTab.toLowerCase()) {
			case 'active':
				return data.lazy.activeBids
			case 'submitted':
				return data.lazy.submittedBids
			case 'offers':
				return data.lazy.offerBids
			case 'archived':
				return data.lazy.archivedBids
			default:
				return Promise.resolve({
					results: [],
					pagination: {
						currentPage,
						totalPages: 0,
						totalCount: 0,
						hasNextPage: false,
						hasPrevPage: false,
						limit
					}
				})
		}
	}

	// Get the current promise
	let currentPromise = $derived(getCurrentPromise())

	// Handle tab change
	async function handleTabChange(tab: string) {
		currentTab = tab
		currentPage = 1
		await updateUrl()
	}

	// Handle page change
	async function handlePageChange(page: number) {
		currentPage = page
		await updateUrl()
	}

	// Update the URL when tab or page changes
	async function updateUrl() {
		const url = new URL(window.location.href)
		url.searchParams.set('tab', currentTab.toLowerCase())
		url.searchParams.set('page', currentPage.toString())
		url.searchParams.set('limit', limit.toString())

		// Use SvelteKit's goto for client-side navigation
		await goto(url.toString(), { replaceState: true })
	}
</script>

<svelte:head>
	<title>{capitalizeFirstLetter(currentTab)} Bids - OneWeek</title>
</svelte:head>

<section class="mx-auto mt-8 min-h-[50vh] max-w-7xl">
	<div class="w-full overflow-x-auto ps-4 pt-6 pb-4">
		<div
			role="tablist"
			class="flex w-fit min-w-full flex-row items-center gap-4 pe-4 whitespace-nowrap">
			<Tabs
				customTabs={tabs.map((tab) => ({ title: tab }))}
				selectedTabTitle={currentTab}
				onTabChange={handleTabChange} />
		</div>
	</div>

	<div class="mx-5 w-full pt-3">
		<h5 class="mb-3 w-full pl-4 text-start text-xl font-semibold">
			<span>
				{currentTab === 'Active'
					? 'Active Bids'
					: currentTab === 'Submitted'
						? 'Submitted Bids'
						: currentTab === 'Offers'
							? 'Offers'
							: 'Archived Bids'}
			</span>
			{#await currentPromise}
				(0)
			{:then value}
				({value.pagination?.totalCount || 0})
			{/await}
		</h5>

		{#await currentPromise}
			<!-- Show nothing while loading -->
		{:then value}
			{#if !navigating.to && value?.results?.length === 0}
				<div class="py-8 text-center">No bids found.</div>
			{/if}

			{#if !navigating.to && value?.results?.length > 0}
				{@render ProposalTable(value.results)}
			{/if}

			{#if !navigating.to && (value?.pagination?.totalPages || 0) > 1}
				<Pagination
					{currentPage}
					totalPages={value?.pagination?.totalPages || 0}
					totalCount={value?.pagination?.totalCount || 0}
					hasNextPage={value?.pagination?.hasNextPage || false}
					hasPrevPage={value?.pagination?.hasPrevPage || false}
					limit={value?.pagination?.limit || limit}
					onPageChange={handlePageChange} />
			{/if}
		{:catch error}
			<p class="text-error py-8 text-center">Error loading bids: {error.message}</p>
		{/await}
	</div>
</section>

{#snippet ProposalTable(bids: any[])}
	<table class="table">
		<thead class="hidden">
			<tr>
				<th class="w-1/5">Initiation Date</th>
				<th class="w-3/5">Job</th>
				<th class="w-1/5">Profile Used</th>
			</tr>
		</thead>
		<tbody>
			{#each bids as bid}
				<tr class="hover:bg-base-300 py-5">
					<td class="w-1/5">
						<div class="flex flex-col">
							{#if bid.createdAt}
								<small class="text-start text-base">
									{bidInitiatedDate(bid.createdAt, '')}
								</small>
								<small class="text-sm">{timeSince(bid.createdAt)}</small>
							{:else if bid.updatedAt}
								<small class="text-start text-base">
									{bidInitiatedDate(bid.updatedAt, 'Offer')}
								</small>
								<small>{timeSince(bid.updatedAt)}</small>
							{/if}
						</div>
					</td>
					<td>
						{#if bid.isBoosted === 1}
							<small class="flex flex-row items-center justify-start text-sm">
								<IconBoosted />
								<span>Boosted</span>
							</small>
						{/if}
						<a class="link link-primary text-base" href="/job-detail/{bid._id}">{bid.jobTitle}</a>
					</td>

					<td class="text-right">
						<small class="text-base">
							{bid.profileTitle === null ? 'General Profile' : bid.profileTitle}
						</small>
						{#if bid.isViewed}
							<small class="text-sm">Viewed by client</small>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/snippet}
