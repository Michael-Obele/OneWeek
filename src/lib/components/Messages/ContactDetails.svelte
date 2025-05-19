<script lang="ts">
	import IconView from '$lib/assets/icons/IconView.svelte'
	import IconGroup from '$lib/assets/icons/IconGroup.svelte'
	import IconAttachments from '$lib/assets/icons/IconAttachments.svelte'
	import { page } from '$app/state'

	let { contact, chatUsers } = $props()

	// Format time with timezone offset
	const formatTime = () => {
		// Get current time in UTC
		const now = new Date()
		const utcHours = now.getUTCHours()
		const minutes = now.getMinutes()

		// Calculate contact's current time based on their timezone
		const contactHours = (utcHours + (contact.timezone || 0)) % 24
		const period = contactHours >= 12 ? 'PM' : 'AM'
		const hours = contactHours % 12 || 12
		const timeString = `${hours}:${minutes.toString().padStart(2, '0')}${period}`

		// Calculate time difference between contact and user timezones
		const userTimezone = page.data.user.user.timezone || 0
		const timeDiff = (contact.timezone || 0) - userTimezone

		// Get timezone abbreviation from the contact's timezone using their locale
		const date = new Date()
		const locale = contact.locale || contact.timezone_name?.split('/')[0].toLowerCase() || 'en-US'
		const tzAbbr =
			new Intl.DateTimeFormat(locale, {
				timeZone: contact.timezone_name || 'UTC',
				timeZoneName: 'short'
			})
				.formatToParts(date)
				.find((part) => part.type === 'timeZoneName')?.value || 'UTC'

		return `${timeString} ${tzAbbr} (${Math.abs(timeDiff)} h ${timeDiff < 0 ? 'behind' : 'ahead'})`
	}
</script>

<div class="min-h-full bg-base-200 p-4">
	<div class="flex flex-col items-center">
		<div class="avatar">
			<div class="w-16">
				<img src={contact.avatar} alt={contact.displayName} />
			</div>
		</div>
		<h2 class="mt-3 text-lg font-medium">{contact.displayName}</h2>
		<!-- <p class="text-sm opacity-70">{contact.professionalTitle}</p> -->
		<p class="mt-1 text-sm opacity-70">{formatTime()}</p>

		<div class="mt-4 w-full space-y-2">
			<button class="btn btn-ghost btn-sm flex w-full items-center gap-2 text-primary">
				<IconView />
				View Contract
			</button>
		</div>

		<div class="mt-5 flex w-full flex-1 flex-col gap-4 overflow-y-auto">
			<div class="collapse collapse-arrow bg-base-100">
				<input type="checkbox" />
				<div class="collapse-title flex gap-3 font-medium">
					<IconGroup />
					People
				</div>
				<div class="collapse-content">
					{#if chatUsers && chatUsers.length > 0}
						<ul class="space-y-2">
							{#each chatUsers as user}
								<li class="flex items-center gap-2">
									{#if user.avatar}
										<img src={user.avatar} alt={user.name} class="h-6 w-6 rounded-full" />
									{:else}
										<div class="h-6 w-6 rounded-full bg-primary text-center text-xs leading-6 text-primary-content">
											{user.name[0]}
										</div>
									{/if}
									<span>{user.name}</span>
								</li>
							{/each}
						</ul>
					{:else}
						<p>No users in this chat</p>
					{/if}
				</div>
			</div>
			<div class="collapse collapse-arrow bg-base-100">
				<input type="checkbox" />
				<div class="collapse-title flex gap-3 font-medium">
					<IconAttachments />Files and Links
				</div>
				<div class="collapse-content">
					<p>No files or links shared yet</p>
				</div>
			</div>
		</div>
	</div>
</div>
