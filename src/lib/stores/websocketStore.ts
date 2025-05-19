import { WebSocketService, type WSEventMap, type StateUpdate } from '$lib/services/WebSocketService'
import { env } from '$env/dynamic/public'
import { writable, type Writable, get, derived } from 'svelte/store'
import { page } from '$app/state'

// Constants
const MAX_RECONNECT_ATTEMPTS = 3
const RECONNECT_DELAY = 1000 // ms

// Store definitions
export const wsService: Writable<WebSocketService | null> = writable(null)
export const wsConnected = writable(false)
export const unreadMessageCount = writable(0)
export const isReconnecting = writable(false)
export const reconnectAttempts = writable(0)

// Derived store for connection status with retry information
export const connectionStatus = derived(
	[wsConnected, isReconnecting, reconnectAttempts],
	([$wsConnected, $isReconnecting, $reconnectAttempts]) => ({
		connected: $wsConnected,
		reconnecting: $isReconnecting,
		attempts: $reconnectAttempts,
		maxAttempts: MAX_RECONNECT_ATTEMPTS
	})
)

// Event handlers using a more efficient Map structure
const eventHandlers = new Map<keyof WSEventMap, Set<(event: any) => void>>()

function handleStateUpdate(event: { state_update: StateUpdate }) {
	const { stateType, data } = event.state_update
	switch (stateType) {
		case 'unread_message_count':
			if (typeof data.unreadCount === 'number') {
				unreadMessageCount.set(data.unreadCount)
			}
			break
		case 'user_preferences':
			// Handle user preferences updates if needed
			break
		default:
			console.warn(`Unhandled state update type: ${stateType}`)
	}
}

async function attemptReconnect(wsInstance: WebSocketService) {
	const currentAttempts = get(reconnectAttempts)
	if (currentAttempts >= MAX_RECONNECT_ATTEMPTS) {
		isReconnecting.set(false)
		console.error('Max reconnection attempts reached')
		return
	}

	try {
		isReconnecting.set(true)
		await new Promise((resolve) => setTimeout(resolve, RECONNECT_DELAY))
		wsInstance.connect()
		reconnectAttempts.update((n) => n + 1)
	} catch (error) {
		console.error('Reconnection attempt failed:', error)
	}
}

export function initializeWebSocket() {
	const currentValue = get(wsService)
	if (currentValue) return

	try {
		const newWsService = new WebSocketService({
			url: env.PUBLIC_WEBSOCKET_URL + `/wsinit/connect/${page.data.user.userId}`,
			onConnect: () => {
				wsConnected.set(true)
				isReconnecting.set(false)
				reconnectAttempts.set(0)
			},
			onDisconnect: () => {
				wsConnected.set(false)
				const service = get(wsService)
				if (service) {
					attemptReconnect(service)
				}
			},
			onMessage: (event: WSEventMap[keyof WSEventMap]) => {
				try {
					const eventType = Object.keys(event)[0] as keyof WSEventMap
					if (eventType === 'state_update') {
						handleStateUpdate(event as { state_update: StateUpdate })
					}
					if (eventType in event) {
						// @ts-ignore - TypeScript limitation with discriminated unions
						emitEvent(eventType, event[eventType])
					}
				} catch (error) {
					console.error('Error processing message:', error)
				}
			}
		})

		wsService.set(newWsService)
		newWsService.connect()

		const cleanup = () => {
			const service = get(wsService)
			if (service) {
				service.disconnect()
			}
		}

		window.addEventListener('beforeunload', cleanup)
		return () => {
			window.removeEventListener('beforeunload', cleanup)
			cleanup()
		}
	} catch (error) {
		console.error('Failed to initialize WebSocket:', error)
		wsConnected.set(false)
	}
}

export function cleanupWebSocket() {
	try {
		const currentWsService = get(wsService)
		if (currentWsService) {
			currentWsService.disconnect()
			wsService.set(null)
			wsConnected.set(false)
			isReconnecting.set(false)
			reconnectAttempts.set(0)
			eventHandlers.clear()
		}
	} catch (error) {
		console.error('Error during WebSocket cleanup:', error)
	}
}

export function addEventListener<T extends keyof WSEventMap>(
	type: T,
	handler: (event: WSEventMap[T]) => void
) {
	if (!eventHandlers.has(type)) {
		eventHandlers.set(type, new Set())
	}
	eventHandlers.get(type)?.add(handler)
}

export function removeEventListener<T extends keyof WSEventMap>(
	type: T,
	handler: (event: WSEventMap[T]) => void
) {
	eventHandlers.get(type)?.delete(handler)
	if (eventHandlers.get(type)?.size === 0) {
		eventHandlers.delete(type)
	}
}

export function emitEvent<T extends keyof WSEventMap>(type: T, event: WSEventMap[T]) {
	eventHandlers.get(type)?.forEach((handler) => {
		try {
			handler(event)
		} catch (error) {
			console.error(`Error in event handler for ${String(type)}:`, error)
		}
	})
}

export function sendMessage<T extends keyof WSEventMap>(type: T, payload: WSEventMap[T]) {
	try {
		const service = get(wsService)
		if (!service) {
			console.warn('Attempted to send message without active WebSocket connection')
			return
		}
		service.sendMessage(type, payload)
	} catch (error) {
		console.error('Error sending message:', error)
	}
}
