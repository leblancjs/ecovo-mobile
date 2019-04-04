import { NavigationActions } from 'react-navigation'
import StorageService from './storage'
import AuthService from './auth'
import UserService from './user'
import ErrorService from './error'
import store from '../store'
import { AuthActions } from '../store/auth'
import { Credentials, User } from '../entities'
import { Promise } from 'core-js'

function handleError(error: any): Promise<any> {
    const wrappedError = {
        code: error.code,
        message: error.message,
        requestId: error.requestId,
        error,
    }

    // store.dispatch(NavigationActions.navigate({
    //     routeName: 'genericError'
    // }))

    return Promise.reject(wrappedError)
}

function redirect(): Promise<any> {
    return UserService.getCurrentUser()
        .then((user: User) => {
            let screenName: string = ''

            switch (user.signUpPhase) {
                case 'personalInfo':
                    screenName = 'personalInfo'
                    break
                case 'preferences':
                    screenName = 'preferences'
                    break
                case 'done':
                    screenName = 'trips'
                    break
                default:
                    screenName = 'genericError'
                    break
            }

            store.dispatch(NavigationActions.navigate({
                routeName: screenName
            }))

            store.dispatch(AuthActions.userConnected(user))

            return Promise.resolve()
        })
        .catch(handleError)
}

function login(): Promise<any> {
    return AuthService.login()
        .then((credentials: Credentials) => redirect())
        .catch((error: any) => {
            if (error.error === "a0.session.user_cancelled") {
                store.dispatch(NavigationActions.navigate({
                    routeName: 'signIn'
                }))

                return Promise.resolve()
            } else {
                return handleError(error)
            }
        })
}

function restoreSession(credentials: Credentials): Promise<any> {
    store.dispatch(AuthActions.loginSuccess(credentials))

    return redirect()
}

function bootstrap(): Promise<any> {
    return StorageService.getUserAuth()
        .then(credentials => {
            if (!credentials) {
                return login()
            } else {
                return restoreSession(credentials)
                    .catch((error: any) => {
                        if (error.code == 401 || error.message == "unauthorized"){
                            return AuthService.logout().then(() => {
                                return login()
                            })
                        } else {
                            return handleError(error)
                        }
                    })
            }
        })
}

const BootstrapService = {
    bootstrap,
}

export default BootstrapService