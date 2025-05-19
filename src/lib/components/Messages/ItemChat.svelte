<script lang="ts">
	let { chat, selectedChatId = $bindable() } = $props()
</script>

<li class="w-full">
	<a
		href={`/messages/${chat.id}`}
		role="button"
		tabindex="0"
		class={`block max-w-80 p-4 transition-colors ${
			selectedChatId === chat._id ? 'bg-primary hover:bg-primary' : ''
		}`}>
		<div class="flex items-center gap-3">
			<div class="avatar">
				<div class="w-12">
					<img src={chat.avatar} alt={chat.senderName} />
				</div>
			</div>
			<div class="min-w-0 flex-1">
				<div class="flex items-center justify-between gap-2">
					<h3
						class={`truncate font-semibold ${
							selectedChatId === chat._id ? 'text-black' : 'text-white'
						}`}>
						{chat.senderName}
					</h3>
					<span
						class={`shrink-0 text-xs ${
							selectedChatId === chat._id ? 'text-black/70' : 'text-gray-400'
						}`}>{chat.timestamp}</span>
				</div>
				<p
					class={`truncate text-sm ${
						selectedChatId === chat._id ? 'text-black/70' : 'opacity-70'
					}`}>
					{chat.jobTitle}
				</p>
				<p class={`truncate text-sm ${selectedChatId === chat._id ? 'text-black/90' : ''}`}>
					{chat.content}
				</p>
			</div>
		</div>
	</a>
</li>
