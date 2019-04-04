import { createNavigationReducer } from 'react-navigation-redux-helpers'
import { AppNavigator } from '../../AppNavigator'

export const navigationReducer = createNavigationReducer(AppNavigator)