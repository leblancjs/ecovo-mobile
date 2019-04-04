import {
    UIProfileState,
    UIProfileActionTypes,
    SELECT_USER_PROFILE,
    SELECT_DRIVER_PROFILE,
} from './types'

const initialState: UIProfileState = {
    userId: '',
    driverId: '',
}

export function profileReducer(state = initialState, action: UIProfileActionTypes): UIProfileState {
    switch (action.type) {
        case SELECT_USER_PROFILE:
            return {
                ...state,
                userId: action.userId
            }
        case SELECT_DRIVER_PROFILE:
            return {
                ...state,
                driverId: action.driverId
            }
        default:
            return state
    }
}