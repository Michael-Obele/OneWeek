import { error } from '@sveltejs/kit'
import { get } from '$lib/api'
import type { PageServerLoad } from '../../../../$types'
import type { Actions } from '@sveltejs/kit'

export const load = (async ({
	params,
	locals,
	url
}: {
	params: any
	locals: App.Locals
	url: URL
}) => {
	try {
		const { jobId } = params
		const { userId, token } = locals.user

		if (!jobId || !userId || !token) {
			throw error(401, 'Unauthorized')
		}

		// Get search parameters from URL
		const page = Number(url.searchParams.get('page')) || 1
		const limit = Number(url.searchParams.get('limit')) || 10
		const searchQuery = url.searchParams.get('q') || ''

		// Build query parameters for API calls
		const queryParams = new URLSearchParams()
		queryParams.append('page', page.toString())
		queryParams.append('limit', limit.toString())
		queryParams.append('status', 'pending')

		if (searchQuery) queryParams.append('searchQuery', searchQuery)

		const queryString = queryParams.toString()

		// Get bids with search parameters
		const bids = get(`jobs/${jobId}/bids?${queryString}`, { userId, token })

		// Get freelancers with search parameters
		const freelancers = get(`users/freelancers?${queryString}`, { userId, token })

		return {
			lazy: {
				bids,
				freelancers
			},
			jobId,
			currentPage: page,
			limit,
			searchQuery
		}
	} catch (err) {
		console.error('Error in job detail server load:', err)
		throw error(500, 'Failed to load job data')
	}
}) satisfies PageServerLoad

export const actions = {
	search: async ({ request }: { request: Request }) => {
		const data = await request.formData()
		const searchQuery = data.get('searchQuery')?.toString() || ''

		// Create search params for redirect
		const searchParams = new URLSearchParams()
		if (searchQuery) searchParams.set('q', searchQuery)

		// Reset to page 1 for new searches
		searchParams.set('page', '1')

		return {
			success: true,
			searchParams: searchParams.toString()
		}
	}
} satisfies Actions
