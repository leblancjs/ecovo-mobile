import { connect } from 'react-redux'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import {
    ScreenNames,
    BootstrapScreen,
    SignInScreen,
    AddPersonalInfoScreen,
    AddPreferencesScreen,
    GenericErrorScreen,
    CreateVehicleScreen,
} from './screens'

// TODO: Move these up there
import MapScreen from './screens/trips/MapScreen'
import UpdateProfileScreen from './screens/profile/UpdateProfileScreen'
import ProfileTabScreen from './screens/profile/ProfileTabScreen'
import TripResultsScreen from './screens/trips/TripResultsScreen'
import AddTripScreen from './screens/trips/AddTripScreen'
import DetailsTripTabScreen from './screens/trips/DetailsTripTabScreen'
import TripSearchScreen from './screens/trips/TripSearchScreen'

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
        screen: CreateVehicleScreen
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
    [ScreenNames.Trips.SEARCH]: TripSearchScreen,
    [ScreenNames.Vehicules.CREATE]: CreateVehicleScreen,
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
    (state: any) => state.navigation
)

const App = reduxifyNavigator(AppNavigator, 'root')

const mapStateToProps = (state) => ({
    state: state.navigation
})

const AppWithNavigationState = connect(mapStateToProps)(App)

export { AppNavigator, AppNavigatorMiddleware, AppWithNavigationState }