import {
    UIErrorState,
    UIErrorActionTypes,
    DEQUEUE_ERROR,
} from './types'
import { RECEIVE_ERROR_RESPONSE } from '../fetching'

const initialState: UIErrorState = []

export function errorsReducer(state = initialState, action: UIErrorActionTypes): UIErrorState {
    switch (action.type) {
        case RECEIVE_ERROR_RESPONSE:
            return [ ...state, action.data ]
        case DEQUEUE_ERROR:
            return state.splice(0, 1)
        default:
            return state
    }
}