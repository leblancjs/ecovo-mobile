import {
    EntitiesVehiclesState,
    EntitiesVehiclesActionTypes,
    ADD_VEHICLES,
    UPDATE_VEHICLE,
    REMOVE_VEHICLE,
} from './types'

const initialState: EntitiesVehiclesState = []

export function vehiclesReducer(state = initialState, action: EntitiesVehiclesActionTypes): EntitiesVehiclesState {
    switch (action.type) {
        case ADD_VEHICLES:
            return state.concat(action.vehicles.map(v => ({ ...v })))
        case REMOVE_VEHICLE:
            return state.filter(v => v.id !== action.vehicleId)
        case UPDATE_VEHICLE:
            return state.map(v => {
                if (v.id === action.vehicle.id) {
                    return {
                        ...v,
                        ...action.vehicle
                    }
                } else {
                    return v
                }
            })
        default:
            return state
    }
}