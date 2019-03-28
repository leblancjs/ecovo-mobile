import { Platform } from 'react-native'
import Auth0 from 'react-native-auth0'
import { clientId, domain } from '../../auth0.config.json'
import { deleteUserAuth, setUserAuth } from '../storage'
import { request, response, error, AuthAction } from '../actions'
import store from '../store'

const auth0 = new Auth0({ domain, clientId })

const handleError = (err) => {
    store.dispatch(error(err))

    return Promise.reject(err)
}

const login = () => {
    store.dispatch(request())

    params = {
        scope: 'openid profile email',
        audience: `https://${domain}/userinfo`,
        prompt: 'login'
    }

    return auth0.webAuth.authorize(params)
        .then(credentials => {
            return setUserAuth(credentials.accessToken)
                .then(() => {
                    store.dispatch(AuthAction.loginSuccess(credentials))
                    store.dispatch(response())

                    return Promise.resolve(credentials)
                })
                .catch(handleError)
        })
        .catch(handleError)
}

export const logout = () => {
    store.dispatch(request())

    if (Platform.OS === 'ios') {
        return auth0.webAuth.clearSession({})
            .then(() => {
                return deleteUserAuth()
                    .then(() => {
                        store.dispatch(AuthAction.logoutSuccess())
                        store.dispatch(response())

                        return Promise.resolve()
                    })
                    .catch(handleError)
            })
            .catch(handleError)
    } else {
        return deleteUserAuth()
            .then(() => {
                store.dispatch(AuthAction.logoutSuccess())
                store.dispatch(response())

                return Promise.resolve()
            })
            .catch(handleError)
    }
}

export default AuthService = {
    login,
    logout
}