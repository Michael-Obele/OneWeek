<script lang="ts">
	import { get } from '$lib/api'
	import type { ChatMessage } from '$lib/services/WebSocketService'
	import { addEventListener, removeEventListener, sendMessage } from '$lib/stores/websocketStore'
	import ItemMessage from '$lib/components/Messages/ItemMessage.svelte'
	import IconSend from '$lib/assets/icons/IconSend.svelte'
	import IconAttach from '$lib/assets/icons/IconAttach.svelte'
	import IconSearch2 from '$lib/assets/icons/IconSearch2.svelte'
	import ItemChat from '$lib/components/Messages/ItemChat.svelte'
	import ContactDetails from '$lib/components/Messages/ContactDetails.svelte'
	import IconVideo from '$lib/assets/icons/IconVideo.svelte'
	import { page } from '$app/state'

	let { data } = $props()
	let messageText = $state('')
	let messages = $state<ChatMessage[]>([])
	let textarea = $state<HTMLTextAreaElement | null>(null)
	let scrollContainer = $state<HTMLDivElement | null>(null)
	let selectedChatId: number = $state(0)
	let hasMore = $state(true)
	let loadingMore = $state(false)
	let chatUsers = $state([])

	// Placeholder contact data
	var contact = {
		name: 'Zeeshan Jabbar',
		jobTitle: 'UI/UX Designer for Website and Mobile App',
		avatar: '/avatars/default.png',
		timezone: 'UTC+05:30'
	}

	function adjustTextareaHeight() {
		if (textarea) {
			textarea.style.height = 'auto'
			textarea.style.height = Math.min(textarea.scrollHeight, window.innerHeight * 0.5) + 'px'
		}
	}

	// Event handlers
	const handleNewMessage = (event: { message: ChatMessage }) => {
		messages = [event.message, ...messages]
		scrollToBottom()
	}

	const handleMessageDeleted = (event: { messageId: number }) => {
		messages = messages.filter((msg) => msg._id !== event.messageId)
	}

	const handleMessagesLoaded = (event: { messages: ChatMessage[]; hasMore: boolean }) => {
		loadingMore = false
		hasMore = event.hasMore
		messages = [...event.messages, ...messages]
	}

	const handleError = (event: { error: string }) => {
		console.error('WebSocket error:', event.error)
		messages = messages.map((m) => (m.status === 'pending' ? { ...m, status: 'failed' } : m))
	}

	$effect(() => {
		// Add event listeners
		addEventListener('new_message', handleNewMessage)
		addEventListener('message_deleted', handleMessageDeleted)
		addEventListener('messages_loaded', handleMessagesLoaded)
		addEventListener('error', handleError)

		return () => {
			// Clean up event listeners
			removeEventListener('new_message', handleNewMessage)
			removeEventListener('message_deleted', handleMessageDeleted)
			removeEventListener('messages_loaded', handleMessagesLoaded)
			removeEventListener('error', handleError)
		}
	})

	function handleSendMessage() {
		if (!messageText.trim()) return

		// Create optimistic message
		const tempMessage: ChatMessage = {
			message: messageText,
			createdAt: new Date().toISOString(),
			status: 'pending',
			optimisticId: Date.now().toString(),
			userId: page.data.user.user._id,
			displayName: page.data.user.user.displayName,
			avatar: page.data.user.user.avatar || '/avatars/default.png',
			isDeleted: false
		}

		messages = [...messages, tempMessage]
		scrollToBottom()

		// Send message through WebSocket
		sendMessage('send_message', { message: messageText })
		messageText = ''
		adjustTextareaHeight()
	}

	function isDifferentDay(currentMsg: any, previousMsg: any) {
		if (!previousMsg) return true
		const current = new Date(currentMsg.createdAt).setHours(0, 0, 0, 0)
		const previous = new Date(previousMsg.createdAt).setHours(0, 0, 0, 0)
		return current !== previous
	}

	// Function to load more messages
	async function loadMoreMessages() {
		if (!hasMore || loadingMore) return

		loadingMore = true
		const oldestMessage = messages[0]
		if (oldestMessage?._id) {
			sendMessage('load_messages', { beforeMessageId: oldestMessage._id })
		}
	}

	// Scroll handler for infinite scrolling
	function handleScroll(event: Event) {
		const target = event.target as HTMLDivElement
		// When user scrolls near the top (100px threshold), load more messages
		if (target.scrollTop < 100 && !loadingMore && hasMore) {
			loadMoreMessages()
		}
	}

	// Function to scroll to bottom
	function scrollToBottom() {
		if (scrollContainer) {
			scrollContainer.scrollTop = scrollContainer.scrollHeight
		}
	}

	// Auto scroll to bottom when new messages are added
	$effect(() => {
		if (messages.length > 0 && scrollContainer) {
			// Only auto-scroll if we're already near the bottom
			const isNearBottom =
				scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight <
				100
			if (isNearBottom) {
				scrollToBottom()
			}
		}
	})

	// Function to fetch chat users
	async function fetchChatUsers() {
		chatUsers = await get(`chats/users`, {
			userId: page.data?.user?.userId,
			token: page.data?.user?.token
		})
		//TODO: get files and links
	}

	// Watch for chat selection changes
	$effect(() => {
		if (selectedChatId) {
			// Clear existing messages
			messages = []
			hasMore = true
			// Load messages for the selected chat
			sendMessage('load_messages', {})

			// Fetch chat users
			fetchChatUsers().catch((error) => {
				console.error('Error fetching chat users:', error)
			})
		}
	})

	function handleDeleteMessage(messageId: number) {
		sendMessage('message_deleted', { messageId })
		// Optimistically update the message as deleted
		messages = messages.map((m) => (m._id === messageId ? { ...m, isDeleted: true } : m))
	}
</script>

<div class="container mx-auto max-w-7xl">
	{#await data.lazy?.chats}
		<div>Retrieving messages...</div>
	{:then value}
		<div class="drawer lg:drawer-open h-[calc(100vh-85px)]">
			<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />

			<!-- Main Content -->
			<div class="drawer-content bg-base-100 flex h-full flex-col">
				<!-- Mobile drawer button -->
				<div class="lg:hidden">
					<label for="my-drawer-2" class="btn btn-primary drawer-button m-4">See Chats</label>
				</div>

				<div class="flex flex-1 overflow-hidden">
					<!-- Chat Section -->
					<div class="flex min-w-0 flex-1 flex-col">
						<!-- Chat Header -->
						{#if contact}
							<div class="bg-base-100 p-4">
								<div class="flex items-center justify-between gap-3">
									<div>
										<h2 class="font-semibold">{contact.name}</h2>
										<p class="text-sm opacity-70">{contact.jobTitle}</p>
									</div>
									<div class="flex gap-2">
										<a class="btn btn-square btn-ghost" href="https://mage.stream" target="_blank">
											<IconVideo />
										</a>
									</div>
								</div>
							</div>
						{:else}
							<div class="border-base-300 bg-base-100 border-b p-4 text-center opacity-50">
								Select a conversation to start messaging
							</div>
						{/if}

						<!-- Messages Area -->
						<div
							class="flex-1 space-y-4 overflow-y-auto"
							bind:this={scrollContainer}
							onscroll={handleScroll}>
							{#if loadingMore}
								<div class="p-2 text-center">
									<span class="loading loading-dots"></span>
								</div>
							{/if}

							{#each messages as message, i}
								{#if !message.isDeleted}
									<ItemMessage
										{message}
										isPreviousMsgSender={i > 0 &&
											message.displayName === messages[i - 1].displayName}
										isDifferentDay={isDifferentDay(message, messages[i - 1])}
										onDelete={handleDeleteMessage} />
								{/if}
							{/each}
						</div>

						<!-- Message Input -->
						<div class="bg-base-100 py-4 pl-4">
							<div class="bg-base-200 flex w-full flex-col gap-2">
								<textarea
									class="textarea textarea-ghost max-h-[40vh] min-h-20 w-full overflow-y-auto"
									placeholder="Send a message..."
									bind:value={messageText}
									bind:this={textarea}
									rows="1"
									oninput={adjustTextareaHeight}
									onkeydown={(e) => {
										if (e.key === 'Enter' && !e.shiftKey) {
											e.preventDefault()
											handleSendMessage()
										}
									}}></textarea>
								<div class="flex justify-end gap-2">
									<button class="btn">
										<IconAttach />
									</button>
									<button class="btn" onclick={handleSendMessage} disabled={!messageText.trim()}>
										<IconSend />
									</button>
								</div>
							</div>
						</div>
					</div>

					<!-- Contact Details Section -->
					{#if value.otherUser}
						<div class="hidden w-80 p-4 lg:block">
							<ContactDetails {contact} {chatUsers} />
						</div>
					{/if}
				</div>
			</div>

			<!-- Sidebar -->
			<div class="drawer-side h-full overflow-y-hidden!">
				<label for="my-drawer-2" class="drawer-overlay"></label>
				<ul class="bg-base-100 text-base-content flex h-full flex-col">
					<!-- Search Bar -->
					<div class="form-control p-4">
						<label class="input input-bordered flex items-center gap-2">
							<IconSearch2 />
							<input type="text" placeholder="Search" class="grow" />
						</label>
					</div>

					<!-- Chats List -->
					<div class="flex-1 overflow-y-scroll px-4 pb-4">
						{#each value || [] as chat}
							<ItemChat {chat} bind:selectedChatId />
						{/each}
					</div>
				</ul>
			</div>
		</div>
	{/await}
</div>
