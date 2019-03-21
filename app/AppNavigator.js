import { connect } from 'react-redux'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { ScreenNames } from './components/screens'
import BootstrapScreen from './components/screens/BootstrapScreen'
import SignInScreen from './components/screens/signin/SignInScreen'
import AddPersonalInfoScreen from './components/screens/signup/AddPersonalInfoScreen'
import AddPreferencesScreen from './components/screens/signup/AddPreferencesScreen'
import MapScreen from './components/screens/trips/MapScreen'
import GenericErrorScreen from './components/screens/error/GenericErrorScreen'
import CreateVehiculeScreen from './components/screens/vehicules/CreateVehiculeScreen'
import UpdateProfileScreen from './components/screens/profile/UpdateProfileScreen';
import ProfileTabScreen from './components/screens/profile/ProfileTabScreen';
import TripResultsScreen from './components/screens/trips/TripResultsScreen';
import AddTripScreen from './components/screens/trips/AddTripScreen';
import DetailsTripTabScreen from './components/screens/trips/DetailsTripTabScreen'

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
