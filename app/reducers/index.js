import { combineReducers } from 'redux'
import navigation from './navigation'
import auth from './auth'
import ui from './ui'
import entities from './entities'

export default combineReducers({
    auth,
    navigation,
    ui,
    entities
})
