import { TripsEntitiesActionType } from '../../actions'
const { ADD_TRIP, REMOVE_TRIP, UPDATE_TRIP } = TripsEntitiesActionType

const initialState = []

const trips = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TRIP:
            return [...state, {
                ...action.trip,
                stops: action.trip.stops.map(s => ({ ...s })),
                details: { ...action.trip.details }
            }]
        case REMOVE_TRIP:
            return state.filter(t => t.id !== action.tripId)
        case UPDATE_TRIP:
            return state.map(t => {
                if (t.id === action.trip.id) {
                    return {
                        ...t,
                        ...action.trip,
                        stops: action.trip.stops.map(s => ({ ...s })),
                        details: { ...action.trip.details }
                    }
                } else {
                    return t
                }
            })
        default:
            return state
    }
}

export default trips
