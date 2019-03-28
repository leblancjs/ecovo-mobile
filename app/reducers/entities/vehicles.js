import { VehiclesEntitiesActionType } from '../../actions'

const { ADD_VEHICLES, REMOVE_VEHICLE, UPDATE_VEHICLE } = VehiclesEntitiesActionType

const initialState = []

const vehicles = (state = initialState, action) => {
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

export default vehicles
