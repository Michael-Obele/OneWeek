<script lang="ts">
	const props = $props<{
		currentPage?: number
		totalPages?: number
		totalCount?: number
		hasNextPage?: boolean
		hasPrevPage?: boolean
		limit?: number
		onPageChange: (page: number) => void
	}>()

	// Set default values
	const currentPage = $derived(props.currentPage ?? 1)

	// Use totalPages directly as a number
	const numericTotalPages = $derived(props.totalPages || 1)

	// Get the total count for display purposes
	const totalCount = $derived(props.totalCount || 0)

	// Calculate which page numbers to show
	// For small page counts (5 or less), show all pages
	const visiblePages = $derived(generateVisiblePages(currentPage, numericTotalPages))

	// Function to generate visible page numbers
	function generateVisiblePages(current: number, total: number): number[] {
		// Handle edge cases
		if (total <= 0) return [1]
		if (isNaN(total)) return [1]

		// If total pages is 5 or less, show all pages
		if (total <= 5) {
			return Array.from({ length: total }, (_, i) => i + 1)
		}

		// For larger page counts, show 5 pages with current in the middle when possible
		return getVisiblePagesForLargeCount(current, total)
	}

	function getVisiblePagesForLargeCount(current: number, total: number): number[] {
		// For larger page counts, show 5 pages with current in the middle when possible
		let pages: number[] = []

		// If near the start
		if (current <= 3) {
			// Show first 5 pages
			for (let i = 1; i <= Math.min(5, total); i++) {
				pages.push(i)
			}
		}
		// If near the end
		else if (current >= total - 2) {
			// Show last 5 pages
			for (let i = Math.max(1, total - 4); i <= total; i++) {
				pages.push(i)
			}
		}
		// In the middle
		else {
			// Show current page and 2 pages on each side
			for (let i = current - 2; i <= current + 2; i++) {
				if (i > 0 && i <= total) {
					pages.push(i)
				}
			}
		}

		// Ensure we always return at least one page
		if (pages.length === 0) {
			pages.push(1)
		}

		return pages
	}

	function handlePrevClick() {
		// Check if we can go to the previous page using either hasPrevPage or currentPage
		if (props.hasPrevPage !== undefined ? props.hasPrevPage : currentPage > 1) {
			props.onPageChange(currentPage - 1)
		}
	}

	function handleNextClick() {
		// Check if we can go to the next page using either hasNextPage or totalPages
		if (props.hasNextPage !== undefined ? props.hasNextPage : currentPage < numericTotalPages) {
			props.onPageChange(currentPage + 1)
		}
	}

	function handlePageClick(page: number) {
		props.onPageChange(page)
	}
</script>

<div class="mt-8 mb-4 flex flex-col items-center">
	<div class="join gap-2">
		<!-- Previous button -->
		{#if props.hasPrevPage !== undefined ? props.hasPrevPage : currentPage > 1}
			<button class="join-item btn btn-square" onclick={handlePrevClick} aria-label="Previous page">
				&laquo;
			</button>
		{/if}

		<!-- Page numbers -->
		{#each visiblePages as page}
			<button
				class="join-item btn btn-square {page === currentPage ? 'btn-primary' : ''}"
				onclick={() => handlePageClick(page)}
				aria-label="Page {page}"
				aria-current={page === currentPage ? 'page' : undefined}>
				{page}
			</button>
		{/each}

		<!-- Next button -->
		{#if props.hasNextPage !== undefined ? props.hasNextPage : currentPage < numericTotalPages}
			<button class="join-item btn btn-square" onclick={handleNextClick} aria-label="Next page">
				&raquo;
			</button>
		{/if}
	</div>
</div>
