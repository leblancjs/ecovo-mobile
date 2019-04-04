import { combineReducers } from 'redux'
import { fetchingReducer } from './fetching'
import { errorsReducer } from './errors'
import { profileReducer } from './profile'
import { searchReducer } from './search'
import { vehicleReducer } from './vehicle'

export const uiReducer = combineReducers({
    isFetching: fetchingReducer,
    errors: errorsReducer,
    profile: profileReducer,
    search: searchReducer,
    vehicle: vehicleReducer,
})

export type UIState = ReturnType<typeof uiReducer>

export * from './errors'
export * from './fetching'
export * from './profile'
export * from './search'
export * from './vehicle'