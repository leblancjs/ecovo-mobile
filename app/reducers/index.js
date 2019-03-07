import { combineReducers } from 'redux'
import auth from './auth'
import navigation from './navigation'
import vehicules from './vehicules'

export default combineReducers({
    auth,
    navigation,
    vehicules
})
