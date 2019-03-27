import { AuthActionType } from '../actions'

const {LOGIN_SUCCESS, LOGOUT_SUCCESS, USER_CONNECTED} = AuthActionType

const initialState = {
    userId: null,
    isLoggedIn: false,
    credentials: {
        accessToken: null,
        idToken: null,
        expiresIn: null,
        tokenType: null
    }
}

const auth = (state = initialState, action) => {
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
            userId: action.userId
        }
        default:
            return state
    }
}

export default auth
