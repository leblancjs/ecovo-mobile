const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const USER_CONNECTED = 'USER_CONNECTED'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

const loginSuccess = (credentials) => ({
    type: LOGIN_SUCCESS,
    credentials
})

const userConnected = (userId) => ({
    type: USER_CONNECTED,
    userId
})

const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
})

export const AuthActionType = {
    LOGIN_SUCCESS,
    USER_CONNECTED,
    LOGOUT_SUCCESS
}

export const AuthAction = {
    loginSuccess,
    userConnected,
    logoutSuccess
}