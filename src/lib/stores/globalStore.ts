import { writable } from 'svelte/store'

export const categories = writable<any[]>([])
export const userRole = writable<string | undefined>(undefined)
