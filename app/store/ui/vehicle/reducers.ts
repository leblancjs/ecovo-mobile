import {
    UIVehicleState,
    UIVehicleActionTypes,
    SELECT_VEHICLE,
} from './types'

const initialState: UIVehicleState = {
    vehicleId: '',
}

export function vehicleReducer(state = initialState, action: UIVehicleActionTypes): UIVehicleState {
    switch (action.type) {
        case SELECT_VEHICLE:
            return {
                ...state,
                vehicleId: action.vehicleId
            }
        default:
            return state
    }
}