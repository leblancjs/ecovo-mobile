import { NavigationActions } from 'react-navigation'
import { ScreenNames } from '../components/screens'
import { getUserAuth } from '../storage'
import { login, loginSuccess } from './auth'
import { getCurrentUserInfo } from './user'

const _redirect = (dispatch, accessToken) => {
    return dispatch(getCurrentUserInfo(accessToken))
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
    return dispatch(login())
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
    dispatch(loginSuccess(credentials))

    return _redirect(dispatch, credentials.accessToken)
}

export const bootstrap = () => {
    return dispatch => {
        return getUserAuth()
            .then(credentials => {
                if (!credentials) {
                    return _login(dispatch)
                } else {
                    return _restoreSession(dispatch, credentials)
                }
            })
    }
}