<script lang="ts">
	let { class: customClass = '' } = $props()
</script>

<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M5.16972 13.1734L8.31972 11.2734L11.4697 13.1984L10.6447 9.5984L13.4197 7.1984L9.76972 6.87339L8.31972 3.4734L6.86972 6.8484L3.21972 7.1734L5.99472 9.5984L5.16972 13.1734ZM3.64472 15.2714L4.88472 9.9584L0.761719 6.3864L6.19272 5.9164L8.31972 0.905396L10.4467 5.9154L15.8767 6.3854L11.7537 9.9574L12.9947 15.2704L8.31972 12.4504L3.64472 15.2714Z"
		class={customClass}
		fill={customClass ? 'currentColor' : 'white'} />
</svg>
