import { createStackNavigator } from 'react-navigation'
import SignInScreen from '../../screens/signin'

export enum SignInRoutes {
    SignIn = 'SignIn'
}

const SignInNavigator = createStackNavigator(
    {
        [SignInRoutes.SignIn]: SignInScreen
    },
    {
        headerMode: 'none',
    })