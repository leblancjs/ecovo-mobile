import { ADD_TRIP, UPDATE_TRIP, REMOVE_TRIP } from './types'
import { Trip } from '../../../entities'

export const addTrip = (trip: Trip) => ({
    type: ADD_TRIP,
    trip,
})

export const updateTrip = (trip: Trip) => ({
    type: UPDATE_TRIP,
    trip,
})

export const removeTrip = (tripId: string) => ({
    type: REMOVE_TRIP,
    tripId,
})

export const EntitiesTripsActions = {
    addTrip,
    updateTrip,
    removeTrip,
}