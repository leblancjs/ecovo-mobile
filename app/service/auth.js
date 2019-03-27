import { Platform } from 'react-native'
import Auth0 from 'react-native-auth0'
import { clientId, domain } from '../../auth0.config.json'
import { deleteUserAuth, setUserAuth } from '../storage'
import { request, response, error, AuthAction } from '../actions'
const auth0 = new Auth0({ domain, clientId })

const login = () => {
    return dispatch => {
        dispatch(request())

        params = {
            scope: 'openid profile email',
            audience: `https://${domain}/userinfo`,
            prompt: 'login'
        }
        return auth0.webAuth.authorize(params)
            .then(credentials => {
                setUserAuth(credentials.accessToken)

                dispatch(AuthAction.loginSuccess(credentials))
                dispatch(response)
                return Promise.resolve(credentials)
            })
            .catch(err => {
                dispatch(error(err))
                return Promise.reject(err)
            })
    }
}

export const logout = () => {
    return dispatch => {
        dispatch(request())

        if (Platform.OS === 'ios') {
            return auth0.webAuth.clearSession({})
                .then(() => {
                    deleteUserAuth()

                    dispatch(AuthAction.logoutSuccess())
                    dispatch(response)
                    return Promise.resolve()
                })
                .catch(err => {
                    dispatch(error(err))
                    return Promise.reject(err)
                })
        } else {
            deleteUserAuth()

            dispatch(AuthAction.logoutSuccess())
            dispatch(response)
            return Promise.resolve()
        }
    }
}

export default AuthService = {
    login,
    logout
}