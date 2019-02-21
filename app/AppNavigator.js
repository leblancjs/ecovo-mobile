import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import WelcomeScreen from './components/welcome/WelcomeScreen';
import ProfileScreen from './components/profile/ProfileScreen';
import AddPersonnalInfoScreen from './components/signup/AddPersonnalInfoScreen';
import AddPreferencesScreen from './components/signup/AddPreferencesScreen';

const AppNavigator = createStackNavigator({
    Welcome: { screen: WelcomeScreen },
    AddPersonnalInfo: { screen: AddPersonnalInfoScreen },
    AddPreferences: { screen: AddPreferencesScreen },
    Profile: { screen: ProfileScreen }
}, {
    initialRouteName: 'Welcome',
    navigationOptions: {}
});

const AppNavigatorMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.navigation
);

const App = reduxifyNavigator(AppNavigator, 'root');

const mapStateToProps = state => ({
    state: state.navigation
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export { AppNavigator, AppNavigatorMiddleware, AppWithNavigationState };
