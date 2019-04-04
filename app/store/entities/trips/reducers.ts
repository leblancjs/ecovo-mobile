import {
    EntitiesTripsState,
    EntitiesTripsActionTypes,
    ADD_TRIP,
    REMOVE_TRIP,
    UPDATE_TRIP,
} from './types'

const initialState: EntitiesTripsState = []

export function tripsReducer(state = initialState, action: EntitiesTripsActionTypes): EntitiesTripsState {
    switch (action.type) {
        case ADD_TRIP:
            return [
                ...state,
                {
                    ...action.trip,
                    vehicle: {
                        ...action.trip.vehicle,
                    },
                    stops: action.trip.stops.map(s => ({ ...s })),
                    details: {
                        ...action.trip.details
                    }
                }
            ]
        case REMOVE_TRIP:
            return state.filter(t => t.id !== action.tripId)
        case UPDATE_TRIP:
            return state.map(t => {
                if (t.id === action.trip.id) {
                    return {
                        ...action.trip,
                        stops: action.trip.stops.map(s => ({ ...s })),
                        details: {
                            ...action.trip.details
                        }
                    }
                } else {
                    return t
                }
            })
        default:
            return state
    }
}