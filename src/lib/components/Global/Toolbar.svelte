<script>
	import { page } from '$app/state'
	import { env } from '$env/dynamic/public'
	import IconHamburger from '$lib/assets/icons/IconHamburger.svelte'
	import IconLogo from '$lib/assets/icons/IconLogo.svelte'
	import IconSearch2 from '$lib/assets/icons/IconSearch2.svelte'
</script>

<div class="md:px-4 md:pt-4">
	<div class="navbar border-cod-gray bg-base-100 mx-auto max-w-3xl border px-2 pr-5">
		<div class="navbar-start">
			<a class="btn btn-ghost text-xl" href={page.data.user?.userId ? '/dashboard' : '/landing'}
				><IconLogo /> <span class="font-medium">OneWeek</span>
			</a>
		</div>

		<div class="dropdown dropdown-end ml-auto md:hidden">
			<div tabindex="0" role="button" class="btn btn-ghost" aria-label="Toggle menu">
				<IconHamburger />
			</div>
			<ul class="menu dropdown-content bg-base-200 text-base-content z-1 w-40 gap-2 p-1 shadow-xs">
				<li><a href="/login" aria-label="Hire Talent" class="hover:link">Hire Talent</a></li>
				<li><a href="/login" aria-label="Find Work" class="hover:link">Find Work</a></li>
				<li><a href="/landing#faq-section" aria-label="FAQ" class="hover:link">FAQ</a></li>
				<li>
					<a href="/login" aria-label="Log in" class="hover:link"
						>{env.PUBLIC_FEATURE_WAITLIST === 'true' ? 'Coming soon' : 'Log in'}</a>
				</li>
			</ul>
		</div>

		<ul class="navbar-center hidden gap-12 md:flex">
			<li class="text-primary">
				<a href="/login" aria-label="Hire Talent" class="hover:link"> Hire Talent</a>
			</li>
			<li><a href="/login" aria-label="Find Work" class="hover:link"> Find Work</a></li>
			<li><a href="/landing#faq-section" aria-label="FAQ" class="hover:link"> FAQ</a></li>
		</ul>

		<div class="navbar-end max-md:hidden">
			{#if page.data.user?.userId}
				<div class="flex-none gap-2">
					{#if page.url.pathname != '/landing'}
						<div class="form-control">
							<label class="input input-bordered flex items-center gap-2">
								<input type="text" placeholder="Search" class="w-24 md:w-auto" />
								<IconSearch2 />
							</label>
						</div>
					{/if}
					<div class="dropdown dropdown-end">
						<div tabindex="0" role="button" class="avatar btn btn-square btn-ghost">
							<div class="w-10">
								<img alt="user avatar" src={page.data.user.user?.avatar} />
							</div>
						</div>
						<ul
							class="menu dropdown-content menu-sm rounded-box border-base-200 bg-base-100 z-1 mt-3 w-52 border p-2 shadow-xs">
							<li><a href="/settings">Settings</a></li>
							<li><a href="https://codecrow.io/legal" target="_blank">Legal</a></li>
							<form action="/logout" method="POST">
								<li>
									<button class="custom-menu-item" type="submit"> Logout </button>
								</li>
							</form>
						</ul>
					</div>
				</div>
			{:else}
				<a class="btn btn-primary h-fit min-h-0 py-2" href="/login"
					>{env.PUBLIC_FEATURE_WAITLIST === 'true' ? 'Coming soon' : 'Log in'}</a>
			{/if}
		</div>
	</div>
</div>
