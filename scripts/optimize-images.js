// @ts-check
/* global console */
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const STATIC_DIR = path.resolve('static')
const IMAGES_DIR = path.join(STATIC_DIR, 'images')
const OUTPUT_DIR = path.join(STATIC_DIR, 'optimized-images')

// Create responsive image sizes
const SIZES = [320, 480, 640, 768, 960, 1080, 1280, 1440, 1920]

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
	fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

/**
 * Recursively finds all original image files in a directory
 * @param {string} dir - Directory to scan
 * @param {Array<string>} fileList - Accumulator for found files
 * @returns {Array<string>} - List of image paths relative to static directory
 */
function findOriginalImageFiles(dir, fileList = []) {
	const files = fs.readdirSync(dir)

	for (const file of files) {
		const fullPath = path.join(dir, file)
		const stat = fs.statSync(fullPath)

		if (stat.isDirectory()) {
			findOriginalImageFiles(fullPath, fileList)
		} else {
			// Check if file is an image based on extension
			const ext = path.extname(file).toLowerCase()
			const filename = path.basename(file, ext)

			// Skip already optimized files
			if (
				['.jpg', '.jpeg', '.png', '.gif'].includes(ext) &&
				!filename.includes('-optimized') &&
				!SIZES.some((size) => filename.includes(`-${size}`))
			) {
				// Get path relative to static directory
				const relativePath = '/' + path.relative(STATIC_DIR, fullPath).replace(/\\/g, '/')
				fileList.push(relativePath)
			}
		}
	}

	return fileList
}

/**
 * Creates output directory structure mirroring the input structure
 * @param {string} imagePath - Path to the image relative to static directory
 * @returns {string} - Output directory path
 */
function createOutputDirectory(imagePath) {
	// Get directory structure relative to images dir
	const relativeDir = path.dirname(imagePath).replace(/^\/images\/?/, '')
	const outputDir = path.join(OUTPUT_DIR, relativeDir)

	// Create directory if it doesn't exist
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true })
	}

	return outputDir
}

/**
 * Optimizes an image into multiple formats and sizes
 * @param {string} imagePath - Path to the image relative to static directory
 */
async function optimizeImage(imagePath) {
	const fullPath = path.join(STATIC_DIR, imagePath)
	const filename = path.basename(imagePath, path.extname(imagePath))
	const outputDir = createOutputDirectory(imagePath)

	if (!fs.existsSync(fullPath)) {
		console.error(`Image not found: ${fullPath}`)
		return
	}

	console.log(`Optimizing ${imagePath}...`)

	try {
		// Get image metadata to preserve aspect ratio
		const metadata = await sharp(fullPath).metadata()
		const imageWidth = metadata.width || 0
		const imageHeight = metadata.height || 0

		if (imageWidth === 0 || imageHeight === 0) {
			console.error(`Could not determine dimensions for ${imagePath}`)
			return
		}

		// Skip SVG files (they're already optimized vector graphics)
		if (metadata.format === 'svg') {
			console.log(`Skipping SVG file: ${imagePath}`)
			return
		}

		// Generate AVIF version
		await sharp(fullPath)
			.toFormat('avif')
			.toFile(path.join(outputDir, `${filename}.avif`))

		// Generate responsive sizes for AVIF
		for (const width of SIZES) {
			if (width <= imageWidth) {
				const height = Math.round((width / imageWidth) * imageHeight)
				await sharp(fullPath)
					.resize(width, height)
					.toFormat('avif')
					.toFile(path.join(outputDir, `${filename}-${width}.avif`))
			}
		}

		console.log(`✓ Successfully optimized ${imagePath}`)
	} catch (error) {
		console.error(`Error optimizing ${imagePath}:`, error)
	}
}

async function main() {
	// Find all original image files in the images directory
	const imagePaths = findOriginalImageFiles(IMAGES_DIR)

	console.log(`Found ${imagePaths.length} original images to optimize`)

	// Process each image
	for (const imagePath of imagePaths) {
		await optimizeImage(imagePath)
	}

	console.log('Image optimization complete!')
}

main().catch((error) => {
	console.error('Error in optimization process:', error)
})
