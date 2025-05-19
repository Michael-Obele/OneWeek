<script lang="ts">
	// Using Svelte 5 runes
	let {
		data,
		selectedTimeZone = 'all',
		onChange
	} = $props<{
		data: any
		selectedTimeZone?: string
		onChange?: (timezone: string) => void
	}>()

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement
		if (onChange) {
			onChange(target.value)
		}
	}
</script>

<fieldset class="fieldset mt-4">
	<legend class="fieldset-legend text-sm font-light">Time Zone</legend>
	<select class="select" value={selectedTimeZone} onchange={handleChange}>
		<option value="all">All</option>
		{#await data.lazy.regions then value}
			{#each value?.timeZones as timeZone}
				<option value={timeZone}>{timeZone}</option>
			{/each}
		{/await}
	</select>
</fieldset>
