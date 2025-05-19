export interface ChatMessage {
	_id?: number
	message: string
	userId: number
	displayName: string
	avatar: string
	createdAt: string
	isDeleted: boolean
	optimisticId?: string
	status?: 'pending' | 'delivered' | 'failed'
}

export type StateUpdateUnreadCount = {
	stateType: 'unread_message_count'
	data: {
		unreadCount: number
	}
}

export type StateUpdateUserPreferences = {
	stateType: 'user_preferences'
	data: {
		theme: 'light' | 'dark'
		notifications: boolean
	}
}

// Add more state update types here as needed
export type StateUpdate = StateUpdateUnreadCount | StateUpdateUserPreferences

export type WSEventMap = {
	init: {
		userId: number
		displayName: string
	}
	state_update: StateUpdate
	join_chat: {
		userId: number
		displayName: string
	}
	leave_chat: {
		userId: number
	}
	send_message: {
		message: string
	}
	delete_message: {
		messageId: number
	}
	load_messages: {
		beforeMessageId?: number
	}
	new_message: {
		message: ChatMessage
	}
	message_deleted: {
		messageId: number
	}
	messages_loaded: {
		messages: ChatMessage[]
		hasMore: boolean
		beforeMessageId?: number
	}
	error: {
		error: string
	}
}

export interface WebSocketConfig {
	url: string
	onMessage?: (event: WSEventMap[keyof WSEventMap]) => void
	onConnect?: () => void
	onDisconnect?: () => void
	onError?: (error: Event) => void
}

export class WebSocketService {
	private socket: WebSocket | null = null
	private config: WebSocketConfig
	private reconnectAttempts = 0
	private maxReconnectAttempts = 5
	private reconnectTimeout = 1000

	constructor(config: WebSocketConfig) {
		this.config = config
	}

	connect(): void {
		if (this.socket?.readyState === WebSocket.OPEN) {
			return
		}

		this.socket = new WebSocket(this.config.url)

		this.socket.addEventListener('open', () => {
			this.reconnectAttempts = 0
			this.reconnectTimeout = 1000
			this.config.onConnect?.()
		})

		this.socket.addEventListener('message', (event) => {
			try {
				const message = JSON.parse(event.data) as WSEventMap[keyof WSEventMap]
				this.config.onMessage?.(message)
			} catch (error) {
				console.error('Failed to parse WebSocket message:', error)
			}
		})

		this.socket.addEventListener('close', () => {
			this.config.onDisconnect?.()
			this.handleReconnect()
		})

		this.socket.addEventListener('error', (error) => {
			this.config.onError?.(error)
		})
	}

	private handleReconnect(): void {
		if (this.reconnectAttempts < this.maxReconnectAttempts) {
			this.reconnectAttempts++
			const timeout = Math.min(
				this.reconnectTimeout * Math.pow(2, this.reconnectAttempts - 1),
				30000
			)

			setTimeout(() => {
				this.connect()
			}, timeout)
		}
	}

	sendMessage<T extends keyof WSEventMap>(type: T, payload: WSEventMap[T]): void {
		if (this.socket?.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify({ type, ...payload }))
		} else {
			console.warn('WebSocket is not connected. Message not sent:', { type, payload })
		}
	}

	disconnect(): void {
		this.socket?.close()
		this.socket = null
	}

	isConnected(): boolean {
		return this.socket?.readyState === WebSocket.OPEN
	}
}
