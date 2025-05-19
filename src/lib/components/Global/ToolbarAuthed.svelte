<script lang="ts">
	import { page } from '$app/state'
	import { patch, post } from '$lib/api'
	import IconBell from '$lib/assets/icons/IconBell.svelte'
	import IconChevronDown from '$lib/assets/icons/IconChevronDown.svelte'
	import IconHamburger from '$lib/assets/icons/IconHamburger.svelte'
	import IconLogo from '$lib/assets/icons/IconLogo.svelte'
	import IconLogout from '$lib/assets/icons/IconLogout.svelte'
	import IconSearch2 from '$lib/assets/icons/IconSearch2.svelte'
	import IconSettings from '$lib/assets/icons/IconSettings.svelte'
	import { userRole } from '$lib/stores/globalStore'

	const roleMap: any = { freelancer: 'bg-[#34A853]', client: 'bg-[#8557FF]' }

	const toggleUserRole = async (role: 'freelancer' | 'client') => {
		if ($userRole === role) return
		await patch(
			`users/me`,
			{ role },
			{ userId: page.data?.user?.userId, token: page.data?.user?.token }
		)
		await post(
			`profiles`,
			{ role },
			{ userId: page.data?.user?.userId, token: page.data?.user?.token }
		)
		location.reload()
	}
</script>

<div class="md:px-4 md:pt-4">
	<div class="navbar border-base-200 bg-base-100 mx-auto max-w-3xl border px-2 pr-5 max-md:py-4">
		<div class="navbar-start gap-4">
			<a class="btn btn-ghost text-xl" href="/dashboard"><IconLogo /> </a>
			{#if $userRole === 'client'}
				<div class="dropdown dropdown-hover">
					<div
						tabindex="0"
						role="button"
						class="hover:link text-primary flex items-center justify-center text-base whitespace-nowrap">
						Hire talent
						<IconChevronDown />
					</div>
					<ul
						class="menu dropdown-content bg-base-100 border-steel-gray z-10 w-56 gap-1 border text-base shadow-xs">
						<li>
							<a href="/jobs/new">Post a job</a>
						</li>
						<li>
							<a href="/dashboard">Dashboard</a>
						</li>
						<li>
							<a href="/search?tab=job-posts">Job post history</a>
						</li>
						<li>
							<a href="/search?tab=contracts">Contract history</a>
						</li>
					</ul>
				</div>
			{:else}
				<div class="dropdown dropdown-hover">
					<div
						tabindex="0"
						role="button"
						class="text-primary flex items-center justify-center text-base whitespace-nowrap">
						Find work
						<IconChevronDown />
					</div>
					<ul
						class="menu dropdown-content bg-base-100 border-steel-gray z-10 w-56 gap-1 border p-4 text-base shadow-xs">
						<li>
							<a href="/dashboard">Dashboard</a>
						</li>
						<li>
							<a href="/bids">Bids and offers</a>
						</li>
						<li>
							<a href="/search?tab=active-jobs">Active jobs</a>
						</li>
						<li>
							<a href="/search?tab=contracts">Contract history</a>
						</li>
					</ul>
				</div>
			{/if}
			<a href="/messages" class="hover:link ml-2 hidden md:inline" aria-label="Messages">
				Messages</a>
		</div>
		<div class="dropdown dropdown-end ml-auto md:hidden">
			<div tabindex="0" role="button" class="btn btn-ghost"><IconHamburger /></div>
			<ul class="menu dropdown-content bg-base-200 text-base-content z-10 w-40 gap-2 p-1 shadow-xs">
				<li><a href="/profile" aria-label="Profile">Profile</a></li>
				<li><a href="/messages" aria-label="Messages">Messages</a></li>
				<li><a href="/search" aria-label="Search">Search</a></li>
				<li>
					<a href="/transaction-history" aria-label="Transaction history">Transaction history</a>
				</li>
				<li><a href="/tax-forms" aria-label="Tax forms">Tax forms</a></li>
				<li><a href="/notifications" aria-label="Notifications">Notifications</a></li>
				<li>
					<a href="/settings">Settings</a>
				</li>
				<li>
					<a href="/login">Log out</a>
				</li>
			</ul>
		</div>
		<div class="navbar-end gap-4 max-md:hidden">
			<!-- <input type="text" class="input input-ghost input-bordered w-48" placeholder="Search" /> -->
			<a class="btn btn-ghost p-2" href="/search" aria-label="Search">
				<IconSearch2 className="w-6" />
			</a>

			<button class="btn btn-ghost p-2" aria-label="Notifications">
				<IconBell className="w-6" />
			</button>

			<div class="dropdown dropdown-end dropdown-bottom flex items-center">
				<div tabindex="0" role="button" class="avatar indicator h-10 w-10 cursor-pointer">
					<img alt="user avatar" referrerpolicy="no-referrer" src={page.data?.user?.user?.avatar} />
					<span
						class="badge indicator-item -left-5 text-black capitalize {roleMap[$userRole || '']}">
						{$userRole}
					</span>
					<!-- <span class="badge indicator-item bg-[#8457FE]">Client</span> -->
				</div>
				<ul
					class="menu dropdown-content bg-base-100 border-steel-gray z-10 mt-1 w-72 border px-6 py-4 pb-6 text-base shadow-xs">
					<li>
						<a href="/profile" class="flex w-full items-center justify-center">
							<div class="mx-auto flex w-fit flex-col items-center justify-center space-y-1">
								<img
									class="w-10"
									alt="user avatar"
									referrerpolicy="no-referrer"
									src={page.data?.user?.user?.avatar} />
								<span class="text-base font-medium text-white">
									{page.data?.user?.user?.displayName}
								</span>
							</div>
						</a>
					</li>
					<div
						class="join border-base-200 mx-auto mt-3 grid w-52 grid-cols-2 justify-center border">
						<input
							class="bg-client btn btn-ghost join-item border-silver-light text-silver-light hover:border-silver-light flex-1 font-normal checked:font-semibold"
							type="radio"
							name="options"
							aria-label="Client"
							checked={$userRole !== 'freelancer'}
							onchange={() => toggleUserRole('client')} />
						<input
							class="bg-freelancer btn btn-ghost join-item border-silver-light text-silver-light hover:border-silver-light flex-1 font-normal checked:font-semibold"
							type="radio"
							name="options"
							aria-label="Freelancer"
							checked={$userRole === 'freelancer'}
							onchange={() => toggleUserRole('freelancer')} />
					</div>
					<div class="mx-auto mt-4 w-52">
						<li>
							<details>
								<summary>Reports</summary>
								<ul>
									<li><a href="/transaction-history">Transaction history</a></li>
									<li><a href="/tax-forms">Tax forms</a></li>
								</ul>
							</details>
						</li>
						<li>
							<a href="/settings" class="flex items-center gap-3">
								<IconSettings />
								Settings
							</a>
						</li>
						<form action="/logout" method="POST">
							<li>
								<button class="custom-menu-item gap-3" type="submit">
									<IconLogout />
									Logout
								</button>
							</li>
						</form>
					</div>
				</ul>
			</div>
		</div>
	</div>
</div>

<style>
	.bg-freelancer:checked {
		background-color: #34a853 !important;
		border: none !important;
		outline: none !important;
		box-shadow: none !important;
		color: black !important;
	}
	.bg-freelancer:hover {
		border-color: #34a853 !important;
	}

	.bg-client:checked {
		background-color: #8557ff !important;
		border: none !important;
		outline: none !important;
		box-shadow: none !important;
		color: black !important;
	}
	.bg-client:hover {
		border-color: #8557ff !important;
	}
</style>
