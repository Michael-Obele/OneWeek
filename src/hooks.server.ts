import { sequence } from '@sveltejs/kit/hooks'
import * as Sentry from '@sentry/sveltekit'
import { redirect } from '@sveltejs/kit'
import { get } from '$lib/api'
import { env } from '$env/dynamic/public'

export const handle = sequence(
	Sentry.initCloudflareSentryHandle({
		dsn: env.PUBLIC_SENTRY_DSN || '',
		tracesSampleRate: 1.0
	}),
	Sentry.sentryHandle(),
	// Add cache headers for static assets
	async ({ event, resolve }) => {
		const response = await resolve(event)
		const path = event.url.pathname

		// Set cache headers for static assets
		if (
			path.startsWith('/optimized-images/') ||
			path.startsWith('/images/') ||
			path.startsWith('/static/') ||
			path.startsWith('/_app/immutable/') ||
			path.endsWith('.js') ||
			path.endsWith('.css') ||
			path.endsWith('.woff') ||
			path.endsWith('.woff2') ||
			path.endsWith('.ttf') ||
			path.endsWith('.png') ||
			path.endsWith('.jpg') ||
			path.endsWith('.jpeg') ||
			path.endsWith('.webp') ||
			path.endsWith('.avif') ||
			path.endsWith('.svg')
		) {
			// Long cache for static assets - 1 year
			// Cache-Control: public - Allow CDNs and browsers to cache
			// max-age - Browser cache duration in seconds
			// s-maxage - CDN cache duration in seconds
			// immutable - Content will not change during its TTL, no revalidation needed
			response.headers.set(
				'Cache-Control',
				'public, max-age=31536000, s-maxage=31536000, immutable'
			)
		} else if (path.startsWith('/_app/')) {
			// Shorter cache for other app assets that might change with deployments
			response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400')
		}

		// Add security headers to all responses
		// Ensure unsafe-eval is properly applied for script evaluation
		response.headers.set(
			'Content-Security-Policy',
			`default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: lh3.googleusercontent.com dev.avatars.oneweek.work media.licdn.com avatars.githubusercontent.com; font-src 'self'; connect-src 'self' *.sentry.io ${env.PUBLIC_ENV === 'localhost' ? env.PUBLIC_API_URL + ' ' + env.PUBLIC_WEBSOCKET_URL : ''}; media-src 'self'; object-src 'none'; frame-src 'self'`
		)
		response.headers.set('X-Content-Type-Options', 'nosniff')
		response.headers.set('X-Frame-Options', 'SAMEORIGIN')
		response.headers.set('X-XSS-Protection', '1; mode=block')
		response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

		return response
	},
	async ({ event, resolve }) => {
		const pathname = event.url.pathname
		const userId = event.url.searchParams.get('userId') || event.cookies.get('userId') || ''
		let token = event.url.searchParams.get('token') || event.cookies.get('token') || ''
		let user = event.locals.user?.user || ''
		const cookieItem = ['token', 'userId', 'user']

		if (token && userId) {
			if (!user) {
				const response = await get(`auth/me`, { userId, token })
				if (response && !response.error) {
					if (response.freshJwt) {
						token = response.freshJwt
					}
					user = response.user
				} else {
					cookieItem.forEach((item) => {
						event.cookies.set(item, '', {
							path: '/',
							expires: new Date(0)
						})
					})
				}
			} else if (user.isBanned) {
				cookieItem.forEach((item) => {
					event.cookies.set(item, '', {
						path: '/',
						expires: new Date(0)
					})
				})
			}

			if (pathname === '/') {
				event.cookies.set('token', token, {
					path: '/',
					maxAge: 60 * 60 * 24 * 30
				})
				event.cookies.set('userId', userId, {
					path: '/',
					maxAge: 60 * 60 * 24 * 30
				})
			}
			event.locals = {
				user: {
					userId,
					token,
					user
				}
			}
		}

		if (env.PUBLIC_MAINTENANCE_MODE === 'true') {
			if (pathname === '/maintenance') {
				return await resolve(event)
			} else {
				throw redirect(302, '/maintenance')
			}
		} else if (env.PUBLIC_FEATURE_WAITLIST === 'true') {
			if (pathname === '/landing') {
				return await resolve(event)
			} else {
				throw redirect(302, '/landing')
			}
		} else if (
			pathname === '/maintenance' ||
			(pathname === '/login' && userId) ||
			(pathname === '/dashboard' && !userId)
		) {
			throw redirect(302, '/')
		} else if (
			!userId &&
			(pathname === '/bids' ||
				pathname === '/dashboard' ||
				pathname === '/messages' ||
				pathname === '/search' ||
				pathname === '/settings' ||
				pathname === '/profile' ||
				pathname === '/jobs')
		) {
			// Redirect unauthenticated users trying to access protected routes to landing page
			throw redirect(302, '/landing')
		}
		return await resolve(event)
	}
)

export const handleError = Sentry.handleErrorWithSentry()
