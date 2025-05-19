import { get } from '$lib/api'
import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from '../../$types'
import { createEmptyPaginationResponse } from '$lib/utils'

export const load = (async ({ url, locals }: { url: URL; locals: App.Locals }) => {
	// Get search parameters from URL
	// Set default tab based on user role
	const defaultTab = locals.user?.user?.role === 'freelancer' ? 'open-jobs' : 'job-posts'
	const tab = url.searchParams.get('tab') || defaultTab
	const page = Number(url.searchParams.get('page')) || 1
	const limit = Number(url.searchParams.get('limit')) || 10
	const searchQuery = url.searchParams.get('q') || ''
	const location = url.searchParams.get('location') || 'all'
	const timezone = url.searchParams.get('timezone') || 'all'
	const categoryNames = url.searchParams.get('category') || 'all'
	const jobSuccessScore = Number(url.searchParams.get('jobSuccess')) || 0
	const earnedAmount = Number(url.searchParams.get('earnedAmount')) || 0
	const status = url.searchParams.get('status') || 'all'
	const averageRating = Number(url.searchParams.get('averageRating')) || 0
	const spentAmount = Number(url.searchParams.get('spentAmount')) || 0
	const lastId = url.searchParams.get('lastId') || ''

	const auth = { userId: locals.user?.userId, token: locals.user?.token }

	// Build query parameters for API calls
	const queryParams = new URLSearchParams()
	queryParams.append('page', page.toString())
	queryParams.append('limit', limit.toString())

	if (searchQuery) queryParams.append('searchQuery', searchQuery)
	if (location !== 'all') queryParams.append('location', location)
	if (timezone !== 'all') queryParams.append('timezone', timezone)
	if (categoryNames !== 'all') queryParams.append('categoryNames', categoryNames)
	if (status !== 'all') queryParams.append('status', status)
	if (lastId) queryParams.append('lastId', lastId)

	// Build freelancer-specific query params
	const freelancerQueryParams = new URLSearchParams(queryParams)
	if (jobSuccessScore > 0)
		freelancerQueryParams.append('jobSuccessScore', jobSuccessScore.toString())
	if (earnedAmount > 0) freelancerQueryParams.append('earnedAmount', earnedAmount.toString())

	// Build job-specific query params
	const jobQueryParams = new URLSearchParams(queryParams)
	if (averageRating > 0) jobQueryParams.append('averageRating', averageRating.toString())
	if (spentAmount > 0) jobQueryParams.append('spentAmount', spentAmount.toString())

	const freelancerQueryString = freelancerQueryParams.toString()
	const jobQueryString = jobQueryParams.toString()
	const queryString = queryParams.toString()

	// Return data and lazy-loaded promises based on the current tab and user role
	return {
		lazy: {
			regions: get('users/regions', auth),

			// Client's own job posts
			jobPosts:
				tab === 'job-posts' && locals.user?.user?.role === 'client'
					? get(`jobs/posted?${queryString}`, auth)
					: Promise.resolve(createEmptyPaginationResponse(page, limit)),

			// Client's or Freelancer's contracts
			contracts:
				tab === 'contracts' && locals.user?.user?.role === 'client'
					? get(`jobs/hired?${queryString}`, auth)
					: locals.user?.user?.role === 'freelancer'
						? get(`jobs/active?${jobQueryString}`, auth)
						: Promise.resolve(createEmptyPaginationResponse(page, limit)),

			// Freelancers for clients to browse
			freelancers:
				tab === 'freelancers' && locals.user?.user?.role === 'client'
					? get(`users/freelancers?${freelancerQueryString}`, auth)
					: Promise.resolve(createEmptyPaginationResponse(page, limit)),

			// Freelancer - open jobs to apply for
			openJobs:
				tab === 'open-jobs' && locals.user?.user?.role === 'freelancer'
					? get(`jobs/open-jobs?${jobQueryString}`, auth)
					: Promise.resolve(createEmptyPaginationResponse(page, limit))
		},
		currentTab: tab,
		currentPage: page,
		limit,
		searchQuery,
		location,
		timezone,
		categoryNames,
		jobSuccessScore,
		earnedAmount,
		status,
		averageRating,
		spentAmount,
		lastId
	}
}) satisfies PageServerLoad

export const actions = {
	search: async ({ request, url }: { request: any; url: URL }) => {
		const data = await request.formData()
		const searchQuery = data.get('searchQuery') || ''
		const location = data.get('location') || 'all'
		const timezone = data.get('timezone') || 'all'
		const categoryNames = data.get('categoryNames') || 'all'
		const jobSuccessScore = Number(data.get('jobSuccessScore')) || 0
		const earnedAmount = Number(data.get('earnedAmount')) || 0

		// Redirect to the same page with search parameters in the URL
		const searchParams = new URLSearchParams(url.searchParams)
		searchParams.set('search', searchQuery)
		searchParams.set('location', location)
		searchParams.set('timezone', timezone)
		searchParams.set('category', categoryNames)
		searchParams.set('jobSuccess', jobSuccessScore.toString())
		searchParams.set('earnedAmount', earnedAmount.toString())
		searchParams.set('page', '1') // Reset to page 1 on new search

		return { success: true, searchParams: searchParams.toString() }
	}
} satisfies Actions
