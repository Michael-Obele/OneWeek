<script lang="ts">
	import IconStar from '$lib/assets/icons/IconStar.svelte'
	import TagCategory from '$lib/components/Global/TagCategory.svelte'
	import { totalEarnedToGeneral } from '$lib/utils'
	let { freelancer } = $props()
</script>

<tr class="hover:bg-base-300 block md:table-row">
	<!-- Section 1: Avatar, Name, Title, Bio, Skills -->
	{@render Section1()}
	<!-- Section 2: Stats (Rating, Success, Earnings, Location) -->
	<!-- {@render Section2()} -->
	<!-- Section 3: Actions -->
	{@render Section3()}
</tr>

{#snippet Section1()}
	<td class="block md:table-cell">
		<div class="flex items-start gap-4">
			<div class="avatar w-12">
				<img src={freelancer.avatar} alt={freelancer.displayName} referrerpolicy="no-referrer" />
			</div>
			<div>
				<h3 class="text-xl font-bold">{freelancer.displayName || 'Unnamed Freelancer'}</h3>
				<p class="text-lg font-semibold">
					{freelancer.profileTitle || 'No profile title'}
				</p>
				<p class="text-silver-light text-sm">{freelancer.location || 'Remote'}</p>
			</div>
		</div>
		<div class="text-silver mt-3 grid grid-cols-[2fr_3fr] text-sm whitespace-nowrap">
			<div class="tooltip tooltip-top flex w-fit items-center gap-2" data-tip="Total Earned">
				{totalEarnedToGeneral(freelancer.totalEarnings)} Earned
			</div>
			<div class="tooltip tooltip-top flex w-fit items-center gap-2" data-tip="Job Success">
				<IconStar class="text-silver" />
				{freelancer.jobSuccessScore ? `${freelancer.jobSuccessScore}% Job Success` : 'New'}
			</div>
		</div>
		<div class="mt-3 flex flex-wrap gap-2">
			{#if freelancer.categories && freelancer.categories.length > 0}
				{#each freelancer.categories.slice(0, 3) as category}
					<TagCategory category={category.subcategoryName} />
				{/each}
				{#if freelancer.categories.length > 3}
					<TagCategory category={`${freelancer.categories.length - 3} more`} />
				{/if}
			{:else}
				<TagCategory category="No categories" />
			{/if}
		</div>
		<p class="mt-2 line-clamp-2 max-w-md overflow-hidden break-words">
			{freelancer.profileBio || 'No profile bio'}
		</p>
	</td>
{/snippet}

<!-- {#snippet Section2()}
	<td class="block align-top md:table-cell"> -->
<!-- <ul class="flex flex-wrap gap-x-4 gap-y-1 md:flex-col">
			<li>
				<div class="flex items-center gap-1">
					<span class="font-semibold"
						>{freelancer.jobSuccessScore ? `${freelancer.jobSuccessScore}%` : 'New'}</span>
					<p class="text-silver-light text-sm">Job Success</p>
				</div>
			</li>
			<li>
				<p class="font-semibold">{freelancer.location || 'Remote'}</p>
				<p class="text-silver-light text-sm">Location</p>
			</li> -->
<!-- Add Rating display if available in data -->
<!--
			<li>
				<div class="flex items-center gap-1">
					<div class="flex">
						{#each Array(5) as _, i}
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4 text-yellow-400">
								<path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
							</svg>
						{/each}
					</div>
					<p class="text-silver-light text-sm">(Rating Value)</p> 
				</div>
			</li>
			-->
<!-- </ul> -->
<!-- </td>
{/snippet} -->

{#snippet Section3()}
	<td class="block text-left md:table-cell md:text-right md:align-top">
		<div class="flex w-full justify-between gap-2 md:justify-end">
			<a href="/profile/{freelancer._id}" class="btn btn-outline btn-sm w-1/2 md:w-auto"
				>View profile</a>
			<a
				href="/contracts/new?freelancer={freelancer._id}"
				class="btn btn-primary btn-sm w-1/2 md:w-auto">Invite to job</a>
		</div>
	</td>
{/snippet}
