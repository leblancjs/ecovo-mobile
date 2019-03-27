import { VehiclesUIActionType } from '../../actions'

const { SELECT_VEHICLE } = VehiclesUIActionType

const initialState = {
    vehicleId: null
}

const vehicles = (state = initialState, action) => {
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

export default vehicles
