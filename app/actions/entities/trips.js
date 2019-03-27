const ADD_TRIP = 'ADD_TRIP'
const UPDATE_TRIP = 'UPDATE_TRIP'
const REMOVE_TRIP = 'REMOVE_TRIP'

const add = (trip) => ({
    type: ADD_TRIP,
    trip
})

const update = (trip) => ({
    type: UPDATE_TRIP,
    trip
})

const remove = (tripId) => ({
    type: REMOVE_TRIP,
    tripId
})

export const TripsEntitiesActionType = {
    ADD_TRIP,
    UPDATE_TRIP,
    REMOVE_TRIP
}

export const TripsEntitiesAction = {
    add,
    update,
    remove
}