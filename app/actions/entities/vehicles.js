const ADD_VEHICLES = 'ADD_VEHICLES'
const UPDATE_VEHICLE = 'UPDATE_VEHICLE'
const REMOVE_VEHICLE = 'REMOVE_VEHICLE'

const addList = (vehicles) => ({
    type: ADD_VEHICLES,
    vehicles
})

const update = (vehicle) => ({
    type: UPDATE_VEHICLE,
    vehicle
})

const remove = (vehicleId) => ({
    type: REMOVE_VEHICLE,
    vehicleId
})

export const VehiclesEntitiesActionType = {
    ADD_VEHICLES,
    UPDATE_VEHICLE,
    REMOVE_VEHICLE
}

export const VehiclesEntitiesAction = {
    addList,
    update,
    remove
}