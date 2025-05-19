import { get } from '$lib/api'
import type { PageServerLoad } from '../../$types'

export const load = (({ locals }: { locals: App.Locals }) => {
	return {
		lazy: {
			chats: get(`chats`, { userId: locals.user.userId, token: locals.user.token })
		}
	}
}) satisfies PageServerLoad

// [
// 	{
// 		_id: 1,
// 		senderName: 'John Doe',
// 		timestamp: '12/04/24',
// 		content: 'Hello, how are you?',
// 		jobTitle: 'Graphic Designer for ABC CompanyGraphic Designer for ABC CompanyGraphic Designer for ABC CompanyGraphic Designer for ABC CompanyGraphic Designer for ABC CompanyGraphic Designer for ABC CompanyGraphic Designer for ABC CompanyGraphic Designer for ABC CompanyGraphic Designer for ABC CompanyGraphic Designer for ABC CompanyGraphic Designer for ABC CompanyGraphic Designer for ABC CompanyGraphic Designer for ABC Company'
// 	},
// 	{
// 		_id: 2,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 3,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 4,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 5,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 6,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 7,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 8,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 9,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 10,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 11,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 12,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 13,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 14,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 15,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 16,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 17,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 18,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 19,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 20,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 21,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 22,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 23,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	},
// 	{
// 		_id: 24,
// 		senderName: 'Jane Smith',
// 		timestamp: '12/04/24',
// 		content: 'I am good, thank you!',
// 		jobTitle: 'Web Developer for XYZ Company'
// 	}
// ]
