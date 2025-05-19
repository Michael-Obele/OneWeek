import { error } from '@sveltejs/kit'
import { post } from '$lib/api'
import { type Actions } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'
import type { PageServerLoad } from '../../../../$types'

export const load = (async ({ locals, parent }: { locals: App.Locals; parent: () => Promise<any> }) => {
	try {
		const { userId, token } = locals.user
		
		if (!userId || !token) {
			throw error(401, 'Unauthorized')
		}

		// Get parent data which already contains jobDetails
		const parentData = await parent()
		
		// Verify we have the job details from the parent route
		if (!parentData.jobDetails) {
			throw error(500, 'Job details not available')
		}

		// Return the parent data or any additional data specific to the apply page
		return {
			// No need to fetch jobDetails again, it's already in the parent data
			// and will be available to the page component
		}
	} catch (err) {
		console.error('Error in apply page load:', err)
		throw error(500, 'Failed to load application data')
	}
}) satisfies PageServerLoad

export const actions = {
	default: async ({ request, locals }: RequestEvent) => {
		const data = await request.formData()
		await post(
			'bids',
			{ coverLetter: data.get('coverLetter'), amount: data.get('amount') },
			{ userId: locals.user.userId, token: locals.user.token }
		)

		//TODO: if response was successful redirect to job-detail page and show successfully applied
	}
} satisfies Actions
