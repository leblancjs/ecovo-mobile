import {
    AuthState,
    AuthActionTypes,
    LOGIN_SUCCESS,
    USER_CONNECTED,
    LOGOUT_SUCCESS,
} from './types'

const initialState: AuthState = {
    user: undefined,
    isLoggedIn: false,
    credentials: {
        accessToken: '',
        idToken: '',
        expiresIn: 0,
        tokenType: '',
    },
}

export function authReducer(state = initialState, action: AuthActionTypes): AuthState {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...initialState,
                isLoggedIn: true,
                credentials: {
                    ...action.credentials
                }
            }
        case LOGOUT_SUCCESS:
            return {
                ...initialState
            }
        case USER_CONNECTED:
        return {
            ...state,
            user: {
                ...state.user,
                ...action.user,
                preferences: action.user.preferences ?
                    {
                        ...action.user.preferences,
                    }:
                    undefined
            }
        }
        default:
            return state
    }
}