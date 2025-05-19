<script lang="ts">
	// import IconHeart from '$lib/assets/icons/IconHeart.svelte'
	import IconLocation from '$lib/assets/icons/IconLocation.svelte'
	import IconPayment from '$lib/assets/icons/IconPayment.svelte'
	import IconPostJob from '$lib/assets/icons/IconPostJob.svelte'
	import TagStatus from '$lib/components/Global/TagStatus.svelte'
	import Tabs from '$lib/components/Global/Tabs.svelte'
	import { userRole } from '$lib/stores/globalStore'
	import { getDollarFormat } from '$lib/utils'

	let { data } = $props()
	let postedJobs: {
		[key: string]: any[]
	} = $state({})
	let activeJobs: {
		[key: string]: any[]
	} = $state({})

	$effect(() => {
		const fetchData = async () => {
			if ($userRole === 'client') {
				const jobsTemp = await data?.lazy?.clientData?.postedJobs
				if (jobsTemp?.results && Array.isArray(jobsTemp.results)) {
					postedJobs = jobsTemp.results.reduce(
						(newData: typeof postedJobs, job: { status: any }) => {
							const status = job.status
							;(newData[status] = newData[status] || []).push(job)
							return newData
						},
						{}
					)
				}
			} else if ($userRole === 'freelancer') {
				const jobsTemp = await data?.lazy?.freelancerData?.activeJobs
				if (jobsTemp?.results && Array.isArray(jobsTemp.results)) {
					activeJobs = jobsTemp.results.reduce(
						(newData: typeof activeJobs, job: { status: any }) => {
							const status = job.status
							;(newData[status] = newData[status] || []).push(job)
							return newData
						},
						{}
					)
				}
			}
		}

		fetchData()
	})

	let selectedCategory = $state('All')
	let sortedJobs = $derived.by(() => {
		if (selectedCategory === 'All') return Object.values(postedJobs).flat()
		return postedJobs[selectedCategory]
	})

	let selectedCategoryFreelancer = $state('All')
	let sortedJobsFreelancer = $derived.by(() => {
		if (selectedCategoryFreelancer === 'All') return Object.values(activeJobs).flat()
		return activeJobs[selectedCategoryFreelancer]
	})
</script>

{#if $userRole === 'freelancer'}
	<div class="">
		<div class="text-xl font-semibold">Active Jobs</div>

		<div class="w-full overflow-x-auto pt-6 pb-4">
			<div role="tablist" class="tabs flex w-full items-center gap-4 whitespace-nowrap">
				<Tabs
					customTabs={[
						{ title: 'All', count: Object.values(activeJobs).flat().length },
						...Object.keys(activeJobs).map((status) => ({
							title: status,
							count: activeJobs[status].length
						}))
					]}
					selectedTabTitle={selectedCategoryFreelancer}
					onTabChange={(tab) => (selectedCategoryFreelancer = tab)} />
				<a href="/search?tab=active-jobs" class="link ml-auto text-sm"> View All </a>
			</div>
		</div>

		<div class="divide-mine-shaft my-3 grid divide-y">
			{#each sortedJobsFreelancer as job}
				<a href="/jobs/{job._id}" class="hover:bg-base-200 py-4 md:px-3">
					<div class="flex items-center justify-between">
						<TagStatus status={job.status} />

						<!-- <button class="btn btn-ghost h-fit min-h-0 p-2">
							<IconHeart />
						</button> -->
					</div>

					<div class="">
						<div class="mt-4 text-xl font-medium text-white">
							{job.title}
						</div>

						<p class="mt-3 line-clamp-3 overflow-hidden text-base">
							{job.description}
						</p>

						<div class="mt-5 flex items-center gap-6 text-sm">
							<div class="flex items-center gap-2">
								<IconPayment /> Project funds: {getDollarFormat(job.amount)}
							</div>
							<div class="flex items-center gap-1.5">
								<IconLocation />
								{job.location || 'unknown'}
							</div>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
{:else if $userRole === 'client'}
	<div class="flex justify-between">
		<div class="text-xl font-semibold">Client Jobs</div>

		<a class="btn btn-primary flex h-fit min-h-0 items-center gap-2 py-2" href="/jobs/new">
			<IconPostJob />
			Post a job
		</a>
	</div>

	<div class="w-full overflow-x-auto pt-6 pb-4">
		<div role="tablist" class="tabs flex w-fit min-w-full items-center gap-4 whitespace-nowrap">
			<Tabs
				customTabs={[
					{ title: 'All', count: Object.values(postedJobs).flat().length },
					...Object.keys(postedJobs).map((status) => ({
						title: status,
						count: postedJobs[status].length
					}))
				]}
				selectedTabTitle={selectedCategory}
				onTabChange={(tab) => (selectedCategory = tab)} />
			<a href="/search?tab=job-posts" class="link ml-auto text-sm"> View All </a>
		</div>
	</div>

	<div
		class="mt-2 grid auto-cols-[calc((100%_-_theme(space.12))_/_3)] grid-flow-col gap-6 overflow-x-auto pb-10">
		{#each sortedJobs as job}
			<div class="bg-base-200 max-h-65 p-4 flex flex-col">
				<h3 class="text-xl font-semibold line-clamp-2 overflow-hidden mb-3">
					{job.title}
				</h3>

				<div class="text-silver text-sm line-clamp-2 overflow-hidden mb-4">{job.description || 'No description'}</div>

				<div class="mb-4">
					<TagStatus status={job.status} />
				</div>

				<a href="/jobs/{job._id}" class="btn btn-primary mt-auto h-fit min-h-0 w-full py-2 text-base">
					View job
				</a>
			</div>
		{/each}
	</div>
{/if}
