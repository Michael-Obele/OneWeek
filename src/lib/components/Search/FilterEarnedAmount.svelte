<script lang="ts">
	// Using Svelte 5 runes
	let { selectedAmount = 0, onChange } = $props<{
		selectedAmount?: number
		onChange?: (amount: number) => void
	}>()

	// Map amount values to display text and actual amount values
	const amountOptions = [
		{ text: 'Any amount', value: 0 },
		{ text: '$1,000+', value: 1000 },
		{ text: '$10,000+', value: 10000 },
		{ text: '$100,000+', value: 100000 }
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
		Earned amount
	</div>
	<div class="collapse-content mt-1 px-0 pb-2">
		{#each amountOptions as option}
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-4">
					<input
						type="radio"
						name="earned-amount"
						value={option.value}
						checked={selectedAmount === option.value}
						onchange={() => handleChange(option.value)}
						class="radio radio-primary h-4 w-4" />
					<span class="label-text">{option.text}</span>
				</label>
			</div>
		{/each}
	</div>
</div>
