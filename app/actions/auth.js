import { Platform } from 'react-native'
import Auth0 from 'react-native-auth0'
import { clientId, domain } from '../../auth0.config.json'
import { deleteUserAuth, setUserAuth } from '../storage'

const auth0 = new Auth0({ domain, clientId })

// Login
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const loginRequest = () => ({
    type: LOGIN_REQUEST
})

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const loginSuccess = (credentials) => ({
    type: LOGIN_SUCCESS,
    credentials: {
        ...credentials
    }
})

export const LOGIN_ERROR = 'LOGIN_ERROR'
export const loginError = (error) => ({
    type: LOGIN_ERROR,
    error: {
        ...error
    }
})

export const login = () => {
    return dispatch => {
        dispatch(loginRequest())

        params = {
            scope: 'openid profile email',
            audience: `https://${domain}/userinfo`,
            prompt: 'login'
        }
        return auth0.webAuth.authorize(params)
            .then(credentials => {
                setUserAuth(credentials.accessToken)
                
                dispatch(loginSuccess(credentials))
                return Promise.resolve(credentials)
            })
            .catch(error => {
                dispatch(loginError(error))
                return Promise.reject(error)
            })
    }
}

// Logout
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
const logoutRequest = () => ({
    type: LOGOUT_REQUEST
})

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
})

export const LOGOUT_ERROR = 'LOGOUT_ERROR'
const logoutError = (error) => ({
    type: LOGOUT_ERROR,
    error: error
})

export const logout = () => {
    return dispatch => {
        dispatch(logoutRequest())

        if (Platform.OS === 'ios') {
            return auth0.webAuth.clearSession({})
                .then(() => {
                    deleteUserAuth()

                    dispatch(logoutSuccess())
                    return Promise.resolve()
                })
                .catch(error => {
                    dispatch(logoutError(error))
                    return Promise.reject(error)
                })
        } else {
            deleteUserAuth()

            dispatch(logoutSuccess())
            return Promise.resolve()
        }
    }
}