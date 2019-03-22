import { connect } from 'react-redux'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { ScreenNames } from './screens'
import BootstrapScreen from './screens/BootstrapScreen'
import SignInScreen from './screens/signin/SignInScreen'
import AddPersonalInfoScreen from './screens/signup/AddPersonalInfoScreen'
import AddPreferencesScreen from './screens/signup/AddPreferencesScreen'
import MapScreen from './screens/trips/MapScreen'
import GenericErrorScreen from './screens/error/GenericErrorScreen'
import CreateVehiculeScreen from './screens/vehicules/CreateVehiculeScreen'
import UpdateProfileScreen from './screens/profile/UpdateProfileScreen';
import ProfileTabScreen from './screens/profile/ProfileTabScreen';
import TripResultsScreen from './screens/trips/TripResultsScreen';
import AddTripScreen from './screens/trips/AddTripScreen';
import DetailsTripTabScreen from './screens/trips/DetailsTripTabScreen'

const SignInNavigator = createStackNavigator({
    [ScreenNames.SignIn.HOME]: {
        screen: SignInScreen
    }
}, {
    headerMode: 'none'
})

const SignUpNavigator = createStackNavigator({
    [ScreenNames.SignUp.PERSONAL_INFO]: {
        screen: AddPersonalInfoScreen
    },
    [ScreenNames.SignUp.PREFERENCES]: {
        screen: AddPreferencesScreen
    }
}, {
    initialRouteName: ScreenNames.SignUp.PERSONAL_INFO,
    headerMode: 'none'
})

const ProfileNavigator = createStackNavigator({
    [ScreenNames.Profile.HOME]: {
        screen: ProfileTabScreen
    },
    [ScreenNames.Profile.UPDATE]: {
        screen: UpdateProfileScreen
    },
    [ScreenNames.Vehicules.CREATE]: {
        screen: CreateVehiculeScreen
    }
}, {
    initialRouteName: ScreenNames.Profile.HOME,
    headerMode: 'none'
})

const TripsNavigator = createStackNavigator({
    [ScreenNames.Trips.MAP]: MapScreen,
    [ScreenNames.Trips.RESULTS]: TripResultsScreen,
    [ScreenNames.Trips.DETAILS]: DetailsTripTabScreen,
    [ScreenNames.Trips.ADD]: AddTripScreen,
}, {
    initialRouteName: ScreenNames.Trips.MAP,
    headerMode: 'none'
})

const ErrorNavigator = createStackNavigator({
    [ScreenNames.Errors.GENERIC]: {
        screen: GenericErrorScreen
    }
}, {
    headerMode: 'none'
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
