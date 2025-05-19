<script lang="ts">
	import { page } from '$app/state'
	import IconProfile from '$lib/assets/icons/IconProfile.svelte'
	import IconSettings from '$lib/assets/icons/IconSettings.svelte'
	import IconPayment from '$lib/assets/icons/IconPayment.svelte'
	import IconRightChevron from '$lib/assets/icons/IconRightChevron.svelte'
	import { fade } from 'svelte/transition'

	// User data from page store
	const user = $state(page.data?.user?.user)

	// Active tab state
	const MY_INFO = 'my-info'
	const ACCOUNT = 'account'
	const PAYMENT = 'payment'
	type TabType = typeof MY_INFO | typeof ACCOUNT | typeof PAYMENT
	let activeTab = $state<TabType>(MY_INFO)

	// Function to safely set the active tab
	function setActiveTab(tab: TabType): void {
		activeTab = tab
	}

	// Form data
	const formData = $state({
		firstName: user?.firstName || user?.displayName?.split(' ')[0] || '',
		lastName: user?.lastName || user?.displayName?.split(' ')[1] || '',
		email: user?.email || '',
		phone: user?.phone || '',
		address: user?.address || '',
		city: user?.city || '',
		state: user?.state || '',
		zip: user?.zip || '',
		country: user?.country || 'United States',
		bio: user?.bio || '',
		skills: user?.skills || []
	})

	// Form submission state
	let isSubmitting = $state(false)
	let formSuccess = $state(false)
	let formError = $state('')

	// Handle form submission
	async function handleSubmit() {
		try {
			isSubmitting = true
			formError = ''

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000))

			// Implementation for form submission would go here
			console.log('Form submitted:', formData)

			formSuccess = true
			setTimeout(() => (formSuccess = false), 3000)
		} catch (error: unknown) {
			formError =
				error instanceof Error ? error.message : 'An error occurred while saving your changes'
		} finally {
			isSubmitting = false
		}
	}
</script>

<div class="bg-base-100 min-h-screen">
	<div class="mx-auto max-w-7xl px-4 py-8">
		<!-- Page Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold">Settings</h1>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-4">
			<!-- Left Sidebar - Navigation -->
			<div class="col-span-1">
				<div class="bg-base-100 border-base-300 overflow-hidden rounded-lg border">
					<ul class="menu w-full p-2">
						<li>
							<button
								class={`flex items-center gap-3 py-3 ${activeTab === MY_INFO ? 'bg-primary/10 text-primary font-medium' : ''}`}
								onclick={() => setActiveTab(MY_INFO)}>
								<IconProfile />
								<span>My Info</span>
								{#if activeTab === MY_INFO}
									<IconRightChevron customClass="ml-auto" />
								{/if}
							</button>
						</li>
						<li>
							<button
								class={`flex items-center gap-3 py-3 ${activeTab === ACCOUNT ? 'bg-primary/10 text-primary font-medium' : ''}`}
								onclick={() => setActiveTab(ACCOUNT)}>
								<IconSettings />
								<span>Account</span>
								{#if activeTab === ACCOUNT}
									<IconRightChevron customClass="ml-auto" />
								{/if}
							</button>
						</li>
						<li>
							<button
								class={`flex items-center gap-3 py-3 ${activeTab === PAYMENT ? 'bg-primary/10 text-primary font-medium' : ''}`}
								onclick={() => setActiveTab(PAYMENT)}>
								<IconPayment />
								<span>Payment</span>
								{#if activeTab === PAYMENT}
									<IconRightChevron customClass="ml-auto" />
								{/if}
							</button>
						</li>
					</ul>
				</div>
			</div>

			<!-- Right Content Area -->
			<div class="col-span-1 md:col-span-3">
				<!-- My Info Tab -->
				{#if activeTab === MY_INFO}
					<div class="bg-base-100 border-base-300 rounded-lg border p-6">
						<h2 class="mb-6 text-xl font-semibold">Personal Information</h2>

						<form
							onsubmit={(e) => {
								e.preventDefault()
								handleSubmit()
							}}
							class="space-y-6">
							{#if formSuccess}
								<div class="alert alert-success" transition:fade>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6 shrink-0 stroke-current"
										fill="none"
										viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
									<span>Your changes have been saved successfully!</span>
								</div>
							{/if}

							{#if formError}
								<div class="alert alert-error" transition:fade>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6 shrink-0 stroke-current"
										fill="none"
										viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
									<span>{formError}</span>
								</div>
							{/if}
							<!-- Profile Picture -->
							<div class="mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
								<div class="avatar">
									<div class="h-24 w-24 rounded-full">
										<img src={user?.avatar || 'https://placehold.co/100x100'} alt="Profile" />
									</div>
								</div>
								<div class="flex flex-col gap-2">
									<h3 class="text-lg font-medium">{user?.displayName || 'Your Name'}</h3>
									<div class="flex gap-2">
										<button class="btn btn-sm btn-primary">Upload New Photo</button>
										<button class="btn btn-sm btn-outline">Remove</button>
									</div>
								</div>
							</div>

							<!-- Name Fields -->
							<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
								<div class="form-control w-full">
									<label for="first-name" class="label">
										<span class="label-text font-medium">First Name</span>
									</label>
									<input
										id="first-name"
										type="text"
										class="input input-bordered w-full"
										bind:value={formData.firstName}
										placeholder="Enter your first name" />
								</div>

								<div class="form-control w-full">
									<label for="last-name" class="label">
										<span class="label-text font-medium">Last Name</span>
									</label>
									<input
										id="last-name"
										type="text"
										class="input input-bordered w-full"
										bind:value={formData.lastName}
										placeholder="Enter your last name" />
								</div>
							</div>

							<!-- Contact Information -->
							<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
								<div class="form-control w-full">
									<label for="email" class="label">
										<span class="label-text font-medium">Email</span>
									</label>
									<input
										id="email"
										type="email"
										class="input input-bordered w-full"
										bind:value={formData.email}
										placeholder="your.email@example.com"
										disabled />
									<label for="email" class="label">
										<span class="label-text-alt text-base-content/70">Email cannot be changed</span>
									</label>
								</div>

								<div class="form-control w-full">
									<label for="phone" class="label">
										<span class="label-text font-medium">Phone Number</span>
									</label>
									<input
										id="phone"
										type="tel"
										class="input input-bordered w-full"
										bind:value={formData.phone}
										placeholder="(123) 456-7890" />
								</div>
							</div>

							<!-- Bio -->
							<div class="form-control w-full">
								<label for="bio" class="label">
									<span class="label-text font-medium">Bio</span>
								</label>
								<textarea
									id="bio"
									class="textarea textarea-bordered h-24"
									bind:value={formData.bio}
									placeholder="Tell us about yourself...">
								</textarea>
							</div>

							<!-- Save Button -->
							<div class="mt-6 flex justify-end">
								<button type="submit" class="btn btn-primary" disabled={isSubmitting}>
									{#if isSubmitting}
										<span class="loading loading-spinner loading-xs"></span>
										Saving...
									{:else}
										Save Changes
									{/if}
								</button>
							</div>
						</form>
					</div>
				{:else if activeTab === ACCOUNT}
					<div class="bg-base-100 border-base-300 rounded-lg border p-6">
						<h2 class="mb-6 text-xl font-semibold">Account Settings</h2>

						<!-- Account Settings Content -->
						<div class="space-y-6">
							<!-- Password Change -->
							<div class="border-base-300 border-b pb-6">
								<h3 class="mb-4 text-lg font-medium">Password</h3>
								<div class="form-control w-full max-w-md">
									<label for="current-password" class="label">
										<span class="label-text">Current Password</span>
									</label>
									<input
										id="current-password"
										type="password"
										class="input input-bordered w-full"
										placeholder="••••••••" />
								</div>
								<div class="form-control mt-3 w-full max-w-md">
									<label for="new-password" class="label">
										<span class="label-text">New Password</span>
									</label>
									<input
										id="new-password"
										type="password"
										class="input input-bordered w-full"
										placeholder="••••••••" />
								</div>
								<div class="form-control mt-3 w-full max-w-md">
									<label for="confirm-password" class="label">
										<span class="label-text">Confirm New Password</span>
									</label>
									<input
										id="confirm-password"
										type="password"
										class="input input-bordered w-full"
										placeholder="••••••••" />
								</div>
								<button class="btn btn-primary mt-4"> Update Password </button>
							</div>

							<!-- Notifications -->
							<div class="border-base-300 border-b pb-6">
								<h3 class="mb-4 text-lg font-medium">Notifications</h3>
								<div class="space-y-3">
									<div class="flex items-center justify-between">
										<span>Email Notifications</span>
										<input
											id="email-notifications"
											type="checkbox"
											class="toggle toggle-primary"
											checked />
									</div>
									<div class="flex items-center justify-between">
										<span>SMS Notifications</span>
										<input id="sms-notifications" type="checkbox" class="toggle toggle-primary" />
									</div>
									<div class="flex items-center justify-between">
										<span>Marketing Emails</span>
										<input id="marketing-emails" type="checkbox" class="toggle toggle-primary" />
									</div>
								</div>
							</div>

							<!-- Delete Account -->
							<div>
								<h3 class="mb-4 text-lg font-medium">Delete Account</h3>
								<p class="text-base-content/70 mb-4">
									Once you delete your account, there is no going back. Please be certain.
								</p>
								<button class="btn btn-error">Delete Account</button>
							</div>
						</div>
					</div>
				{:else if activeTab === PAYMENT}
					<div class="bg-base-100 border-base-300 rounded-lg border p-6">
						<h2 class="mb-6 text-xl font-semibold">Payment Methods</h2>

						<!-- Payment Methods Content -->
						<div class="space-y-6">
							<!-- Saved Payment Methods -->
							<div class="border-base-300 border-b pb-6">
								<h3 class="mb-4 text-lg font-medium">Saved Payment Methods</h3>

								<!-- Card 1 -->
								<div
									class="border-base-300 mb-3 flex items-center justify-between rounded-lg border p-4">
									<div class="flex items-center gap-4">
										<div class="bg-primary/10 rounded-full p-3">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="text-primary h-6 w-6"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
											</svg>
										</div>
										<div>
											<p class="font-medium">Visa ending in 4242</p>
											<p class="text-base-content/70 text-sm">Expires 12/2025</p>
										</div>
									</div>
									<div class="flex gap-2">
										<span class="badge badge-primary">Default</span>
										<button class="btn btn-sm btn-ghost">Remove</button>
									</div>
								</div>

								<!-- Card 2 -->
								<div
									class="border-base-300 flex items-center justify-between rounded-lg border p-4">
									<div class="flex items-center gap-4">
										<div class="bg-primary/10 rounded-full p-3">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="text-primary h-6 w-6"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
											</svg>
										</div>
										<div>
											<p class="font-medium">Mastercard ending in 5555</p>
											<p class="text-base-content/70 text-sm">Expires 08/2024</p>
										</div>
									</div>
									<div class="flex gap-2">
										<button class="btn btn-sm btn-outline">Make Default</button>
										<button class="btn btn-sm btn-ghost">Remove</button>
									</div>
								</div>
							</div>

							<!-- Add New Payment Method -->
							<div>
								<h3 class="mb-4 text-lg font-medium">Add New Payment Method</h3>
								<form class="space-y-4">
									<div class="form-control w-full">
										<label for="card-name" class="label">
											<span class="label-text">Name on Card</span>
										</label>
										<input
											id="card-name"
											type="text"
											class="input input-bordered w-full"
											placeholder="John Doe" />
									</div>

									<div class="form-control w-full">
										<label for="card-number" class="label">
											<span class="label-text">Card Number</span>
										</label>
										<input
											id="card-number"
											type="text"
											class="input input-bordered w-full"
											placeholder="1234 5678 9012 3456" />
									</div>

									<div class="grid grid-cols-2 gap-4">
										<div class="form-control w-full">
											<label for="expiry-date" class="label">
												<span class="label-text">Expiry Date</span>
											</label>
											<input
												id="expiry-date"
												type="text"
												class="input input-bordered w-full"
												placeholder="MM/YY" />
										</div>

										<div class="form-control w-full">
											<label for="cvv" class="label">
												<span class="label-text">CVV</span>
											</label>
											<input
												id="cvv"
												type="text"
												class="input input-bordered w-full"
												placeholder="123" />
										</div>
									</div>

									<div class="mt-2 flex items-center gap-2">
										<input id="save-card" type="checkbox" class="checkbox checkbox-primary" />
										<label for="save-card" class="cursor-pointer"
											>Save as default payment method</label>
									</div>

									<div class="mt-4">
										<button type="submit" class="btn btn-primary"> Add Payment Method </button>
									</div>
								</form>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
