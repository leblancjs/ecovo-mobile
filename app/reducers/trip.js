import {
    GET_TRIP_REQUEST, GET_TRIP_SUCCESS, GET_TRIP_ERROR,
    CREATE_TRIP_REQUEST, CREATE_TRIP_SUCCESS, CREATE_TRIP_ERROR,
    DELETE_TRIP_REQUEST, DELETE_TRIP_SUCCESS, DELETE_TRIP_ERROR,
    GET_TRIP_LIST_REQUEST, GET_TRIP_LIST_SUCCESS, GET_TRIP_LIST_ERROR
} from '../actions/trip'

const initialState = {
    isFetching: false,
    isSubmitting: false,
    error: null,
    trip: {
        source: '',
        destination: '',
        leaveAt: '',
        arriveBy: '',
        driverId: '',
        vehicleId: '',
        seats: 1,
        stops: [],
        details: {
            animals: 0,
            luggages: 0,
        },
    },
    trips: []
}

const trip = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRIP_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case GET_TRIP_SUCCESS:
            return {
                ...state,
                trip: {
                    ...action.trip
                }
            }
        case GET_TRIP_ERROR:
            return {
                ...state,
                error: action.error,
            }
        case CREATE_TRIP_REQUEST:
            return {
                ...state,
                isSubmitting: true
            }
        case CREATE_TRIP_SUCCESS:
            return {
                ...state,
                isSubmitting: false,
                trip: {
                    ...action.trip
                }
            }
        case CREATE_TRIP_ERROR:
            return {
                ...initialState,
                isSubmitting: false,
                error: action.error
            }
        case DELETE_TRIP_REQUEST:
            return {
                ...state,
                isSubmitting: true
            }
        case DELETE_TRIP_SUCCESS:
            return {
                ...state,
                isSubmitting: false
            }
        case DELETE_TRIP_ERROR:
            return {
                ...state,
                isSubmitting: false,
                error: action.error,
            }
        case GET_TRIP_LIST_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case GET_TRIP_LIST_SUCCESS:
            return {
                ...state,
                trips: action.trips
            }
        case GET_TRIP_LIST_ERROR:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state
    }
}

export default trip
