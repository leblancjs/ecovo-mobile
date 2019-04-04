import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { BootstrapRoutes } from './routes'
import BootstrapScreen from '../screens/BootstrapScreen'

const RootNavigator = createSwitchNavigator(
    {
        [BootstrapRoutes.Bootstrap]: {
            screen: BootstrapScreen,
            navigationOptions: {
                header: null,
            }
        }
    }, {
        initialRouteName: BootstrapRoutes.Bootstrap
    })

const AppContainer = createAppContainer(RootNavigator)

export default AppContainer