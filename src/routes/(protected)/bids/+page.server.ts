import type { PageServerLoad } from '../../$types'
import { get } from '$lib/api'
import { redirect } from '@sveltejs/kit'
import { createEmptyPaginationResponse } from '$lib/utils'
export const load = (({ url, locals }: { url: URL; locals: App.Locals }) => {
	// Restrict access to bids if user.role is not 'freelancer'
	if (!locals.user?.user || locals.user.user.role !== 'freelancer') {
		throw redirect(302, '/dashboard')
	}
	const page = Number(url.searchParams.get('page')) || 1
	const limit = Number(url.searchParams.get('limit')) || 10
	const tab = url.searchParams.get('tab') || 'active'
	const auth = { userId: locals.user?.userId, token: locals.user?.token }
	// Return promises for lazy loading based on the current tab
	return {
		lazy: {
			activeBids:
				tab === 'active'
					? get(`bids/active?page=${page}&limit=${limit}`, auth)
					: Promise.resolve(createEmptyPaginationResponse(page, limit)),

			submittedBids:
				tab === 'submitted'
					? get(`bids/submitted?page=${page}&limit=${limit}`, auth)
					: Promise.resolve(createEmptyPaginationResponse(page, limit)),

			offerBids:
				tab === 'offers'
					? get(`bids/offers?page=${page}&limit=${limit}`, auth)
					: Promise.resolve(createEmptyPaginationResponse(page, limit)),

			archivedBids:
				tab === 'archived'
					? get(`bids/archived?page=${page}&limit=${limit}`, auth)
					: Promise.resolve(createEmptyPaginationResponse(page, limit))
		},
		currentTab: tab,
		currentPage: page,
		limit
	}
}) satisfies PageServerLoad
