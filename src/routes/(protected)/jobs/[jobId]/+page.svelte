<script lang="ts">
	import IconHeart from '$lib/assets/icons/IconHeart.svelte'
	import IconStar from '$lib/assets/icons/IconStar.svelte'
	import IconSuccess from '$lib/assets/icons/IconSuccess.svelte'
	import { timeSince, durationToText, experienceToText, getDateMMMDD } from '$lib/utils.js'
	import IconPrice from '$lib/assets/icons/job-details/IconPrice.svelte'
	import IconClock from '$lib/assets/icons/job-details/IconClock.svelte'
	import IconExperienceLevel from '$lib/assets/icons/job-details/IconExperienceLevel.svelte'
	import IconVerified from '$lib/assets/icons/job-details/IconVerified.svelte'
	import IconEdit from '$lib/assets/icons/job-details/IconEdit.svelte'
	import IconReuse from '$lib/assets/icons/job-details/IconReuse.svelte'
	import IconRemove from '$lib/assets/icons/job-details/IconRemove.svelte'
	import { userRole } from '$lib/stores/globalStore'
	import TagCategory from '$lib/components/Global/TagCategory.svelte'
	import IconLocation from '$lib/assets/icons/IconLocation.svelte'

	let { data } = $props()
	let applied = $state(false)

	const handleSaveJob = () => {}
</script>

{#await data.lazy.jobActivity then jobActivity}
	<div
		class="mx-20 mb-4 flex gap-2 bg-green-500 px-10 py-4 text-black"
		class:hidden={!applied || jobActivity?.hasApplied}>
		<IconSuccess />
		<div class="grid grid-rows-2">
			<div><p>You have already submitted a proposal.</p></div>
			<div>
				<a
					href="/bid-details/{jobActivity?.bidId}"
					class="font-bold underline"
					aria-label="View Proposal">View Proposal</a>
			</div>
		</div>
	</div>
{:catch error}
	<div class="alert alert-error">Error loading job activity: {error.message}</div>
{/await}

<div class="mt-10 grid grid-cols-1 gap-6 px-6 md:grid-cols-4 md:px-20">
	<div class="border-r-mine-shaft col-span-3 md:border-r">
		<h1 class="mb-4 text-2xl font-bold md:mb-0 md:pl-4">
			{data.jobDetails?.title || 'Loading job title...'}
		</h1>

		<div class="text-dove-gray mt-2 flex gap-20 tracking-wide md:pl-4">
			<p>
				Posted {timeSince(data.jobDetails?.createdAt)}
			</p>
			<div class="flex items-center gap-2">
				<IconLocation class="text-dove-gray" />
				<p>Remote</p>
			</div>
		</div>
		<div class="border-mine-shaft mt-4 border-t py-10 pr-10 md:pl-4">
			<h2>Job Overview</h2>
			<p>
				{data.jobDetails?.description}
			</p>
		</div>

		<div class="border-mine-shaft border-t py-8">
			<div class="text-dove-gray grid grid-cols-1 gap-4 px-8 md:grid-cols-3">
				<div class="flex gap-2">
					<div class="flex-shrink-0">
						<IconPrice />
					</div>
					<div>
						<p class="font-bold">${data.jobDetails?.amount}</p>
						<div class="capitalize">{data.jobDetails?.jobType}</div>
					</div>
				</div>
				<div class="flex gap-2">
					<div class="flex-shrink-0">
						<IconClock />
					</div>
					<div>
						<p class="font-bold">
							{durationToText(data.jobDetails?.duration)}
						</p>
						<div>Project Length</div>
					</div>
				</div>
				<div class="flex gap-2">
					<div class="flex-shrink-0">
						<IconExperienceLevel />
					</div>
					<div>
						<p class="font-bold capitalize">{data.jobDetails?.experience}</p>
						<div>{experienceToText(data.jobDetails?.experience)}</div>
					</div>
				</div>
			</div>
		</div>

		<div class="border-mine-shaft border-t py-8 md:hidden">
			{#if $userRole === 'freelancer'}
				{@render ApplyNow()}
			{/if}
			<div class="mt-2">
				{@render clientInfo()}
			</div>
		</div>

		<div class="border-mine-shaft grid gap-4 border-t py-8 md:pl-6">
			<h4 class="text-2xl font-semibold">Questions</h4>
			{#each data.jobDetails?.questions || [] as question, index}
				<span> {index + 1}. {question.description} </span>
			{/each}
		</div>

		<div class="border-mine-shaft grid gap-4 border-t py-8 md:pl-6">
			<h4 class="text-2xl font-semibold">Category and Subcategory</h4>

			<div class="flex gap-2">
				<TagCategory category={data.jobDetails?.categoryName} />
				<TagCategory category={data.jobDetails?.subcategoryName} />
			</div>
		</div>

		<!-- <div class="border-t border-mine-shaft py-8">Project Type: On-Going Project</div> -->
		<div class="border-mine-shaft border-y py-8 pl-6">
			<div class="grid grid-cols-2">
				<!-- <div>
							<p>Preferred qualifications</p>
							<div class="flex gap-2">Job success Score: At least 90% <IconSuccess /></div>
						</div> -->
				{#await data.lazy.jobActivity}
					<div>Loading activity data...</div>
				{:then jobActivity}
					<div>
						<p class="mb-2 text-xl font-semibold">Activity on this job</p>
						<p>Proposals: {jobActivity?.bidCount}</p>
						<p>Interviewing: {jobActivity?.messagedBidCount}</p>
					</div>
				{:catch error}
					<div class="text-error">Failed to load activity data</div>
				{/await}
			</div>
		</div>
	</div>
	<div class="col-span-1 hidden p-4 md:block">
		{#if $userRole === 'freelancer'}
			{@render ApplyNow()}
		{/if}
		<div>{@render clientInfo()}</div>
	</div>
</div>

<div class="border-mine-shaft mx-6 mt-10 border p-8 pl-6 md:mx-20">
	<div class="collapse-arrow collapse">
		<input type="checkbox" name="my-accordion-2" checked />
		<div class="collapse-title p-0">
			<span class="text-xl font-semibold">Client's recent history</span>
			<p class="text-lg font-semibold underline">Jobs in progress</p>
		</div>
		<div class="collapse-content">
			{#await data.lazy.jobsInProgress then value}
				<table class="table w-full table-auto">
					<tbody>
						{#each value.results as job}
							<tr class="hover:bg-base-300 block py-4 md:table-row">
								<td class="block md:table-cell md:w-3/4">
									<a
										href={`/jobs/${job._id}`}
										class="link link-primary text-lg font-semibold"
										aria-label="View Job">
										{job.title}
									</a>
									<div class="mt-2 flex gap-2">
										Freelancer:
										<a
											href={`/freelancers/${job._id}`}
											class="link link-primary"
											aria-label="View Freelancer">
											{job.freelancerDisplayName}
										</a>
									</div>
								</td>
								<td class="block md:table-cell md:w-1/4">
									<div class="flex flex-col">
										<span>{getDateMMMDD(job.startDate)} - Present</span>
										<span class="capitalize">{job.jobType}</span>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:catch error}
				<div class="alert alert-error">Failed to load jobs in progress</div>
			{/await}
		</div>
	</div>
</div>
<div class="border-mine-shaft mx-6 mb-10 border border-t-0 p-8 pl-6 md:mx-20">
	{#await data.lazy.clientOtherJobs}
		<div class="flex justify-center p-4">
			<span class="loading loading-spinner"></span>
		</div>
	{:then value}
		<p class="text-xl font-semibold">
			Other open jobs by this client ({value.results?.length})
		</p>
		{#each value.results as clientOtherJob}
			<div class="flex gap-4">
				<a class="link link-primary" href={`/jobs/${clientOtherJob._id}`} aria-label="View Job"
					>{clientOtherJob.title}</a>
				<span class="capitalize">({clientOtherJob.jobType})</span>
			</div>
		{/each}
	{:catch error}
		<div class="alert alert-error">Failed to load client's other jobs</div>
	{/await}
</div>

{#snippet clientInfo()}
	{@render clientEdit()}
	{#await data.lazy.clientDetails then clientDetails}
		<p class="mb-5 text-3xl font-semibold">About the client</p>
		<div class="text-dove-gray flex gap-2">
			<span class="text-primary"><IconVerified /></span> Payment method verified
		</div>
		<div class="text-dove-gray flex gap-2">
			<div class="flex items-center"><IconStar class="text-dove-gray" /></div>
			<span>{clientDetails?.clientRating || 'New'}</span>
		</div>
		<div class="text-dove-gray mt-4 grid gap-4">
			<div>
				<div class="font-semibold">{clientDetails?.location}</div>
				<div>{clientDetails?.timezone}</div>
			</div>
			<div>
				<div class="font-semibold">
					{clientDetails?.jobsPostedCount > 1
						? `${clientDetails?.jobsPostedCount || 0} jobs posted`
						: `${clientDetails?.jobsPostedCount || 0} job posted`}
				</div>
				<div>
					{((clientDetails?.hiredCount / clientDetails?.jobsPostedCount) * 100).toFixed(0)}% hire
					rate, {clientDetails?.jobsOpenCount || 0} open jobs
				</div>
			</div>
			<div>
				<div class="font-semibold">
					${clientDetails?.totalAmountSpent || 0} total spent
				</div>
				<div>
					{clientDetails?.hiredCount || 0} hires, {clientDetails?.activeCount || 0} active
				</div>
			</div>
		</div>
	{:catch error}
		<div class="alert alert-error">Failed to load client details</div>
	{/await}
{/snippet}

{#snippet clientEdit()}
	{#if $userRole === 'client'}
		<div class="text-primary mb-10 pl-4 md:pl-0">
			<ul class="grid gap-4">
				<li class="flex items-center">
					<a class="flex gap-3 hover:underline" href="/jobs/new"><IconEdit /> Edit Posting</a>
				</li>
				<li class="flex items-center">
					<a class="flex gap-3 hover:underline" href="/jobs/new"><IconReuse /> Reuse Posting</a>
				</li>
				<li class="flex items-center">
					<a class="flex gap-3 hover:underline" href="/jobs/new"><IconRemove /> Archive Posting</a>
				</li>
				<!-- <li class="flex items-center">
					<a class="flex gap-3 hover:underline" href="/jobs/new"><IconPrivate /> Make Private</a>
				</li> -->
			</ul>
		</div>
	{/if}
{/snippet}

{#snippet ApplyNow()}
	{#await data.lazy.jobActivity}
		<div class="flex justify-center">
			<span class="loading loading-spinner"></span>
		</div>
	{:then jobActivity}
		<div class="grid gap-2">
			<a
				class="btn btn-primary"
				class:btn-disabled={applied || jobActivity?.hasApplied}
				href={data.jobDetails?.jobType == 'fixed'
					? `/jobs/${data.jobDetails._id}/apply`
					: `/jobs/${data.jobDetails._id}/apply/hourly`}>Apply Now</a>
			<button class="btn btn-outline" onclick={() => handleSaveJob()}>
				<IconHeart />Save Job
			</button>
		</div>
	{:catch error}
		<div class="alert alert-error">Failed to load application status</div>
	{/await}
{/snippet}
