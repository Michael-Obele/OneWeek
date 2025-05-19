<script lang="ts">
	let { rating } = $props()
</script>

<div class="rating rating-xs rating-half">
	<div class="mask mask-star-2 mask-half-1" aria-label="0.5 star" aria-current={rating > 0}></div>
	<div class="mask mask-star-2 mask-half-2" aria-label="1 star" aria-current={rating >= 1}></div>
	<div class="mask mask-star-2 mask-half-1" aria-label="1.5 star" aria-current={rating >= 1.5}>
	</div>
	<div class="mask mask-star-2 mask-half-2" aria-label="2 star" aria-current={rating >= 2}></div>
	<div class="mask mask-star-2 mask-half-1" aria-label="2.5 star" aria-current={rating >= 2.5}>
	</div>
	<div class="mask mask-star-2 mask-half-2" aria-label="3 star" aria-current={rating >= 3}></div>
	<div class="mask mask-star-2 mask-half-1" aria-label="3.5 star" aria-current={rating >= 3.5}>
	</div>
	<div class="mask mask-star-2 mask-half-2" aria-label="4 star" aria-current={rating >= 4}></div>
	<div class="mask mask-star-2 mask-half-1" aria-label="4.5 star" aria-current={rating >= 4.5}>
	</div>
	<div class="mask mask-star-2 mask-half-2" aria-label="5 star" aria-current={rating >= 5}></div>
</div>
