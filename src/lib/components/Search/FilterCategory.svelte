<script lang="ts">
	import { categories } from '$lib/stores/globalStore'

	type CategoryState = 'all' | string[]
	let { selectedCategory = 'all', onChange } = $props<{
		selectedCategory?: CategoryState
		onChange?: (category: CategoryState) => void
	}>()

	function handleSelectCategory(category: string) {
		let newCategory: CategoryState

		if (Array.isArray(selectedCategory)) {
			if (selectedCategory.includes(category)) {
				const filtered = selectedCategory.filter((el) => el != category)
				newCategory = filtered.length === 0 ? 'all' : filtered
			} else {
				newCategory = [category, ...selectedCategory]
			}
		} else {
			newCategory = [category]
		}

		if (onChange) {
			onChange(newCategory)
		}
	}

	function handleSelectAll() {
		if (onChange) {
			onChange('all')
		}
	}
</script>

<div class="collapse-arrow collapse mt-5 min-h-0">
	<input type="checkbox" class="min-h-0" checked />
	<div
		class="collapse-title min-h-0 px-0 py-1.5 text-sm font-light after:end-2! after:top-4! after:h-[0.4rem]! after:w-[0.4rem]!">
		Category
	</div>
	<div class="collapse-content space-y-2 px-0">
		<button
			onclick={handleSelectAll}
			class="block w-fit py-1 text-sm {selectedCategory === 'all'
				? 'text-primary font-semibold'
				: ''}">
			All categories
		</button>
		{#each $categories as item}
			<button
				onclick={() => handleSelectCategory(item.categoryName)}
				class="block w-fit py-1 text-sm {Array.isArray(selectedCategory) &&
				selectedCategory.includes(item.categoryName)
					? 'text-primary font-semibold'
					: ''}">
				{item.categoryName}
			</button>
		{/each}
	</div>
</div>
