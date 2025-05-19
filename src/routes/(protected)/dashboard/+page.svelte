<script lang="ts">
	import IconLogo from '$lib/assets/icons/IconLogo.svelte'
	import BarCategory from '$lib/components/Dashboard/BarCategory.svelte'
	import SectionJobs from '$lib/components/Dashboard/SectionJobs.svelte'
	import SectionHires from '$lib/components/Dashboard/SectionHires.svelte'
	import SectionCategories from '$lib/components/Dashboard/SectionCategories.svelte'

	let { data } = $props()
</script>

<BarCategory />

<section class="px-4 pt-6 pb-10 text-white">
	<div class="container mx-auto max-w-4xl">
		<SectionJobs {data} />

		<SectionCategories />

		<SectionHires {data} />

		<div
			class="bg-midnight my-10 flex flex-col-reverse items-center justify-center gap-6 px-8 py-14 lg:flex-row lg:gap-10 lg:py-20">
			<h2 class="text-3xl leading-tight font-bold max-lg:text-center lg:text-7xl">
				Your Gateway To <br /><span class="text-primary italic"> Global Work </span>
			</h2>

			<IconLogo className="w-40" />
		</div>
	</div>
</section>
