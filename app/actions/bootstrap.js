import { NavigationActions } from 'react-navigation'
import { ScreenNames } from '../screens'
import { getUserAuth } from '../storage'
import { AuthAction } from './auth'
import { AuthService, UserService } from '../service'

const _redirect = (dispatch, accessToken) => {
    return UserService.getCurrentUser(accessToken)
        .then(user => {
            let screenName

            switch (user.signUpPhase) {
                case 'personalInfo':
                    screenName = ScreenNames.SignUp.PERSONAL_INFO
                    break
                case 'preferences':
                    screenName = ScreenNames.SignUp.PREFERENCES
                    break
                case 'done':
                    screenName = ScreenNames.Trips.HOME
                    break
                default:
                    screenName = ScreenNames.Errors.GENERIC
                    break
            }

            dispatch(NavigationActions.navigate({
                routeName: screenName
            }))

            dispatch(AuthAction.userConnected(user.id))

            return Promise.resolve()
        })
        .catch(error => {
            dispatch(NavigationActions.navigate({
                routeName: ScreenNames.Errors.GENERIC
            }))

            return Promise.reject(error)
        })
}

const _login = dispatch => {
    return AuthService.login()
        .then(credentials => {
            return _redirect(dispatch, credentials.accessToken)
        })
        .catch(error => {
            if (error.error === "a0.session.user_cancelled") {
                dispatch(NavigationActions.navigate({
                    routeName: ScreenNames.SignIn.HOME
                }))

                return Promise.resolve()
            } else {
                dispatch(NavigationActions.navigate({
                    routeName: ScreenNames.Errors.GENERIC
                }))

                return Promise.reject(error)
            }
        })
}

const _restoreSession = (dispatch, credentials) => {
    dispatch(AuthAction.loginSuccess(credentials))

    return _redirect(dispatch, credentials.accessToken)
}

export const bootstrap = () => {
    return dispatch => {
        return getUserAuth()
            .then(credentials => {
                if (!credentials) {
                    return _login(dispatch)
                } else {
                    return _restoreSession(dispatch, credentials).catch(error => {
                        if (error.code == 401 || error.message == "unauthorized"){
                            AuthService.logout().then(() => {
                                return _login(dispatch)
                            });
                        }
                    })
                }
            })
    }
}