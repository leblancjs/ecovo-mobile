import { Platform } from 'react-native'
import Auth0 from 'react-native-auth0'
import { Auth0Config } from '../config'
import { Promise } from 'core-js'
import store, { AuthActions, UIFetchingActions} from '../store'
import { Credentials } from '../entities'
import StorageService from './storage'

const auth0 = new Auth0(Auth0Config)

function handleError(error: any): Promise<any> {
    store.dispatch(UIFetchingActions.receiveErrorResponse(error))

    return Promise.reject(error)
}

function login(): Promise<Credentials> {
    store.dispatch(UIFetchingActions.sendRequest())

    const params = {
        scope: 'openid profile email',
        audience: `https://${Auth0Config.domain}/userinfo`,
        prompt: 'login'
    }

    return auth0.webAuth.authorize(params)
        .then((credentials: Credentials) => {
            return StorageService.setUserAuth(credentials)
                .then(() => {
                    store.dispatch(AuthActions.loginSuccess(credentials))
                    store.dispatch(UIFetchingActions.receiveResponse())

                    return Promise.resolve(credentials)
                })
                .catch(handleError)
        })
        .catch(handleError)
}

function logout(): Promise<void> {
    store.dispatch(UIFetchingActions.sendRequest())

    if (Platform.OS === 'ios') {
        return auth0.webAuth.clearSession()
            .then(() => {
                return StorageService.deleteUserAuth()
                    .then(() => {
                        store.dispatch(AuthActions.logoutSuccess())
                        store.dispatch(UIFetchingActions.receiveResponse())

                        return Promise.resolve()
                    })
                    .catch(handleError)
            })
            .catch(handleError)
    } else {
        return StorageService.deleteUserAuth()
            .then(() => {
                store.dispatch(AuthActions.logoutSuccess())
                store.dispatch(UIFetchingActions.receiveResponse())

                return Promise.resolve()
            })
            .catch(handleError)
    }
}

function getCredentials(): Credentials {
    // TODO: Refactor to use selector
    const state = store.getState()

    return { ...state.auth.credentials }
}

const AuthService = {
    login,
    logout,
    getCredentials,
}

export default AuthService