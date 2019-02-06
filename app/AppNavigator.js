import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import WelcomeScreen from './components/welcome/WelcomeScreen';
import AuthScreen from './components/auth/AuthScreen';

const AppNavigator = createStackNavigator({
    Main: { screen: WelcomeScreen },
    Auth: { screen: AuthScreen }
}, {
    initialRouteName: 'Main',
    navigationOptions: {
        header: null,
        gesturesEnabled: false
    }
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
