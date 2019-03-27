import { combineReducers } from 'redux'
import trips from './trips'
import users from './users'
import vehicles from './vehicles'

export default combineReducers({
    trips, users, vehicles
})