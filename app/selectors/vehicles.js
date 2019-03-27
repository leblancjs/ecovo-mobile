import { createSelector } from 'reselect'

const vehiclesEntitiesSelector = state => state.entities.vehicles
const vehiclesUISelector = state => state.ui.vehicles
const userUISelector = state => state.ui.profile

const getVehicle = createSelector(
    [vehiclesEntitiesSelector, vehiclesUISelector], (vehiclesEntities, ui) => {
        return vehiclesEntities.find(v => v.id === ui.vehicleId)
    }
)

const getVehiclesByUser = createSelector(
    [vehiclesEntitiesSelector, userUISelector], (vehiclesEntities, userUI) => {
        return vehiclesEntities.filter(v => v.userId === userUI.userId)
    }
)

export default VehiclesSelector = {
    getVehicle,
    getVehiclesByUser
}