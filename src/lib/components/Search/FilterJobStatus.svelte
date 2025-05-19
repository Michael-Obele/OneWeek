<script lang="ts">
	// Using Svelte 5 runes
	let { selectedStatus = 'all', onChange } = $props<{
		selectedStatus?: string
		onChange?: (status: string) => void
	}>()

	// Status options
	const statusOptions = [
		{ value: 'all', text: 'All' },
		{ value: 'draft', text: 'Draft' },
		{ value: 'open', text: 'Open' },
		{ value: 'filled', text: 'Filled' },
		{ value: 'closed', text: 'Closed' }
	]

	function handleChange(value: string) {
		if (onChange) {
			onChange(value)
		}
	}
</script>

<div class="collapse-arrow collapse mt-1 min-h-0">
	<input type="checkbox" class="min-h-0" />
	<div
		class="collapse-title min-h-0 px-0 py-1.5 text-sm font-light after:end-2! after:top-4! after:h-[0.4rem]! after:w-[0.4rem]!">
		Job Status
	</div>

	<div class="collapse-content mt-1 px-0 pb-2">
		{#each statusOptions as option}
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-4">
					<input
						type="radio"
						name="job-status"
						value={option.value}
						checked={selectedStatus === option.value}
						onchange={() => handleChange(option.value)}
						class="radio radio-primary h-4 w-4" />
					<span class="label-text">{option.text}</span>
				</label>
			</div>
		{/each}
	</div>
</div>
