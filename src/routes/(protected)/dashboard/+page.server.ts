import { get } from '$lib/api'
import { createEmptyPaginationResponse } from '$lib/utils'
import type { PageServerLoad } from '../../$types'

export const load = (async ({ locals }: { locals: App.Locals }) => {
	const userRole = locals.user?.user?.role
	const page = 1
	const limit = 5

	return {
		lazy: {
			clientData:
				userRole === 'client'
					? {
							postedJobs: get('jobs/posted', {
								userId: locals.user.userId,
								token: locals.user.token
							}),
							hired: get('jobs/hired', {
								userId: locals.user.userId,
								token: locals.user.token
							})
						}
					: {
							postedJobs: Promise.resolve(createEmptyPaginationResponse(page, limit)),
							hired: Promise.resolve(createEmptyPaginationResponse(page, limit))
						},
			freelancerData:
				userRole === 'freelancer'
					? {
							activeJobs: get('jobs/active', {
								userId: locals.user.userId,
								token: locals.user.token
							}),
							bestMatches: get('jobs/open-jobs?limit=5&isBestMatch=true', {
								userId: locals.user.userId,
								token: locals.user.token
							}),
							mostRecent: get('jobs/open-jobs?limit=5', {
								userId: locals.user.userId,
								token: locals.user.token
							})
						}
					: {
							activeJobs: Promise.resolve(createEmptyPaginationResponse(page, limit)),
							bestMatches: Promise.resolve(createEmptyPaginationResponse(page, limit)),
							mostRecent: Promise.resolve(createEmptyPaginationResponse(page, limit))
						}
		}
	}
}) satisfies PageServerLoad
