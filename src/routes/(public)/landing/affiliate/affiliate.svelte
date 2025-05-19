<script>
	import IconMedal from '$lib/assets/icons/IconMedal.svelte'
</script>

<div class="mx-auto max-w-7xl py-20">
	<section class="">
		<h2
			class="flex flex-wrap items-center justify-center gap-2 text-center text-4xl leading-normal font-semibold text-white max-md:flex-col md:text-5xl">
			Become an Affiliate
		</h2>

		<p class="mt-4 text-center text-balance text-white/60 md:mt-6 md:text-lg">
			Bring your contract from another platform and spend/earn at least $10,000 USD to earn an
			Affiliate badge (which provides higher rank in jobs and bids, and the lowest fees on future
			services)
		</p>

		<div class="relative mx-auto mt-20 aspect-square w-64 bg-white/10 p-2">
			<img class="h-full w-full object-cover" src="/images/affiliate.png" alt="a freelancer" />

			<div class="absolute -right-8 -bottom-8">
				<IconMedal />
			</div>
		</div>
	</section>
</div>
