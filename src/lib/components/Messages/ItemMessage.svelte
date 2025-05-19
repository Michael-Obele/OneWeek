<script lang="ts">
	import { formatTimestamp, formatDate } from '$lib/utils'
	import IconClose from '$lib/assets/icons/IconClose.svelte'
	import { page } from '$app/state'
	let { message, isPreviousMsgSender, isDifferentDay, onDelete } = $props()

	function handleDelete() {
		if (confirm('Are you sure you want to delete this message?')) {
			onDelete(message._id)
		}
	}
</script>

{#if isDifferentDay}
	<div class="divider my-4">
		<div class="badge badge-ghost">{formatDate(message.createdAt)}</div>
	</div>
{/if}

<div class="group chat chat-start relative">
	{#if !isPreviousMsgSender || isDifferentDay}
		<div class="avatar chat-image">
			<div class="w-10">
				<img src={message.avatar || '/avatars/default.png'} alt={message.displayName} />
			</div>
		</div>
		<div class="chat-header">
			{message.displayName}
			<time class="ml-1 text-xs opacity-50">{formatTimestamp(message.createdAt)}</time>
		</div>
	{:else}
		<div class="avatar">
			<div class="w-10"></div>
		</div>
	{/if}
	<div class="chat-bubble">
		{message.message}
	</div>
	{#if message.userId === page.data.user.user._id}
		<button
			class="btn btn-ghost btn-xs absolute top-0 right-0 opacity-0 transition-opacity group-hover:opacity-100"
			onclick={handleDelete}>
			<IconClose />
		</button>
	{/if}
</div>
