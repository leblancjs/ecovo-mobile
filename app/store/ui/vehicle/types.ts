export interface UIVehicleState {
    vehicleId: string
}

export const SELECT_VEHICLE = 'SELECT_VEHICLE'

interface SelectVehicleAction {
    type: typeof SELECT_VEHICLE
    vehicleId: string
}

export type UIVehicleActionTypes = SelectVehicleAction