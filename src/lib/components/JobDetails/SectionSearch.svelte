<script lang="ts">
	import IconSearch2 from '$lib/assets/icons/IconSearch2.svelte'
	import IconFilter from '$lib/assets/icons/job-details/IconFilter.svelte'

	let { data, onSearch } = $props()
	let searchInputValue = $state(data?.searchQuery || '')
	let selectedFilter = $state('')

	const filters = [
		{
			title: 'By Newest'
		},
		{
			title: 'By Top Earnings'
		},
		{
			title: 'From Low to High'
		},
		{
			title: 'From High to Low'
		}
	]

	function handleSearch() {
		if (typeof onSearch === 'function') {
			onSearch(searchInputValue, selectedFilter)
		}
	}

	$effect(() => {
		// Update search input value when data changes
		if (data?.searchQuery !== undefined) {
			searchInputValue = data.searchQuery
		}
	})
</script>

<section>
	<form
		method="POST"
		action="?/search"
		class="flex w-full"
		onsubmit={(e) => {
			if (typeof onSearch === 'function') {
				e.preventDefault()
				handleSearch()
				return false
			}
		}}>
		<div class="join w-full">
			<div class="w-full grow">
				<label class="input join-item w-full">
					<IconSearch2 />
					<input
						type="text"
						name="searchQuery"
						bind:value={searchInputValue}
						placeholder="Search"
						aria-label="Search Input" />
				</label>
			</div>
			<button type="submit" class="btn btn-primary join-item mr-2">Search</button>
			<!-- <div class="join-item filter">
				<input
					class="btn btn-square"
					type="reset"
					value="×"
					onclick={() => (selectedFilter = '')} />
				{#each filters as filter}
					<input
						class="btn btn-outline {filter.title === selectedFilter ? 'btn-primary' : ''}"
						type="radio"
						name="filter"
						aria-label={filter.title}
						onclick={() => (selectedFilter = filter.title)}
						value={filter.title} />
				{/each}
			</div> -->
		</div>
		<!-- <div class="dropdown dropdown-end">
			<label tabindex="-1" class="btn btn-outline flex items-center gap-2" aria-label="Filter">
				<IconFilter />
				<span>Filter</span>
				{#if selectedFilter}<span class="badge badge-xs badge-warning"></span>{/if}
			</label>
			<ul
				tabindex="-1"
				class="dropdown-content menu bg-base-100 border-steel-gray mt-1 w-52 border p-2">
				{#each filters as item}
					<li>
						<button
							type="button"
							class="w-full text-left {selectedFilter === item.title ? 'menu-active' : ''}"
							onclick={() => (selectedFilter = selectedFilter === item.title ? '' : item.title)}>
							{item.title}
						</button>
					</li>
				{/each}
			</ul>
		</div> -->
	</form>
</section>
