import { ProfileUIActionType } from '../../actions'

const { SELECT_USER_PROFILE, SELECT_DRIVER_PROFILE } = ProfileUIActionType

const initialState = {
    userId: null,
    driverId: null
}

const profile = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_USER_PROFILE:
            return {
                ...state,
                userId: action.userId
            }
        case SELECT_DRIVER_PROFILE:
            return {
                ...state,
                driverId: action.userId
            }
        default:
            return state
    }
}

export default profile
