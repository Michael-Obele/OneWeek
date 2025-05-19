<script lang="ts">
	import { categories } from '$lib/stores/globalStore'

	const getSevenRandomCategories = () => {
		return $categories
			.slice()
			.sort(() => 0.5 - Math.random())
			.slice(0, 7)
	}
</script>

<div class="mt-4 w-full overflow-x-auto px-4 py-4">
	<div
		class="bg-cod-gray flex w-fit items-center justify-center gap-4 px-4 py-2 whitespace-nowrap lg:mx-auto lg:overflow-x-visible lg:whitespace-normal">
		{#if $categories?.length > 0}
			{#each getSevenRandomCategories() as category}
				<a
					href="/search?category={category.categoryName}"
					role="button"
					aria-label="Search jobs by {category.categoryName}"
					class="btn btn-ghost h-fit min-h-0 shrink-0 p-2 lg:shrink">
					{category.categoryName}</a>
			{/each}
		{:else}
			{#each Array(7) as _}
				<span class="btn btn-ghost h-fit min-h-0 shrink-0 p-2 lg:shrink">
					<div class="h-5 w-28"></div>
				</span>
			{/each}
		{/if}
	</div>
</div>
