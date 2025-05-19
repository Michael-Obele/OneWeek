<script lang="ts">
	// Using Svelte 5 runes
	let {
		data,
		selectedLocation = 'all',
		onChange
	} = $props<{
		data: any
		selectedLocation?: string
		onChange?: (location: string) => void
	}>()

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement
		if (onChange) {
			onChange(target.value)
		}
	}
</script>

<fieldset class="fieldset mt-4">
	<legend class="fieldset-legend text-sm font-light">Location</legend>
	<select class="select" value={selectedLocation} onchange={handleChange}>
		<option value="all">All</option>
		{#await data.lazy.regions then value}
			{#each value?.locations as location}
				<option value={location}>{location}</option>
			{/each}
		{/await}
	</select>
</fieldset>

<!-- other filters -->
<!-- <div class="collapse collapse-arrow mt-1 min-h-0 bg-base-200 bg-transparent">
			<input type="checkbox" class="min-h-0" />
			<div
				class="collapse-title min-h-0 px-0 py-1.5 text-sm font-light after:end-2! after:top-4! after:h-[0.4rem]! after:w-[0.4rem]!">
				Hours billed
			</div>
			<div class="collapse-content mt-3 space-y-2 px-0">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur animi sapiente ad.
				Maxime cupiditate quae odio, nobis obcaecati eveniet, consectetur pariatur deleniti minus
				ipsam iusto labore dolores reiciendis quod dicta?
			</div>
		</div>

		<div class="collapse collapse-arrow mt-1 min-h-0 bg-base-200 bg-transparent">
			<input type="checkbox" class="min-h-0" />
			<div
				class="collapse-title min-h-0 px-0 py-1.5 text-sm font-light after:end-2! after:top-4! after:h-[0.4rem]! after:w-[0.4rem]!">
				English level
			</div>
			<div class="collapse-content mt-3 space-y-2 px-0">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur animi sapiente ad.
				Maxime cupiditate quae odio, nobis obcaecati eveniet, consectetur pariatur deleniti minus
				ipsam iusto labore dolores reiciendis quod dicta?
			</div>
		</div>

		<div class="collapse collapse-arrow mt-1 min-h-0 bg-base-200 bg-transparent">
			<input type="checkbox" class="min-h-0" />
			<div
				class="collapse-title min-h-0 px-0 py-1.5 text-sm font-light after:end-2! after:top-4! after:h-[0.4rem]! after:w-[0.4rem]!">
				Other languages
			</div>
			<div class="collapse-content mt-3 space-y-2 px-0">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur animi sapiente ad.
				Maxime cupiditate quae odio, nobis obcaecati eveniet, consectetur pariatur deleniti minus
				ipsam iusto labore dolores reiciendis quod dicta?
			</div>
		</div> -->

<!-- <div class="collapse-arrow collapse mt-5 min-h-0">
			<input type="checkbox" class="min-h-0" />
			<div
				class="collapse-title min-h-0 px-0 py-1.5 text-sm font-light after:end-2! after:top-4! after:!h-[0.5rem] after:!w-[0.5rem]">
				Talent type
			</div>
			<div class="collapse-content px-0 pb-0!">
				<div class="form-control mt-1 space-y-2">
					<label class="label cursor-pointer justify-start gap-4">
						<input
							type="checkbox"
							checked
							class="h-[18px] w-[18px] rounded-[2px] border-none bg-white/10 [--chkbg:#00B7CC] [--chkfg:white]" />
						<span class="label-text">Freelancers & Agencies</span>
					</label>
					<label class="label cursor-pointer justify-start gap-4">
						<input
							type="checkbox"
							class="h-[18px] w-[18px] rounded-[2px] border-none bg-white/10 [--chkbg:#00B7CC] [--chkfg:white]" />
						<span class="label-text">Freelancers</span>
					</label>
					<label class="label cursor-pointer justify-start gap-4">
						<input
							type="checkbox"
							class="h-[18px] w-[18px] rounded-[2px] border-none bg-white/10 [--chkbg:#00B7CC] [--chkfg:white]" />
						<span class="label-text">Agencies</span>
					</label>
					<label class="label cursor-pointer justify-start gap-4">
						<input
							type="checkbox"
							class="h-[18px] w-[18px] rounded-[2px] border-none bg-white/10 [--chkbg:#00B7CC] [--chkfg:white]" />
						<span class="label-text">Open to contract-to-hire</span>
					</label>
					<label class="label cursor-pointer justify-start gap-4">
						<input
							type="checkbox"
							class="h-[18px] w-[18px] rounded-[2px] border-none bg-white/10 [--chkbg:#00B7CC] [--chkfg:white]" />
						<span class="label-text">Offers consultations</span>
					</label>
				</div>
			</div>
		</div> -->
