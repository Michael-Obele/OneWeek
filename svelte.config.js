import adapter from '@sveltejs/adapter-cloudflare'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// Pass the nodejs_compat flag to the Cloudflare adapter
			compatibility_flags: ['nodejs_compat']
		})
	},
	compilerOptions: {
		runes: true
	}
}

export default config
