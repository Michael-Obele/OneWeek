<script lang="ts">
	import IconSocialGoogle from '$lib/assets/icons/social/IconSocialGoogle.svelte'
	import IconSocialGitHubInverse from '$lib/assets/icons/social/IconSocialGitHubInverse.svelte'
	import { env } from '$env/dynamic/public'
	import { getHref } from '$lib/utils'
	import IconSocialApple from '$lib/assets/icons/social/IconSocialApple.svelte'
	import IconSocialLinkedIn from '$lib/assets/icons/social/IconSocialLinkedIn.svelte'
</script>

<div class="bg-base-100 relative w-full max-w-md">
	<div class="space-y-5 px-4 py-4 md:px-10">
		<h2 class="text-3xl">Log in to your account</h2>
		{#if env.PUBLIC_CROSS_ORIGIN === 'false'}
			<a
				class="btn btn-outline w-full gap-4"
				href="{env.PUBLIC_API_URL}/auth/linkedin"
				aria-label="Log in with LinkedIn">
				<IconSocialLinkedIn />
				Log in with LinkedIn</a>
			<a
				class="btn btn-outline w-full gap-4"
				href="{env.PUBLIC_API_URL}/auth/github"
				aria-label="Log in with GitHub">
				<IconSocialGitHubInverse />
				Log in with GitHub</a>
			<div class="flex w-full gap-2">
				<a
					class="btn btn-outline flex-1"
					href="{env.PUBLIC_API_URL}/auth/google"
					aria-label="Log in with Google">
					<IconSocialGoogle />
				</a>
				<a
					class="btn btn-outline flex-1"
					href="{env.PUBLIC_API_URL}/auth/apple"
					aria-label="Log in with Apple">
					<IconSocialApple />
				</a>
			</div>
		{:else}
			<button
				class="btn btn-outline w-full gap-4"
				onclick={async () =>
					await getHref({
						provider: 'linkedin',
						apiUrl: env.PUBLIC_API_URL,
						xApiKey: env.PUBLIC_X_API_KEY
					})}>
				<IconSocialLinkedIn />
				Log in with LinkedIn</button>
			<button
				class="btn btn-outline w-full gap-4"
				onclick={async () =>
					await getHref({
						provider: 'github',
						apiUrl: env.PUBLIC_API_URL,
						xApiKey: env.PUBLIC_X_API_KEY
					})}>
				<IconSocialGitHubInverse />
				Log in with GitHub</button>
			<div class="flex w-full gap-2">
				<button
					class="btn btn-outline flex-1"
					onclick={async () =>
						await getHref({
							provider: 'google',
							apiUrl: env.PUBLIC_API_URL,
							xApiKey: env.PUBLIC_X_API_KEY
						})}>
					<IconSocialGoogle />
				</button>
				<button
					class="btn btn-outline flex-1"
					onclick={async () =>
						await getHref({
							provider: 'apple',
							apiUrl: env.PUBLIC_API_URL,
							xApiKey: env.PUBLIC_X_API_KEY
						})}>
					<IconSocialApple />
				</button>
			</div>
		{/if}
		<p>
			By using our platform, you confirm that you are atleast 18 years old and agree to
			<a class="link link-warning" href="https://codecrow.io/legal" target="_blank"
				>all of our policies
			</a>
		</p>
	</div>
</div>
