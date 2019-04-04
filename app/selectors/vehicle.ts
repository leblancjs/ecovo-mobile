import { createSelector } from 'reselect'
import { uiProfileSelector } from './user'
import { AppState } from '../store'

export const entitiesVehiclesSelector = (state: AppState) => state.entities.vehicles
export const uiVehicle = (state: AppState) => state.ui.vehicle

const getVehicle = createSelector(
    [entitiesVehiclesSelector, uiVehicle], (vehicles, vehicle) =>
        vehicles.find(v => v.id === vehicle.vehicleId)
)

const getVehiclesByUser = createSelector(
    [entitiesVehiclesSelector, uiProfileSelector], (vehicles, profile) =>
        vehicles.filter(v => v.userId === profile.userId)
)

const VehicleSelectors = {
    getVehicle,
    getVehiclesByUser,
}

export default VehicleSelectors