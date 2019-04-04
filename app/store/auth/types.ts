import { Credentials, User } from '../../entities'

export interface AuthState {
    user?: User
    isLoggedIn: boolean
    credentials: Credentials
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const USER_CONNECTED = 'USER_CONNECTED'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS
    credentials: Credentials
}

interface UserConnectedAction {
    type: typeof USER_CONNECTED
    user: Partial<User>
}

interface LogoutSuccessAction {
    type: typeof LOGOUT_SUCCESS
}

export type AuthActionTypes = LoginSuccessAction | UserConnectedAction | LogoutSuccessAction