import {
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR
} from '../actions/user'

const initialState = {
    isFetching: false,
    error: null,
    user: {
        id: '',
        photo: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        preferences: {
            smoking: 0,
            music: 0,
            talking: 0
        },
        signUpPhase: '',
        userRating: 0,
        driverRating: 0
    }
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: {
                    ...action.user
                }
            }
        case GET_USER_ERROR:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state
    }
}

export default user
