import { error } from '@sveltejs/kit'
import { get } from '$lib/api'
import type { LayoutServerLoad } from './$types'

export const load = (async ({ params, locals }: { params: any; locals: App.Locals }) => {
	try {
		const { jobId } = params
		const { userId, token } = locals.user
		const bidsCount = get(`bids/count?jobId=${jobId}`, { userId, token })
		return {
			lazy: {
				bidsCount
			}
		}
	} catch (err) {
		console.error('Error in bid count server load:', err)
		throw error(500, 'Failed to load job data')
	}
}) satisfies LayoutServerLoad
