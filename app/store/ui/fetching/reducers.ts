import {
    UIFetchingState,
    UIFetchingActionTypes,
    SEND_REQUEST,
    RECEIVE_RESPONSE,
    RECEIVE_ERROR_RESPONSE,
} from './types'

const initialState: UIFetchingState = false

export function fetchingReducer(state = initialState, action: UIFetchingActionTypes): UIFetchingState {
    switch (action.type) {
        case SEND_REQUEST:
            return true
        case RECEIVE_RESPONSE:
            return false
        case RECEIVE_ERROR_RESPONSE:
            return false
        default:
            return state
    }
}