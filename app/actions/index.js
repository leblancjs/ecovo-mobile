import * as BootstrapActions from './bootstrap'

import { AuthAction, AuthActionType } from './auth'

import { TripsEntitiesAction, TripsEntitiesActionType } from './entities/trips'
import { UsersEntitiesAction, UsersEntitiesActionType } from './entities/users'
import { VehiclesEntitiesAction, VehiclesEntitiesActionType } from './entities/vehicles'

import { ProfileUIAction, ProfileUIActionType } from './ui/profile'
import { SearchUIAction, SearchUIActionType } from './ui/search'
import { VehiclesUIAction, VehiclesUIActionType } from './ui/vehicles'

export {
    AuthAction,
    AuthActionType,
    BootstrapActions,
    TripsEntitiesAction,
    TripsEntitiesActionType,
    UsersEntitiesAction,
    UsersEntitiesActionType,
    VehiclesEntitiesAction,
    VehiclesEntitiesActionType,
    ProfileUIAction,
    ProfileUIActionType,
    SearchUIAction,
    SearchUIActionType,
    VehiclesUIAction,
    VehiclesUIActionType
}

export const REQUEST = 'REQUEST'
export const request = () => ({
    type: REQUEST
})

export const RESPONSE = 'RESPONSE'
export const response = () => ({
    type: RESPONSE
})

export const ERROR = 'ERROR'
export const error = (error) => ({
    type: ERROR,
    error
})