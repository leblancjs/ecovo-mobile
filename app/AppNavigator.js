import { connect } from 'react-redux'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { ScreenNames } from './components/screens'
import BootstrapScreen from './components/screens/BootstrapScreen'
import SignInScreen from './components/screens/signin/SignInScreen'
import ProfileScreen from './components/screens/profile/ProfileScreen'
import AddPersonalInfoScreen from './components/screens/signup/AddPersonalInfoScreen'
import AddPreferencesScreen from './components/screens/signup/AddPreferencesScreen'
import MapScreen from './components/screens/trips/MapScreen'
import GenericErrorScreen from './components/screens/error/GenericErrorScreen';

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: '#2BB267'
    },
    headerTintColor: '#fff'
}

const SignInNavigator = createStackNavigator({
    [ScreenNames.SignIn.HOME]: {
        screen: SignInScreen,
        navigationOptions: {
            title: 'Sign In'
        }
    }
}, {
    defaultNavigationOptions
})

const SignUpNavigator = createStackNavigator({
    [ScreenNames.SignUp.PERSONAL_INFO]: {
        screen: AddPersonalInfoScreen,
        navigationOptions: {
            title: 'Create Your Profile'
        }
    },
    [ScreenNames.SignUp.PREFERENCES]: {
        screen: AddPreferencesScreen,
        navigationOptions: {
            title: 'Create Your Profile'
        }
    }
}, {
    defaultNavigationOptions,
    initialRouteName: ScreenNames.SignUp.PERSONAL_INFO
})

const ProfileNavigator = createStackNavigator({
    [ScreenNames.Profile.HOME]: {
        screen: ProfileScreen,
        navigationOptions: {
            title: 'Profile'
        }
    }
}, {
    initialRouteName: ScreenNames.Profile.HOME,
    defaultNavigationOptions
})

const TripsNavigator = createStackNavigator({
    [ScreenNames.Trips.MAP]: MapScreen
}, {
    headerMode: 'none',
    initialRouteName: ScreenNames.Trips.MAP
})

const ErrorNavigator = createStackNavigator({
    [ScreenNames.Errors.GENERIC]: {
        screen: GenericErrorScreen,
        navigationOptions: {
            title: 'Oops!'
        }
    }
}, {
    defaultNavigationOptions
})

const AppNavigator = createSwitchNavigator({
    [ScreenNames.BOOTSTRAP]: {
        screen: BootstrapScreen,
        navigationOptions: {
            header: null
        }
    },
    [ScreenNames.SignIn.HOME]: SignInNavigator,
    [ScreenNames.SignUp.HOME]: SignUpNavigator,
    [ScreenNames.Profile.HOME]: ProfileNavigator,
    [ScreenNames.Trips.HOME]: TripsNavigator,
    [ScreenNames.Errors.HOME]: ErrorNavigator
}, {
    initialRouteName: ScreenNames.BOOTSTRAP
})

const AppNavigatorMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.navigation
)

const App = reduxifyNavigator(AppNavigator, 'root')

const mapStateToProps = state => ({
    state: state.navigation
})

const AppWithNavigationState = connect(mapStateToProps)(App)

export { AppNavigator, AppNavigatorMiddleware, AppWithNavigationState }
