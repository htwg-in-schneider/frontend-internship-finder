import { defineStore } from 'pinia'

let nextId = 0

export const useToastStore = defineStore('toast', {
    state: () => ({
        toasts: [],
    }),
    actions: {
        show(message, type = 'success', timeout = 3000) {
            const id = nextId++
            this.toasts.push({ id, message, type })
            setTimeout(() => this.remove(id), timeout)
        },
        success(message, timeout = 3000) {
            this.show(message, 'success', timeout)
        },
        error(message, timeout = 4000) {
            this.show(message, 'danger', timeout)
        },
        remove(id) {
            this.toasts = this.toasts.filter(t => t.id !== id)
        }
    }
})
