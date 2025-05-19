<script module lang="ts">
	import ItemFreelancer from '$lib/components/Search/ItemFreelancer.svelte'
	export { FreelancersTable }
</script>

{#snippet FreelancersTable(freelancers: any[])}
	<div class="min-h-[50vh] w-full overflow-x-auto">
		<table class="table w-full table-auto">
			<thead class="hidden">
				<tr>
					<th class="w-full md:w-3/5">Freelancer</th>
					<th class="hidden md:table-cell md:w-1/5">Skills</th>
					<th class="hidden md:table-cell md:w-1/5">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each freelancers as freelancer}
					<ItemFreelancer {freelancer} />
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}
