<script lang="ts">
	import { enhance } from '$app/forms'
	import IconArrow from '$lib/assets/icons/IconArrow.svelte'
	import IconBreifcase from '$lib/assets/icons/IconBreifcase.svelte'
	import IconCompany from '$lib/assets/icons/IconCompany.svelte'
	import IconSocialEmail from '$lib/assets/icons/social/IconSocialEmail.svelte'
	import Alert from '$lib/components/Global/Alert.svelte'
	import Footer from '$lib/components/Global/Footer.svelte'
	import { getNumberInThousands } from '$lib/utils'
	// import Affiliate from './affiliate/affiliate.svelte'
	import Collaborate from './collaborate/collaborate.svelte'
	import Faq from './faq/faq.svelte'
	import SimpleHiring from './simple-hiring/simpleHiring.svelte'
	// import StarLines from './StarLines.svelte'
	import TalentMatching from './talent-metching/talentMatching.svelte'

	let { data } = $props()
	let waitlistWorkType = $state('')
	let showAlert: boolean | undefined = $state(undefined)
</script>

<div class="pb-10">
	<section class="mx-auto mt-20 grid max-w-6xl place-items-center px-4">
		<div class="text-center">
			<!-- <StarLines /> -->
			<h1
				class="text-4xl leading-tight font-medium text-balance text-gray-100 sm:text-5xl md:text-6xl md:leading-snug md:font-semibold">
				<span class="block">Your Gateway to</span>
				<span class="text-primary block italic">Global Work</span>
			</h1>
			<p
				class="mx-auto mt-3 max-w-md text-balance text-white/60 sm:text-lg md:mt-16 md:max-w-3xl md:text-xl"
				style="content-visibility: auto; contain-intrinsic-size: auto 5rem;"
				id="lcp-element">
				Hire top remote talent at the lowest fees. Our simple 4% job-completion fee makes it easy to
				find the perfect fit for your project.
			</p>
		</div>

		<form
			action="?/create-waitlist-user"
			method="post"
			use:enhance={({ formData }) => {
				return ({ result }) => {
					if (result.type === 'success') {
						showAlert = !!result.data?.success
					}
				}
			}}
			class="bg-cod-gray mx-auto mt-10 w-full max-w-4xl items-center px-4 py-3 max-md:max-w-sm md:mt-14 md:flex">
			<div class="flex items-center gap-2">
				<label for="work-type-select" class="sr-only">Select your role</label>
				<select
					id="work-type-select"
					name="workType"
					class="select bg-cod-gray max-w-xs border-none font-sans text-white focus:outline-hidden md:text-base"
					required
					bind:value={waitlistWorkType}>
					<option value="" disabled selected>Select role</option>
					<option value="1">Freelancer</option>
					<option value="2">Client</option>
					<option value="3">Both</option>
				</select>

				<div class="bg-alto h-12 w-px"></div>

				<label
					class="input input-bordered border-alto focus:border-alto ml-2 flex h-fit min-h-0 w-full items-center gap-2 px-3 py-1.5 text-white">
					<IconSocialEmail />
					<input
						required
						name="email"
						type="email"
						class="grow pl-1 font-sans text-[13px] text-white placeholder:text-white md:text-base"
						placeholder="Email" />
				</label>
			</div>

			<div class="max-md:mt-4">
				<button
					class="btn btn-primary h-fit min-h-0 w-full border-none py-2.5 font-medium md:mr-auto md:ml-4 md:py-2 md:text-base">
					Join Waitlist
					<span class="text-cod-gray">
						<IconArrow />
					</span>
				</button>
			</div>

			{#await data.lazy?.waitlistCount then value}
				<div
					class="flex items-center justify-center gap-4 font-sans text-xs max-md:mt-4 md:ml-auto md:text-sm">
					<div class="flex items-center gap-2">
						<IconCompany />
						<span>
							<span class="text-primary font-semibold">
								{getNumberInThousands(value?.clientCount) || 'Error'}
							</span>
							Clients
						</span>
					</div>
					<div class="bg-alto h-6 w-px"></div>
					<div class="flex items-center gap-2">
						<IconBreifcase />
						<span>
							<span class="text-primary font-semibold">
								{getNumberInThousands(value?.freelancerCount) || 'Error'}
							</span>
							Freelanceers
						</span>
					</div>
				</div>
			{:catch error}
				<p>Error loading waitlist count: {JSON.stringify(error)}</p>
			{/await}
		</form>
		<div class="mt-5">
			<Alert bind:showAlert />
		</div>
	</section>
</div>

<Collaborate />

<TalentMatching />

<!-- <Affiliate /> -->

<SimpleHiring />

<Faq />

<Footer />
