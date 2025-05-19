<script lang="ts">
	import { goto } from '$app/navigation'
	import { navigating } from '$app/state'
	import IconSearch2 from '$lib/assets/icons/IconSearch2.svelte'
	import ItemOpenJob from '$lib/components/Search/ItemOpenJob.svelte'
	import Tabs from '$lib/components/Global/Tabs.svelte'
	import Pagination from '$lib/components/Global/Pagination.svelte'
	import ItemJobPost from '$lib/components/Search/ItemJobPost.svelte'
	import ItemContract from '$lib/components/Search/ItemContract.svelte'
	import { userRole } from '$lib/stores/globalStore'

	// Import Search filter components
	import FilterLocation from '$lib/components/Search/FilterLocation.svelte'
	import FilterTimeZone from '$lib/components/Search/FilterTimeZone.svelte'
	import FilterCategory from '$lib/components/Search/FilterCategory.svelte'
	import FilterJobSuccess from '$lib/components/Search/FilterJobSuccess.svelte'
	import FilterEarnedAmount from '$lib/components/Search/FilterEarnedAmount.svelte'
	import FilterJobStatus from '$lib/components/Search/FilterJobStatus.svelte'
	import { createEmptyPaginationResponse } from '$lib/utils.js'
	import { FreelancersTable } from '$lib/components/Search/FreelancersTable.svelte'

	// Get props using Svelte 5 runes
	let { data, form } = $props()

	// Get search parameters from URL or data
	// Set default tab based on user role if not specified in URL
	// For freelancers: default to 'open-jobs'
	// For clients: default to 'job-posts'
	let initialTab = data.currentTab || ($userRole === 'freelancer' ? 'open-jobs' : 'job-posts')
	let currentTab = $state(initialTab)
	let currentPage = $state(data.currentPage || 1)
	let limit = $state(data.limit || 10)
	// Using page-based pagination instead of cursor-based with lastId

	// Search state
	let searchInputValue = $state(data.searchQuery || '')
	let preferredLocation = $state(data.location || 'all')
	let preferredTimeZone = $state(data.timezone || 'all')
	// Parse categoryNames to ensure it's either 'all' or a string array
	let selectedCategory = $state<'all' | string[]>(
		data.categoryNames === 'all'
			? 'all'
			: Array.isArray(data.categoryNames)
				? data.categoryNames
				: typeof data.categoryNames === 'string' && data.categoryNames !== 'all'
					? [data.categoryNames]
					: 'all'
	)
	let jobSuccessScore = $state(data.jobSuccessScore || 0)
	let earnedAmount = $state(data.earnedAmount || 0)
	let selectedJobStatus = $state(data.status || 'all') // Added state for job status

	// Get current promise based on the selected tab and user role
	// Function to get the current promise based on the tab and user role
	function getCurrentPromise(tab = currentTab) {
		if ($userRole === 'client') {
			switch (tab) {
				case 'job-posts':
					return data.lazy.jobPosts
				case 'contracts':
					return data.lazy.contracts
				case 'freelancers':
					return data.lazy.freelancers
				default:
					return Promise.resolve(createEmptyPaginationResponse(currentPage, limit))
			}
		} else if ($userRole === 'freelancer') {
			switch (tab) {
				case 'open-jobs':
					return data.lazy.openJobs
				case 'contracts':
					return data.lazy.contracts
				default:
					return Promise.resolve(createEmptyPaginationResponse(currentPage, limit))
			}
		}
		return Promise.resolve(createEmptyPaginationResponse(currentPage, limit))
	}

	// Get the current promise - make sure it updates when page or tab changes
	let currentPromise = $derived(getCurrentPromise())

	// Handle tab change
	function handleTabChange(tabTitle: string) {
		// Extract the base title without the count
		const baseTitle = tabTitle.split(' (')[0]

		if ($userRole === 'client') {
			if (baseTitle === 'Job Posts') {
				currentTab = 'job-posts'
			} else if (baseTitle === 'Contracts') {
				currentTab = 'contracts'
			} else if (baseTitle === 'Freelancers') {
				currentTab = 'freelancers'
			}
		} else if ($userRole === 'freelancer') {
			if (baseTitle === 'Open Jobs') {
				currentTab = 'open-jobs'
			} else if (baseTitle === 'Contracts') {
				currentTab = 'contracts'
			}
		}

		updateUrl()
	}

	// Handle page change
	async function handlePageChange(page: number) {
		currentPage = page
		await updateUrl()
		// The URL change will trigger a page reload with the new data
	}

	// Update the URL when tab, page, or search parameters change
	async function updateUrl() {
		const url = new URL(window.location.href)
		url.searchParams.set('tab', currentTab)
		url.searchParams.set('page', currentPage.toString())
		url.searchParams.set('limit', limit.toString())

		// Handle search query
		if (searchInputValue) {
			url.searchParams.set('q', searchInputValue)
		} else {
			url.searchParams.delete('q')
		}

		// Add search parameters
		if (preferredLocation !== 'all') url.searchParams.set('location', preferredLocation)
		else url.searchParams.delete('location')

		if (preferredTimeZone !== 'all') url.searchParams.set('timezone', preferredTimeZone)
		else url.searchParams.delete('timezone')

		if (selectedCategory !== 'all') {
			if (Array.isArray(selectedCategory)) {
				url.searchParams.set('category', selectedCategory.join(','))
			} else {
				url.searchParams.set('category', selectedCategory)
			}
		} else {
			url.searchParams.delete('category')
		}

		if (jobSuccessScore > 0) url.searchParams.set('jobSuccess', jobSuccessScore.toString())
		else url.searchParams.delete('jobSuccess')

		if (earnedAmount > 0) url.searchParams.set('earnedAmount', earnedAmount.toString())
		else url.searchParams.delete('earnedAmount')

		if (selectedJobStatus !== 'all') {
			url.searchParams.set('status', selectedJobStatus) // Set status if not 'all'
		} else {
			url.searchParams.delete('status') // Delete status if 'all'
		}

		// No need to handle lastId anymore as we're using page-based pagination

		// Use SvelteKit's goto for client-side navigation
		// Don't use replaceState for pagination to ensure a full navigation
		await goto(url.toString(), { replaceState: false })
	}

	// Handle search form submission
	async function handleSearch() {
		currentPage = 1
		await updateUrl()
	}

	// Redirect if form action returns searchParams
	$effect(() => {
		if (form?.success && form?.searchParams) {
			goto(`?${form.searchParams}`)
		}
	})

	// Update local state when filter components change
	function handleLocationChange(location: string) {
		preferredLocation = location
		handleSearch()
	}

	function handleTimeZoneChange(timezone: string) {
		preferredTimeZone = timezone
		handleSearch()
	}

	function handleCategoryChange(category: 'all' | string[]) {
		selectedCategory = category
		handleSearch()
	}

	function handleJobSuccessChange(score: number) {
		jobSuccessScore = score
		handleSearch()
	}

	function handleEarnedAmountChange(amount: number) {
		earnedAmount = amount
		handleSearch()
	}

	function handleStatusChange(status: string) {
		selectedJobStatus = status
		handleSearch() // Trigger search on status change
	}
</script>

<svelte:head>
	<title>Search - OneWeek</title>
</svelte:head>

<div class="w-full max-w-full pb-6 sm:pb-10">
	<div class="mx-auto w-full px-2 sm:px-4 lg:max-w-7xl lg:px-6 xl:max-w-[1400px]">
		<div class="flex flex-col md:flex-row md:gap-6 md:pt-10">
			<div
				class="border-primary w-full flex-shrink-0 px-2 pt-4 md:w-[300px] md:border-r lg:w-[350px]">
				<div>
					<form
						onsubmit={(e) => {
							e.preventDefault()
							handleSearch()
							return false
						}}>
						<div class="join w-full">
							<div class="grow">
								<label class="input join-item">
									<IconSearch2 />
									<input
										type="text"
										bind:value={searchInputValue}
										placeholder="Search"
										aria-label="Search Input" />
									<!-- <kbd
										class="kbd cursor-pointer"
										onclick={handleSearch}
										aria-label="Search"
										role="button">enter</kbd> -->
								</label>
							</div>
							<button type="submit" class="btn btn-primary join-item">Search</button>
						</div>
					</form>

					<FilterLocation
						{data}
						selectedLocation={preferredLocation}
						onChange={handleLocationChange} />
					<FilterTimeZone
						{data}
						selectedTimeZone={preferredTimeZone}
						onChange={handleTimeZoneChange} />
					<FilterCategory {selectedCategory} onChange={handleCategoryChange} />
					<FilterJobSuccess selectedScore={jobSuccessScore} onChange={handleJobSuccessChange} />
					<FilterEarnedAmount selectedAmount={earnedAmount} onChange={handleEarnedAmountChange} />
					<FilterJobStatus selectedStatus={selectedJobStatus} onChange={handleStatusChange} />
				</div>
			</div>

			<div class="mt-6 w-full flex-grow px-2 sm:px-4 md:mt-0">
				{#if $userRole === 'client'}
					<div class="w-full overflow-x-auto pt-2 sm:pt-4">
						<div
							role="tablist"
							class="scrollbar-none flex w-full flex-row items-center gap-2 overflow-x-auto pb-2 whitespace-nowrap sm:gap-4">
							<Tabs
								customTabs={[
									{ title: 'Job Posts' },
									{ title: 'Contracts' },
									{ title: 'Freelancers' }
								]}
								selectedTabTitle={currentTab === 'job-posts'
									? 'Job Posts'
									: currentTab === 'contracts'
										? 'Contracts'
										: 'Freelancers'}
								onTabChange={handleTabChange} />
						</div>
					</div>

					<div class="w-full pt-3 sm:pt-4">
						{#await currentPromise then value}
							{#if !navigating.to && value?.results?.length === 0}
								<div class="py-8 text-center">
									No {currentTab === 'job-posts'
										? 'job posts'
										: currentTab === 'contracts'
											? 'contracts'
											: 'freelancers'} found.
								</div>
							{/if}

							{#if !navigating.to && value?.results?.length > 0}
								{#if currentTab === 'job-posts'}
									{@render JobPostsTable(value.results)}
								{:else if currentTab === 'contracts'}
									{@render ContractsTable(value.results)}
								{:else if currentTab === 'freelancers'}
									{@render FreelancersTable(value.results)}
								{/if}
							{/if}

							{#if !navigating.to && (value?.pagination?.totalPages || 0) > 1}
								<Pagination
									currentPage={value?.pagination?.currentPage || currentPage}
									totalPages={value?.pagination?.totalPages || 0}
									totalCount={value?.pagination?.totalCount || 0}
									hasNextPage={value?.pagination?.hasNextPage}
									hasPrevPage={value?.pagination?.hasPrevPage}
									limit={value?.pagination?.limit}
									onPageChange={handlePageChange} />
							{/if}
						{:catch error}
							<p class="text-error py-8 text-center">Error loading data: {error.message}</p>
						{/await}
					</div>
				{:else if $userRole === 'freelancer'}
					<div class="w-full overflow-x-auto pt-2 sm:pt-4">
						<div
							role="tablist"
							class="scrollbar-none flex w-full flex-row items-center gap-2 overflow-x-auto pb-2 whitespace-nowrap sm:gap-4">
							<Tabs
								customTabs={[{ title: 'Open Jobs' }, { title: 'Contracts' }]}
								selectedTabTitle={currentTab === 'open-jobs' ? 'Open Jobs' : 'Contracts'}
								onTabChange={handleTabChange} />
						</div>
					</div>

					<div class="w-full pt-3 sm:pt-4">
						{#await currentPromise then value}
							{#if !navigating.to && value?.results?.length === 0}
								<div class="py-8 text-center">No jobs found.</div>
							{/if}

							{#if !navigating.to && value?.results?.length > 0}
								{@render JobsTable(value.results)}
							{/if}

							{#if !navigating.to && (value?.pagination?.totalPages || 0) > 1}
								<Pagination
									currentPage={value?.pagination?.currentPage || currentPage}
									totalPages={value?.pagination?.totalPages || 0}
									totalCount={value?.pagination?.totalCount || 0}
									hasNextPage={value?.pagination?.hasNextPage}
									hasPrevPage={value?.pagination?.hasPrevPage}
									limit={value?.pagination?.limit}
									onPageChange={handlePageChange} />
							{/if}
						{:catch error}
							<p class="text-error py-8 text-center">Error loading data: {error.message}</p>
						{/await}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

{#snippet JobPostsTable(jobPosts: any[])}
	<div class="min-h-[50vh] w-full overflow-x-auto">
		<table class="table w-full table-auto">
			<thead class="hidden">
				<tr>
					<th class="w-full md:w-3/5">Job Post</th>
					<th class="hidden md:table-cell md:w-1/5">Metrics</th>
					<th class="hidden md:table-cell md:w-1/5">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each jobPosts as jobPost}
					<ItemJobPost {jobPost} />
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}

{#snippet ContractsTable(contracts: any[])}
	<div class="min-h-[50vh] w-full overflow-x-auto">
		<table class="table w-full table-auto">
			<thead class="hidden">
				<tr>
					<th class="w-full md:w-3/5">Contract</th>
					<th class="hidden md:table-cell md:w-1/5">Status</th>
					<th class="hidden md:table-cell md:w-1/5">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each contracts as contract}
					<ItemContract {contract} />
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}

{#snippet JobsTable(jobs: any[])}
	<div class="w-full overflow-x-auto">
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
					<ItemOpenJob {job} isContract={currentTab === 'contracts'} />
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}
