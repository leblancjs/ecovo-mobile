import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR
} from '../actions/auth';

const initialState = {
    isFetching: false,
    isLoggedIn: false,
    error: null,
    credentials: {
        accessToken: null,
        idToken: null,
        expiresIn: null,
        tokenType: null
    }
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...initialState,
                isFetching: true
            };
        case LOGIN_SUCCESS:
            return {
                ...initialState,
                isLoggedIn: true,
                credentials: {
                    ...action.credentials
                }
            };
        case LOGIN_ERROR:
            return {
                ...initialState,
                error: action.error,
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case LOGOUT_SUCCESS:
            return {
                ...initialState
            };
        case LOGOUT_ERROR:
            return {
                ...initialState,
                error: action.error
            };
        default:
            return state
    }
};

export default auth;
