<script lang="ts">
	import IconOptionDots from '$lib/assets/icons/IconOptionDots.svelte'
	import { timeSince, toCapitalize } from '$lib/utils'

	// Props for the component using Svelte 5 runes
	let { jobPost } = $props()

	// Format the status and job type for display
	function getStatusText(job: any) {
		if (!job) return ''
		const jobType = job.jobType || 'fixed'
		const statusPrefix = job.status || 'draft'
		return toCapitalize(`${statusPrefix} - ${jobType}`)
	}

	// Format the posted date
	function getPostedText(job: any) {
		return `Posted ${timeSince(job.createdAt)}`
	}

	// Determine button text based on status
	function getButtonText(job: any) {
		return job?.status === 'filled' || job?.status === 'closed' ? 'Reuse posting' : 'View proposals'
	}
</script>

<tr class="hover:bg-base-300 block md:table-row">
	<!-- Section 1: Title and status column -->
	{@render Section1()}
	<!-- Section 2: Stats column -->
	{@render Section2()}
	<!-- Section 3: Action buttons column -->
	{@render Section3()}
</tr>

{#snippet Section1()}
	<td class="block md:table-cell">
		<h3 class="line-clamp-2 max-w-xs overflow-hidden text-xl font-semibold break-words">
			{jobPost.title || 'Untitled Job'}
		</h3>
		<p class="text-silver-light text-sm">{getPostedText(jobPost)}</p>
		<p class="mt-2">{getStatusText(jobPost)}</p>
	</td>
{/snippet}

{#snippet Section2()}
	<td class="block align-top md:table-cell">
		<ul class="flex gap-6">
			<li>
				<p>{jobPost.proposalCount || 0}</p>
				<p class="text-silver-light text-sm">Proposals</p>
			</li>
			<li>
				<p>{jobPost.messagedCount || 0}</p>
				<p class="text-silver-light text-sm">Messaged</p>
			</li>
			<li>
				<p>{jobPost.hiredCount || 0}</p>
				<p class="text-silver-light text-sm">Hired</p>
			</li>
		</ul>
	</td>
{/snippet}

{#snippet Section3()}
	<td class="block text-left md:table-cell md:text-right md:align-top">
		<div class="flex w-full justify-between gap-2 md:justify-end">
			<button class="btn btn-outline btn-sm flex-1 md:flex-initial">
				{getButtonText(jobPost)}
			</button>

			<div class="dropdown dropdown-left">
				<button class="btn btn-ghost btn-sm">
					<IconOptionDots />
				</button>

				<ul class="menu dropdown-content bg-base-100 z-10 w-56 gap-1 border p-2 shadow">
					<li><a href="/jobs/new">View proposals</a></li>
					<li><a href="/jobs/new">Invite freelancers</a></li>
					<li><a href="/jobs/new">View job posting</a></li>
					<li><a href="/jobs/new">Edit posting</a></li>
					<li><a href="/jobs/new">Reuse posting</a></li>
					<li><a href="/jobs/new">Archive posting</a></li>
				</ul>
			</div>
		</div>
	</td>
{/snippet}
