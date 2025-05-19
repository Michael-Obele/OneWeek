import { sentrySvelteKit } from '@sentry/sveltekit'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { compression } from 'vite-plugin-compression2'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
	plugins: [
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: 'code-crow-corp',
				project: 'oneweek-website'
			},
			bundleSizeOptimizations: {
				excludeDebugStatements: true,
				excludeTracing: true,
				excludeReplayIframe: true,
				excludeReplayShadowDom: true,
				excludeReplayWorker: true
			}
		}),
		tailwindcss(),
		sveltekit(),
		imagetools({
			defaultDirectives: new URLSearchParams([
				['format', 'avif;png'],
				['quality', '80;85;75'],
				['progressive', 'true'],
				['metadata', 'none'],
				['lossless', 'false'],
				['effort', '6']
			]),
			extendOutputFormats: (builtins: any) => {
				return {
					...builtins,
					avif: (options: any) => {
						return {
							...builtins.avif(options),
							quality: options.quality || 85,
							lossless: false,
							effort: 6
						}
					}
				}
			}
		}),
		compression({
			algorithm: 'gzip',
			exclude: [/\.(br)$/, /\.(gz)$/],
			threshold: 1024
		}),
		compression({
			algorithm: 'brotliCompress',
			exclude: [/\.(br)$/, /\.(gz)$/],
			threshold: 1024
		})
	],
	define: {
		__VERSION__: JSON.stringify(process.env.npm_package_version)
	},
	build: {
		assetsInlineLimit: 0,
		cssCodeSplit: true,
		chunkSizeWarningLimit: 1000,
		sourcemap: true,
		cssMinify: 'lightningcss',
		minify: 'esbuild',
		reportCompressedSize: true
	},
	server: {
		headers: {
			'Document-Policy': 'js-profiling'
		}
	},
	preview: {},
	optimizeDeps: {
		exclude: ['@stripe/stripe-js']
	}
})
