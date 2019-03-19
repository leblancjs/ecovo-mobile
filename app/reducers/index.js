import { combineReducers } from 'redux'
import trip from './trip'
import navigation from './navigation'
import auth from './auth'
import vehicules from './vehicules'
import search from './search'
import user from './user'

export default combineReducers({
    auth,
    trip,
    navigation,
    vehicules,
    search,
    user
})
