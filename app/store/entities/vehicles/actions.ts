import { ADD_VEHICLES, UPDATE_VEHICLE, REMOVE_VEHICLE } from './types'
import { Vehicle } from '../../../entities'

export const addVehicles = (vehicles: Vehicle[]) => ({
    type: ADD_VEHICLES,
    vehicles,
})

export const updateVehicle = (vehicle: Vehicle) => ({
    type: UPDATE_VEHICLE,
    vehicle,
})

export const removeVehicle = (vehicleId: string) => ({
    type: REMOVE_VEHICLE,
    vehicleId,
})

export const EntitiesVehiclesActions = {
    addVehicles,
    updateVehicle,
    removeVehicle,
}