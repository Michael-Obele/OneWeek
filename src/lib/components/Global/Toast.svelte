<script lang="ts">
	let { message, type } = $props<{ message: string; type: string }>()
</script>

<div class="toast toast-end">
	<div class="alert alert-{type}">
		<div>
			<span>{message}</span>
		</div>
	</div>
</div>
