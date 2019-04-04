import { Error } from '../entities'

export type ErrorListener = (error: Error) => void

class ErrorService {
    private static instance: ErrorService

    static getInstance(): ErrorService {
        if (!ErrorService.instance) {
            ErrorService.instance = new ErrorService()
        }

        return ErrorService.instance
    }

    private listeners: Map<string, ErrorListener>

    constructor() {
        this.listeners = new Map()
    }

    register(name: string, listener: ErrorListener) {
        this.listeners.set(name, listener)
    }

    unregister(name: string) {
        this.listeners.delete(name)
    }

    signal(error: Error) {
        this.listeners.forEach(listener => listener(error))
    }
}

export default ErrorService.getInstance()