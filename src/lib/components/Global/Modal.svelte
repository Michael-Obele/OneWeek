<script lang="ts">
	let { 
		id,
		title,
		message,
		no,
		noAction,
		yes,
		yesAction,
		isError = false
	} = $props<{
		id: string;
		title: string;
		message: string;
		no: string;
		noAction: () => void;
		yes: string;
		yesAction: () => Promise<any>;
		isError?: boolean;
	}>()
</script>

<label for={id} class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<h3 class="text-lg font-bold">{title}</h3>
		<p class="py-4">
			{message}
		</p>
		<div class="modal-action">
			<button onclick={() => noAction()} class="btn">{no}</button>
			<button
				onclick={async () => await yesAction()}
				class="btn {isError ? 'btn-error' : 'btn-primary'}">{yes}</button>
		</div>
	</label>
</label>
