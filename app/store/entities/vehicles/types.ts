import { Vehicle } from '../../../entities'

export type EntitiesVehiclesState = Vehicle[]

export const ADD_VEHICLES = 'ADD_VEHICLES'
export const UPDATE_VEHICLE = 'UPDATE_VEHICLE'
export const REMOVE_VEHICLE = 'REMOVE_VEHICLE'

interface AddVehiclesAction {
    type: typeof ADD_VEHICLES
    vehicles: Vehicle[]
}

interface UpdateVehicleAction {
    type: typeof UPDATE_VEHICLE
    vehicle: Vehicle
}

interface RemoveVehicleAction {
    type: typeof REMOVE_VEHICLE
    vehicleId: string
}

export type EntitiesVehiclesActionTypes = AddVehiclesAction | UpdateVehicleAction | RemoveVehicleAction