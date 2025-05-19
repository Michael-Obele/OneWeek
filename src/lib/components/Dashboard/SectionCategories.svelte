<script lang="ts">
	import OptimizedImage from '$lib/components/Global/OptimizedImage.svelte'

	const categories = [
		{
			title: 'Developer',
			image: '/images/dashboard/developer.png',
			link: '/search?category=Web%2C+Mobile+%26+Software+Dev'
		},
		{
			title: 'Designer',
			image: '/images/dashboard/designer.png',
			link: '/search?category=Design+%26+Creative'
		},
		{
			title: 'Video Editor',
			image: '/images/dashboard/videoeditor.png',
			link: '/search?category=Design+%26+Creative'
		},
		{
			title: 'Digital Marketer',
			image: '/images/dashboard/marketing.png',
			link: '/search?category=Sales+%26+Marketing'
		},
		{
			title: 'Writer',
			image: '/images/dashboard/writer.png',
			link: '/search?category=Writing'
		}
	]
</script>

<div class="border-mine-shaft py-10">
	<div class="text-xl font-semibold tracking-wide">Different Categories</div>

	<div class="mt-6 w-full overflow-x-auto pb-10">
		<div class="flex w-fit items-center gap-4 text-center text-xs md:text-base">
			{#each categories as category}
				<a
					href={category.link}
					role="button"
					class="bg-midnight flex h-32 w-32 cursor-pointer flex-col items-center justify-center md:h-40 md:w-40">
					<OptimizedImage
						src={category.image}
						alt={category.title}
						width={80}
						height={80}
						className="w-20" />
					<h4 class="mt-3 tracking-wide">{category.title}</h4>
				</a>
			{/each}
		</div>
	</div>
</div>
