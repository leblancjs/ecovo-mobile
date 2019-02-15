import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR,
    USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_INFO_ERROR,
    PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_ERROR
} from '../actions/auth';

import {
    CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_ERROR,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR,
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR
} from '../actions/user'

const initialState = {
    isFetching: false,
    isLoggedIn: false,
    error: null,
    credentials: {
        accessToken: null,
        idToken: null,
        expiresIn: null,
        tokenType: null
    },
    userInfo: null,
    profile: null,
    user: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        preferences: {
            smoking: 0,
            music: 0,
            talking: 0
        }
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
        case USER_INFO_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case USER_INFO_SUCCESS:
            return {
                ...state,
                isFetching: false,
                userInfo: {
                    ...action.userInfo
                }
            };
        case USER_INFO_ERROR:
            return {
                ...state,
                isFetching: false,
                userInfo: null
            };
        case PROFILE_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case PROFILE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                profile: {
                    ...action.profile
                }
            };
        case PROFILE_ERROR:
            return {
                ...state,
                isFetching: false,
                profile: null,
                error: action.error
            };
        case CREATE_USER_REQUEST:
            return {
                ...initialState,
                isSudmitting: true
            };
        case CREATE_USER_SUCCESS:
            return {
                ...initialState,
                user: {
                    ...action.user
                }
            };
        case CREATE_USER_ERROR:
            return {
                ...initialState,
                error: action.error,
            };
        case UPDATE_USER_REQUEST:
            return {
                ...initialState,
                isSudmitting: true
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...initialState,
                user: {
                    ...action.user
                }
            };
        case UPDATE_USER_ERROR:
            return {
                ...initialState,
                error: action.error,
            };
        case GET_USER_REQUEST:
            return {
                ...initialState,
                isFetching: true
            };
        case GET_USER_SUCCESS:
            return {
                ...initialState,
                user: {
                    ...action.user
                }
            };
        case GET_USER_ERROR:
            return {
                ...initialState,
                error: action.error,
            };

        default:
            return state
    }
};

export default auth;
