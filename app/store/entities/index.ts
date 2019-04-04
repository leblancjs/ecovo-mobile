import { combineReducers } from 'redux'
import { usersReducer } from './users'
import { tripsReducer } from './trips'
import { vehiclesReducer } from './vehicles'

export const entitiesReducer = combineReducers({
    users: usersReducer,
    trips: tripsReducer,
    vehicles: vehiclesReducer,
})

export type EntitiesState = ReturnType<typeof entitiesReducer>

export * from './trips'
export * from './users'
export * from './vehicles'