<script>
	// Define props using Svelte 5 runes
	const {
		src = '',
		alt = '',
		width,
		height,
		className = '',
		loading = /** @type {'lazy' | 'eager' | null | undefined} */ ('lazy'),
		sizes = '100vw',
		priority = false
	} = $props()

	// Import environment variables
	import { env } from '$env/dynamic/public'

	// State variables
	let imgElement = $state(/** @type {HTMLImageElement | null} */ (null))
	let avifSrc = $state('')
	let pngSrc = $state('')
	let srcsetAvif = $state('')
	let loaded = $state(false)

	// Responsive image sizes for srcset - more granular sizes for better matching
	const SIZES = [320, 480, 640, 768, 960, 1080, 1280, 1440, 1920]

	// Use $effect for initialization
	$effect(() => {
		// Wrap in IIFE to handle async operations
		;(async () => {
			// For static images in the /static folder
			if (src.startsWith('/')) {
				const originalPath = src
				const basePath = src.substring(0, src.lastIndexOf('.')) || src
				const filename = basePath.split('/').pop()
				const dirPath = basePath.substring(0, basePath.lastIndexOf('/'))

				// Set the original image as the default source for fallback
				pngSrc = originalPath // Default PNG src to original
				avifSrc = originalPath // Default AVIF src to original

				// Only use optimized paths based on environment
				const useOptimized = env.PUBLIC_ENV === 'localhost' // Use optimized paths in prod/staging

				if (useOptimized) {
					// Convert /images/path/file.png to /optimized-images/path/file
					const optimizedBasePath = dirPath.replace('/images', '/optimized-images') + '/' + filename

					// Create paths for optimized versions
					avifSrc = `${optimizedBasePath}.avif`

					// Create srcset for responsive images
					const avifSrcsetItems = []

					// Determine if this image might have responsive versions
					const hasResponsiveSizes =
						width > 800 ||
						originalPath.includes('background') ||
						originalPath.includes('banner') ||
						originalPath.includes('hero') ||
						originalPath.includes('grid')

					if (hasResponsiveSizes) {
						// Get image dimensions to prevent upscaling
						const img = new Image()
						img.src = originalPath
						await new Promise((resolve) => (img.onload = resolve))
						const imgWidth = img.naturalWidth

						// Only include sizes that would be smaller than the original image
						SIZES.filter((size) => size <= imgWidth).forEach((size) => {
							avifSrcsetItems.push(`${optimizedBasePath}-${size}.avif ${size}w`)
						})

						// Add the largest size explicitly
						avifSrcsetItems.push(`${optimizedBasePath}.avif ${imgWidth}w`)

						srcsetAvif = avifSrcsetItems.join(', ')
					}
				} else {
					// Dev environment: use original paths
					avifSrc = originalPath
					pngSrc = originalPath
				}
				loaded = true
			} else {
				// For dynamic images imported in code (e.g., CMS)
				try {
					// This uses vite-imagetools to generate optimized versions
					const importedImage = await import(
						/* @vite-ignore */ `${src}?w=${width || 'auto'}&format=avif;png&as=srcset` // Request AVIF and PNG
					)
					const sources = importedImage.default

					avifSrc = sources.avif
					pngSrc = sources.png // Assign PNG source
					loaded = true
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error('Error loading optimized image:', error)
					// Fallback to the original source if optimization fails
					pngSrc = src
					avifSrc = src // Also set avifSrc to original for consistency
					loaded = true
				}
			}
		})()
	})

	function handleLoad() {
		if (imgElement) {
			imgElement.classList.remove('opacity-0')
		}
	}

	// Determine appropriate loading attribute based on priority
	const finalLoading = priority ? 'eager' : loading
	const fetchPriority = priority ? 'high' : 'auto'
</script>

{#if loaded}
	<picture>
		{#if avifSrc && srcsetAvif}
			<source srcset={srcsetAvif} type="image/avif" {sizes} />
		{:else if avifSrc}
			<source srcset={avifSrc} type="image/avif" {sizes} />
		{/if}
		<img
			bind:this={imgElement}
			src={pngSrc}
			{alt}
			{width}
			{height}
			loading={finalLoading}
			fetchpriority={fetchPriority}
			decoding={priority ? 'sync' : 'async'}
			class="opacity-0 transition-opacity duration-300 {className}"
			{sizes}
			onload={handleLoad} />
	</picture>
{:else}
	<div
		class="animate-pulse bg-gray-200 dark:bg-gray-700"
		style="width: {width || 100}px; height: {height || 100}px;">
	</div>
{/if}
