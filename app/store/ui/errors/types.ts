import { UIFetchingActionTypes } from '../fetching'
import { Error } from '../../../entities'

export type UIErrorState = Error[]

export const DEQUEUE_ERROR = 'DEQUEUE_ERROR'

interface DequeueErrorAction {
    type: typeof DEQUEUE_ERROR
}

export type UIErrorActionTypes = UIFetchingActionTypes | DequeueErrorAction