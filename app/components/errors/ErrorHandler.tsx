import React, { Component } from 'react'
import { View, Button } from 'react-native'
import { Dispatch, AnyAction } from 'redux'
import { connect } from 'react-redux'
import { NavigationActions, NavigationNavigateAction } from 'react-navigation'
import { Toast } from 'native-base'
import { Error } from '../../entities'
import { AppState } from '../../store'
import { ErrorService, AuthService } from '../../services'
import { ScreenNames } from '../../screens'

export interface ErrorHandlerProps {
    goToSignInScreen: () => NavigationNavigateAction
    goToErrorScreen: () => NavigationNavigateAction
}

export interface ErrorHandlerState {}

class ErrorHandler extends Component<ErrorHandlerProps, ErrorHandlerState> {
    private static toastDuration = 5000

    constructor(props: ErrorHandlerProps) {
        super(props)
    }

    componentDidMount() {
        ErrorService.register('errorHandler', this.onError)
    }

    componentWillUnmount() {
        ErrorService.unregister('errorHandler')
    }

    private onError = (error: Error) => {
        if (!error) {
            this.showToast(`Something went wrong, but we have no idea what it was.`)
            return
        }

        console.log(`Oh no! Something went wrong.`, error)
        
        switch (error.code) {
            case 400:
                // Bad Request
                this.showToast(`Looks like our servers didn't like what we sent them!\n\nThey said "${error.message}" or something.`)
                break
            case 401:
                // Unauthorized
                this.showToast(`Looks like your session's expired!\nLet's get you logged in.`)
                this.props.goToSignInScreen()
                break
            case 404:
                // Not Found
                this.showToast(`Hmm... we couldn't find what you were looking for.\nWhere did it go?`)
                break
            case 500:
                // Internal Server Error
                this.showToast(
                    `Oops! Something went wrong.\n\nPlease contact your system administrator.\n\nRequest ID:\n${error.requestId}`
                )
                break
            case 503:
                // Forbidden
                this.showToast(`You shall not pass.\nWhat you're trying to do is forbidden!\n\nOr our servers crashed...`)
                break
            default:
                // Unknown
                this.showToast(`Something went wrong, but we have no idea what it was.`)
                this.props.goToErrorScreen()
                break
        }
    }

    private showToast = (message: string, duration?: number) => {
        Toast.show({
            type: 'danger',
            text: message,
            buttonText: 'Close',
            buttonTextStyle: { fontWeight: 'bold' },
            position: 'bottom',
            duration: duration ? duration : 0,
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.props.children}
            </View>
        )
    }
}

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    goToSignInScreen: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.SignIn.HOME })),
    goToErrorScreen: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Errors.GENERIC })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler)