import { combineReducers } from 'redux'
import profile from './profile'
import search from './search'
import vehicles from './vehicles'

import { REQUEST, RESPONSE, ERROR } from '../../actions'

const isFetching = (state = false, action) => {
    switch (action.type) {
        case REQUEST:
            return true
        case RESPONSE:
            return false
        case ERROR:
            return false
        default:
            return state
    }
}

const error = (state = null, action) => {
    switch (action.type) {
        case ERROR:
            return action.error
        default:
            return state
    }
}

export default combineReducers({
    profile, search, vehicles, isFetching, error
})