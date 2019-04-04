import { SELECT_VEHICLE } from './types'

export const selectVehicle = (vehicleId: string) => ({
    type: SELECT_VEHICLE,
    vehicleId,
})

export const UIVehicleActions = {
    selectVehicle,
}