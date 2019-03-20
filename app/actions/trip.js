import { domain as fetchURL } from '../../app.json'

// Create trip
export const CREATE_TRIP_REQUEST = 'CREATE_TRIP_REQUEST'
const createTripRequest = () => ({
    type: CREATE_TRIP_REQUEST
})

export const CREATE_TRIP_SUCCESS = 'CREATE_TRIP_SUCCESS'
export const createTripSuccess = (trip) => ({
    type: CREATE_TRIP_SUCCESS,
    trip: {
        ...trip
    }
})

export const CREATE_TRIP_ERROR = 'CREATE_TRIP_ERROR'
const createTripError = (error) => ({
    type: CREATE_TRIP_ERROR,
    error: {
        ...error
    }
})

// Get trip
export const GET_TRIP_REQUEST = 'GET_TRIP_REQUEST'
const getTripRequest = () => ({
    type: GET_TRIP_REQUEST
})

export const GET_TRIP_SUCCESS = 'GET_TRIP_SUCCESS'
const getTripSuccess = (trip) => ({
    type: GET_TRIP_SUCCESS,
    trip: {
        ...trip
    }
})

export const GET_TRIP_ERROR = 'GET_TRIP_ERROR'
const getTripError = (error) => ({
    type: GET_TRIP_ERROR,
    error: {
        ...error
    }
})

// Delete trip
export const DELETE_TRIP_REQUEST = 'DELETE_TRIP_REQUEST'
const deleteTripRequest = () => ({
    type: DELETE_TRIP_REQUEST
})

export const DELETE_TRIP_SUCCESS = 'DELETE_TRIP_SUCCESS'
const deleteTripSuccess = (trip) => ({
    type: DELETE_TRIP_SUCCESS,
    trip: {
        ...trip
    }
})

export const DELETE_TRIP_ERROR = 'DELETE_TRIP_ERROR'
const deleteTripError = (error) => ({
    type: DELETE_TRIP_ERROR,
    error: {
        ...error
    }
})

export const getTripById = (accessToken, tripId) => {
    return dispatch => {
        dispatch(getTripRequest())

        return fetch(fetchURL + '/trips/' + tripId, 
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => {
            return response.json().then(data => {
                return response.ok ?
                    Promise.resolve(data) :
                    Promise.reject(data)
            })
        })
        .then(trip => {
            dispatch(getTripSuccess(trip))
            return Promise.resolve(trip)
        })
        .catch(error => { 
            dispatch(getTripError(error))
            return Promise.reject(error)
        })
    }
}

export const createTrip = (accessToken, tripData) => {
    return dispatch => {
        dispatch(createTripRequest())

        console.log("DATA : " + JSON.stringify(tripData))

        return fetch(fetchURL + '/trips', 
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tripData)
            }
        )
        .then(response => {
            return response.json().then(data => {
                return response.ok ?
                    Promise.resolve(data) :
                    Promise.reject(data)
            })
        })
        .then(response => {
            dispatch(createTripSuccess(response))
            return Promise.resolve(response)
        }) 
        .catch(error => { 
            dispatch(createTripError(error))
            return Promise.reject(error)
        })
    }
}

export const deleteTrip = (accessToken, tripId) => {
    return dispatch => {
        dispatch(deleteTripRequest())

        return fetch(fetchURL + '/trips/' + tripId, 
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        )
        .then(response => {
            return response.json().then(data => {
                return response.ok ?
                    Promise.resolve(data) :
                    Promise.reject(data)
            })
        })
        .then(response => {
            dispatch(deleteTripSuccess(response))
            return Promise.resolve(response)
        }) 
        .catch(error => { 
            dispatch(deleteTripError(error))
            return Promise.reject(error)
        })
    }
}