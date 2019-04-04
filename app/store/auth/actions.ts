import { LOGIN_SUCCESS, USER_CONNECTED, LOGOUT_SUCCESS } from './types'
import { Credentials, User } from '../../entities'

export const loginSuccess = (credentials: Credentials) => ({
    type: LOGIN_SUCCESS,
    credentials,
})

export const userConnected = (user: Partial<User>) => ({
    type: USER_CONNECTED,
    user,
})

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
})

export const AuthActions = {
    loginSuccess,
    userConnected,
    logoutSuccess,
}