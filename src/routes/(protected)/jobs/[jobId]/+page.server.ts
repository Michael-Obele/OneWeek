import { error } from '@sveltejs/kit'
import { get } from '$lib/api'
import { createEmptyPaginationResponse } from '$lib/utils'
import type { PageServerLoad } from '../../../$types'

export const load = (async ({ params, locals }: { params: any; locals: App.Locals }) => {
	try {
		const { jobId } = params
		const { userId, token } = locals.user

		if (!jobId || !userId || !token) {
			throw error(401, 'Unauthorized')
		}

		// Await jobDetails to get userId for other endpoints
		const jobDetails = await get(`jobs/${jobId}`, { userId, token })
		const jobActivity = get(`jobs/${jobId}/activity`, { userId, token })

		// Use jobDetails.userId directly since we've awaited it
		const page = 1
		const limit = 10

		const jobsInProgress = jobDetails?.userId
			? get(
					`jobs/in-progress?userId=${jobDetails.userId}&role=client&lastId=${jobDetails._id}&limit=10`,
					{ userId, token }
				)
			: Promise.resolve(createEmptyPaginationResponse(page, limit))

		const clientOtherJobs = jobDetails?.userId
			? get(`jobs/client/open?userId=${jobDetails.userId}`, { userId, token })
			: Promise.resolve(createEmptyPaginationResponse(page, limit))

		const clientDetails = jobDetails?.userId
			? get(`jobs/client/details?userId=${jobDetails.userId}`, { userId, token })
			: null

		return {
			jobDetails,
			lazy: {
				jobActivity,
				jobsInProgress,
				clientOtherJobs,
				clientDetails
			}
		}
	} catch (err) {
		console.error('Error in job detail server load:', err)
		throw error(500, 'Failed to load job data')
	}
}) satisfies PageServerLoad
