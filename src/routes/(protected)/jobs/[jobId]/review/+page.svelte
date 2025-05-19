<script lang="ts">
	import Pagination from '$lib/components/Global/Pagination.svelte'
	import SectionSearch from '$lib/components/JobDetails/SectionSearch.svelte'
	import { goto } from '$app/navigation'
	import { navigating } from '$app/state'
	import { FreelancersTable } from '$lib/components/Search/FreelancersTable.svelte'
	import type { PageProps } from './$types'

	let { data, form }: PageProps = $props()

	// Search state
	let searchInputValue = $state(data.searchQuery || '')
	let currentPage = $state(data.currentPage || 1)
	let limit = $state(data.limit || 10)

	// Handle search form submission
	async function handleSearch(query?: string, filter?: string) {
		if (query !== undefined) {
			searchInputValue = query
		}
		// Reset to first page when searching
		currentPage = 1
		await updateUrl()
	}

	// Update the URL when search parameters change
	async function updateUrl() {
		const url = new URL(window.location.href)
		url.searchParams.set('page', currentPage.toString())
		url.searchParams.set('limit', limit.toString())

		// Handle search query
		if (searchInputValue) {
			url.searchParams.set('q', searchInputValue)
		} else {
			url.searchParams.delete('q')
		}

		// Use SvelteKit's goto for client-side navigation
		await goto(url.toString(), { replaceState: false })
	}

	// Handle page change
	async function handlePageChange(page: number) {
		currentPage = page
		await updateUrl()
	}

	// Redirect if form action returns searchParams
	$effect(() => {
		if (form?.success && form?.searchParams) {
			goto(`?${form.searchParams}`)
		}
	})

	// const handleSaveJob = (freelancer: any) => {
	// 	// Implementation for saving a job
	// 	console.log('Saving job:', freelancer)
	// 	// This would typically open a modal or navigate to a save job page
	// 	alert(`You are saving ${freelancer.displayName}'s job. This feature is coming soon!`)
	// }
</script>

<main class="mt-10 min-h-[50vh] md:mx-10">
	<SectionSearch {data} onSearch={handleSearch} />

	<section class="my-12">
		{#await data.lazy.freelancers then value}
			{#if !value || !value.results || !Array.isArray(value.results) || value.results.length === 0}
				<div class="flex flex-col items-center justify-center py-10">
					<p class="text-lg">No freelancers found.</p>
					<p class="text-sm text-gray-400">Try adjusting your filters or search criteria.</p>
				</div>
			{:else}
				{@render FreelancersTable(value.results)}
				<div class="mt-6 flex justify-center">
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
				</div>
			{/if}
		{:catch error}
			<div class="text-error flex flex-col items-center justify-center py-10">
				<p class="text-lg">Error loading freelancers: {error.message}</p>
			</div>
		{/await}
	</section>
</main>
