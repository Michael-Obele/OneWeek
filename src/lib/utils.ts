const isJsonString = (str: string): boolean => {
	try {
		JSON.parse(str)
	} catch {
		return false
	}
	return true
}

const copyToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text)
		console.log('Text copied to clipboard')
	} catch (err) {
		console.error('Error copying text to clipboard:', err)
	}
}

const timeSince = (date: string) => {
	if (!date) return 'Date created unknown'
	const created: any = new Date(date)
	const currentDate: any = new Date(Date.now())
	const seconds = Math.floor((currentDate - created) / 1000)
	let interval = seconds / 31536000
	if (interval > 1) {
		return Math.floor(interval) + ' years ago'
	}
	interval = seconds / 2592000
	if (interval > 1) {
		return Math.floor(interval) + ' months ago'
	}
	interval = seconds / 86400
	if (interval > 1) {
		return Math.floor(interval) + ' days ago'
	}
	interval = seconds / 3600
	if (interval > 1) {
		return Math.floor(interval) + ' hours ago'
	}
	interval = seconds / 60
	if (interval > 1) {
		return Math.floor(interval) + ' minutes ago'
	}
	return Math.floor(seconds) + ' seconds ago'
}

/**
 * Return the date in the format MMM DD, YYYY contatonated with the tabs function.
 * If tab is 'Offers', return 'Received MMM DD, YYYY'
 * Else, return 'Initiated MMM DD, YYYY'
 * @param dateTime
 * @param tab
 */
const bidInitiatedDate = (dateTime: string, tab: string) => {
	const date = new Date(dateTime)
	const tabText = tab === 'Offers' ? 'Received' : 'Initiated'
	return `${tabText} ${date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	})}`
}

const getNumberInThousands = (number: number) => {
	if (number >= 1000000000) {
		return Math.floor(number / 1000000000) + 'b'
	} else if (number >= 1000000) {
		return Math.floor(number / 1000000) + 'm'
	} else if (number >= 1000) {
		return Math.floor(number / 1000) + 'k'
	} else {
		return number.toString()
	}
}

const dataURLtoFile = (dataurl: string, filename: string) => {
	const arr = dataurl.split(',')
	const mime = (arr[0] && arr[0].match(/:(.*?);/)?.[1]) || ''
	const bstr = atob(arr[1])
	let n = bstr.length
	const u8arr = new Uint8Array(n)
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n)
	}
	return new File([u8arr], filename, { type: mime })
}

const getHref = async ({
	provider,
	apiUrl,
	xApiKey
}: {
	provider: string
	apiUrl: string
	xApiKey: string
}) => {
	const response = await fetch(`${apiUrl}/auth/${provider}`, {
		headers: {
			Accept: '*/*',
			'x-api-key': xApiKey
		}
	})
	const { loginUrl }: any = await response.json()
	window.location.replace(loginUrl)
}

const formatTime = (streamTime: number) => {
	const hours = Math.floor(streamTime / 3600)
	const minutes = Math.floor((streamTime % 3600) / 60)
	const seconds = streamTime % 60

	const paddedHours = hours.toString().padStart(2, '0')
	const paddedMinutes = minutes.toString().padStart(2, '0')
	const paddedSeconds = seconds.toString().padStart(2, '0')

	return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
}

const getTimeFormat = (duration: number) => {
	const hours = Math.floor(duration / 3600)
	const minutes = Math.floor((duration % 3600) / 60)
	const seconds = Math.floor(duration % 60)

	const secondsFormat = seconds < 10 ? `0${seconds}` : seconds

	return hours > 0 ? `${hours}:${minutes}:${secondsFormat}` : `${minutes}:${secondsFormat}`
}

const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

const formatTimestamp = (timestamp: string) => {
	const date = new Date(timestamp)
	return date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	})
}

const formatDate = (timestamp: string) => {
	const date = new Date(timestamp)
	return date.toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	})
}

/**
 * Convert lessThan1Month, 1to3Months, 3to6Months, 6monthsPlus to text
 * @param duration
 * @returns
 */
const durationToText = (duration: string) => {
	switch (duration) {
		case 'lessThan1Month':
			return 'Less than 1 month'
		case '1to3Months':
			return '1 to 3 months'
		case '3to6Months':
			return '3 to 6 months'
		case '6monthsPlus':
			return '6 months plus'
		default:
			return 'Unknown'
	}
}

/**
 * Convert entry, intermediate, expert to text
 * @param experience
 * @returns
 */
const experienceToText = (experience: string) => {
	switch (experience) {
		case 'entry':
			return 'Looking for someone relatively new to this field '
		case 'intermediate':
			return 'Looking for substantial experience in this field '
		case 'expert':
			return 'Looking for comprehensive and deep expertise in this field '
		default:
			return 'Unknown'
	}
}

/**
 * Capitalize the first letter of a string
 * @param string
 * @returns
 */
const capitalizeFirstLetter = (string: string): string => {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Create an empty pagination response with default values
 * @param page - Current page number
 * @param limit - Items per page
 * @returns A response object with empty results and pagination metadata
 */
const createEmptyPaginationResponse = (page: number, limit: number) => {
	return {
		results: [],
		pagination: {
			currentPage: page,
			totalPages: 0,
			totalCount: 0,
			hasNextPage: false,
			hasPrevPage: false,
			limit
		}
	}
}

/**
 * Convert a string to title case (capitalize first letter of each word)
 * @param string - The input string to convert
 * @returns The string with the first letter of each word capitalized
 */
const toCapitalize = (text: string): string => {
	// Using regex for better performance
	return text.replace(/\b\w/g, (char) => char.toUpperCase())
}

/**
 * Convert a number to the closest value.
 * If user earned earned more than $1000, it will return $1,000+
 * If a user earned more than 10000, it will return $10,000+
 *
 * @param totalEarned
 * @returns
 */
const totalEarnedToGeneral = (totalEarned: number): string => {
	const thresholds = [
		{ limit: 999999, label: '$1,000,000+' },
		{ limit: 499999, label: '$500,000+' },
		{ limit: 99999, label: '$100,000+' },
		{ limit: 49999, label: '$50,000+' },
		{ limit: 9999, label: '$10,000+' },
		{ limit: 4999, label: '$5,000+' },
		{ limit: 999, label: '$1,000+' }
	]

	for (const threshold of thresholds) {
		if (totalEarned > threshold.limit) {
			return threshold.label
		}
	}

	// If below the lowest threshold, return the exact amount (or 0 if negative/undefined)
	return `$${Math.max(0, totalEarned)}`
}

/**
 * Get the date in the format MMM DD
 * @param date - The date string to format
 * @returns The formatted date string
 */
const getDateMMMDD = (date: string) => {
	const dateObj = new Date(date)
	return `${dateObj.toLocaleString('default', { month: 'short' })} ${dateObj.getDate()}`
}

/**
 * Get the dollar amount in the format $1,000
 * @param amount - The amount to format
 * @returns The formatted dollar amount
 */
const getDollarFormat = (amount: number) => {
	return `$${amount.toLocaleString('en-US')}`
}

const bidCountToGeneral = (bidCount: number) => {
	const thresholds = [
		{ limit: 9999, label: '10,000+' },
		{ limit: 4999, label: '5,000+' },
		{ limit: 999, label: '1,000+' },
		{ limit: 99, label: '100+' },
		{ limit: 49, label: '50+' },
		{ limit: 9, label: '10+' },
		{ limit: 5, label: 'Less than 5' }
	]

	for (const threshold of thresholds) {
		if (bidCount > threshold.limit) {
			return threshold.label
		}
	}

	// If below the lowest threshold, return the exact amount (or 0 if negative/undefined)
	return `${Math.max(0, bidCount)}`
}

export {
	isJsonString,
	copyToClipboard,
	timeSince,
	bidInitiatedDate,
	getNumberInThousands,
	dataURLtoFile,
	getHref,
	formatTime,
	getTimeFormat,
	isValidEmail,
	formatTimestamp,
	formatDate,
	durationToText,
	experienceToText,
	capitalizeFirstLetter,
	createEmptyPaginationResponse,
	toCapitalize,
	totalEarnedToGeneral,
	getDateMMMDD,
	getDollarFormat,
	bidCountToGeneral
}
