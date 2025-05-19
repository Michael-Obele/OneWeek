<script lang="ts">
	// Using Svelte 5 runes
	let { selectedScore = 0, onChange } = $props<{
		selectedScore?: number
		onChange?: (score: number) => void
	}>()

	// Map score values to display text and actual score values
	const scoreOptions = [
		{ text: 'Any score', value: 0 },
		{ text: 'Greater than 80%', value: 80 },
		{ text: 'Greater than 90%', value: 90 },
		{ text: 'Only 100%', value: 100 }
	]

	function handleChange(value: number) {
		if (onChange) {
			onChange(value)
		}
	}
</script>

<div class="collapse-arrow collapse mt-1 min-h-0">
	<input type="checkbox" class="min-h-0" />
	<div
		class="collapse-title min-h-0 px-0 py-1.5 text-sm font-light after:end-2! after:top-4! after:h-[0.4rem]! after:w-[0.4rem]!">
		Job success
	</div>

	<div class="collapse-content mt-1 px-0 pb-2">
		{#each scoreOptions as option}
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-4">
					<input
						type="radio"
						name="job-success"
						value={option.value}
						checked={selectedScore === option.value}
						onchange={() => handleChange(option.value)}
						class="radio radio-primary h-4 w-4" />
					<span class="label-text">{option.text}</span>
				</label>
			</div>
		{/each}
	</div>
</div>
