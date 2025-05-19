<script>
	import IconAiPowered from '$lib/assets/icons/IconAiPowered.svelte'
	import IconArrow from '$lib/assets/icons/IconArrow.svelte'
	import IconBulb from '$lib/assets/icons/IconBulb.svelte'
	import IconJobTiles from '$lib/assets/icons/IconJobTiles.svelte'
	import IconLightning from '$lib/assets/icons/IconLightning.svelte'
	import IconLowestFees from '$lib/assets/icons/IconLowestFees.svelte'
	import IconTalent from '$lib/assets/icons/IconTalent.svelte'
	import IconTrust from '$lib/assets/icons/IconTrust.svelte'
	import IconVersatileMarketplace from '$lib/assets/icons/IconVersatileMarketplace.svelte'
	import IconSwapClientAndFL from '$lib/assets/icons/IconSwapClientAndFL.svelte'
	import OptimizedImage from '$lib/components/Global/OptimizedImage.svelte'
</script>

<div class="mx-auto mt-32 max-w-7xl md:px-5">
	<section class="">
		<h2
			class="flex flex-wrap items-center justify-center gap-2 text-center text-4xl leading-normal font-semibold text-white max-md:flex-col md:text-5xl">
			Collaborate & Create <span class="text-primary flex items-center gap-3">
				With Trust <IconTrust />
			</span>
		</h2>

		<p class="mt-4 text-center text-balance text-white/60 md:mt-6 md:text-lg">
			Communicate directly with freelancers on or off-platform without limitations
		</p>
	</section>

	<section
		class="from-primary to-midnight mx-auto mt-14 w-full max-w-7xl bg-linear-to-t via-[#1B7E89] px-5 py-8 text-center md:flex md:gap-10 md:bg-linear-to-l md:px-16 md:py-20 md:text-left">
		<div class="">
			<h3
				class="flex items-center justify-center gap-6 text-xl font-medium text-white md:flex-col md:items-start md:justify-start md:text-left">
				<div
					class="bg-[radial-gradient(circle,_rgba(255,255,255,0.3)_0%,_rgba(255,255,255,0.1)_100%);] p-5">
					<IconTalent />
				</div>
				Find Top Talent Today
			</h3>

			<p class="mt-5 max-w-96 text-base text-white/80 max-md:mx-auto">
				It doesn't matter whether you're hiring for a single project or building a remote team.
				OneWeek always has you covered.
			</p>
			<p class="max-w-96 text-white/80 max-md:mx-auto md:mt-4">
				No “connects” or contract initiation fees - just easy, transparent hiring and working.
			</p>

			<button class="btn btn-ghost mt-7 bg-white/20 text-left text-sm font-medium text-white">
				Start Exploring</button>
		</div>

		<div class="mt-6 flex max-w-sm gap-4 overflow-x-visible py-4 lg:max-w-md">
			<div class="w-fit">
				<IconJobTiles />
			</div>
		</div>
	</section>
</div>

<div class="mx-auto max-w-7xl px-5 py-10">
	<section class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-[1fr_2fr]">
		<div class="h-[710px] bg-white/10 px-5 py-16 md:px-10">
			<h3
				class="flex items-center justify-center gap-6 text-xl font-medium text-white md:flex-col md:items-start md:justify-start md:text-left">
				<div
					class="bg-[radial-gradient(circle,_rgba(255,255,255,0.3)_0%,_rgba(255,255,255,0.1)_100%);] p-5">
					<IconLightning />
				</div>
				Fastest Growing Platform
			</h3>

			<p class="mx-auto mt-5 max-w-[24rem] text-center text-balance text-white/80 md:text-left">
				OneWeek is quickly becoming one of the most popular places for freelancers and businesses to
				connect. Here's why more people are choosing us every day
			</p>

			<ul class="mt-10 space-y-4">
				<li
					class="text-primary flex h-15 max-w-sm items-center gap-3 bg-white/10 p-3 font-medium max-md:mx-auto max-md:w-11/12">
					<div class="w-fit p-2">
						<IconLowestFees />
					</div>
					Lowest fees
				</li>
				<li
					class="text-primary flex h-15 max-w-sm items-center gap-3 bg-white/10 p-3 font-medium max-md:mx-auto max-md:w-11/12">
					<div class="w-fit p-2">
						<IconAiPowered />
					</div>
					AI-powered talent-matching
				</li>
				<li
					class="text-primary flex h-15 max-w-sm items-center gap-3 bg-white/10 p-3 font-medium max-md:mx-auto max-md:w-11/12">
					<div class="w-fit p-2">
						<IconVersatileMarketplace />
					</div>
					Versatile marketplace
				</li>
				<li
					class="text-primary flex h-15 max-w-sm items-center gap-3 bg-white/10 p-3 font-medium max-md:mx-auto max-md:w-11/12">
					<div class="w-fit p-2">
						<IconSwapClientAndFL />
					</div>
					Swap client and freelancer profiles
				</li>
			</ul>
		</div>

		<div class="relative h-[710px] overflow-hidden bg-white/10 p-5 py-16 md:px-10">
			<OptimizedImage
				src="/images/skills-grid.png"
				className="absolute bottom-0 left-1/2 h-80 w-fit -translate-x-1/2 object-cover lg:h-96 lg:w-full lg:object-contain"
				alt="Skills visualization"
				width={1200}
				height={600} />

			<h3
				class="flex items-center justify-center gap-6 text-xl font-medium text-white md:flex-col md:items-start md:justify-start md:text-left">
				<div
					class="bg-[radial-gradient(circle,_rgba(255,255,255,0.3)_0%,_rgba(255,255,255,0.1)_100%);] p-5">
					<IconBulb />
				</div>
				Vast Skills Set Range
			</h3>

			<p
				class="mt-5 text-center text-balance text-white/80 max-md:mx-auto max-md:max-w-[24rem] md:w-10/12 md:text-left">
				At OneWeek, we connect you with freelancers from all fields and industries, offering a wide
				range of skills to meet any project need. Whether you're looking for technical expertise,
				creative solutions, or business support, you'll find the right talent here.
			</p>
		</div>
	</section>
	<a href="/" class="mx-auto mt-6 flex w-fit items-center gap-2 text-center">
		Explore More Talent
		<IconArrow width={12} />
	</a>
</div>
