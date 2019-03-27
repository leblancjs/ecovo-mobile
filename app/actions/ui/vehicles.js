const SELECT_VEHICLE = 'SELECT_VEHICLE'

const select = (vehicleId) => ({
    type: SELECT_VEHICLE,
    vehicleId
})

export const VehiclesUIActionType = {
    SELECT_VEHICLE
}

export const VehiclesUIAction = {
    select
}