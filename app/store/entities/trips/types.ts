import { Trip } from '../../../entities'

export type EntitiesTripsState = Trip[]

export const ADD_TRIP = 'ADD_TRIP'
export const UPDATE_TRIP = 'UPDATE_TRIP'
export const REMOVE_TRIP = 'REMOVE_TRIP'

interface AddTripAction {
    type: typeof ADD_TRIP
    trip: Trip
}

interface UpdateTripAction {
    type: typeof UPDATE_TRIP
    trip: Trip
}

interface RemoveTripAction {
    type: typeof REMOVE_TRIP
    tripId: string
}

export type EntitiesTripsActionTypes = AddTripAction | UpdateTripAction | RemoveTripAction