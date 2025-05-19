import { post, patch } from '$lib/api'
import { type Actions } from '@sveltejs/kit'
import type { PageServerLoad } from '../../../$types'
import { redirect } from '@sveltejs/kit'

export const load = (async ({ locals }: { locals: App.Locals }) => {
	// Restrict access to job-post if user.role is not 'client'
	if (!locals.user?.user || locals.user.user.role !== 'client') {
		throw redirect(302, '/dashboard')
	}
}) satisfies PageServerLoad

export const actions = {
	'create-draft-job': async ({ request, locals }: { request: any; locals: any }) => {
		const data = await request.formData()
		const title = data.get('title') || ''
		const categoryId = data.get('categoryId')
		return await post(
			`jobs/draft`,
			{ title, categoryId },
			{ userId: locals.user.userId, token: locals.user.token }
		)
	},
	'update-job': async ({ request, locals }: { request: any; locals: any }) => {
		const data = await request.formData()
		const jobId = data.get('jobId')
		const updateData: any = {}

		// Description (step 3)
		if (data.has('description')) {
			updateData.description = data.get('description')
		}

		// Budget and scope (step 4)
		if (data.has('budgetType')) {
			updateData.jobType = data.get('budgetType')
			updateData.amount = parseInt(data.get('budget') || '0')
			updateData.duration = data.get('duration')
			updateData.experience = data.get('experience')
		}

		// Questions (step 5)
		if (data.has('questions')) {
			updateData.questions = JSON.parse(data.get('questions'))
		}

		// Status update (step 6)
		if (data.has('status')) {
			updateData.status = data.get('status')
		}

		return await patch(`jobs/jobId=${jobId}`, updateData, {
			userId: locals.user.userId,
			token: locals.user.token
		})
	}
} satisfies Actions
