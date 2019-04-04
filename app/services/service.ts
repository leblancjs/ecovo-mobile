import ErrorService from './error'
import { Error } from '../entities'
import store, { UIFetchingActions } from '../store'

export default class Service {
    constructor() {}

    protected handleError(error: any): Promise<any> {
        const wrappedError: Error = {
            code: error ? error.code : -1,
            message: error ? error.message : `Something bad happened, but we don't know what.`,
            requestId: error ? error.requestId : `No tracking number either... great.`,
            error,
        }

        store.dispatch(UIFetchingActions.receiveErrorResponse(wrappedError))

        ErrorService.signal(wrappedError)
    
        return Promise.reject(error)
    }
}