import {
    CREATE_VEHICULE_ERROR, CREATE_VEHICULE_REQUEST, CREATE_VEHICULE_SUCCESS,
    DELETE_VEHICULE_ERROR, DELETE_VEHICULE_REQUEST, DELETE_VEHICULE_SUCCESS,
    GET_VEHICULE_ERROR, GET_VEHICULE_REQUEST, GET_VEHICULE_SUCCESS,
    GET_VEHICULE_LIST_ERROR, GET_VEHICULE_LIST_REQUEST, GET_VEHICULE_LIST_SUCCESS
} from '../../actions/vehicules'

const initialState = {
    isFetching: false,
    isSubmitting: false,
    error: null,
    vehicules: [],
    vehicule: {
        id: '',
        userId: '',
        year: '',
        make: '',
        model: '',
        color: '',
        photo: '',
        accessories: []
    }
}

const vehicules = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_VEHICULE_REQUEST:
            return {
                ...state,
                isSubmitting: true
            }
        case CREATE_VEHICULE_SUCCESS:
            return {
                ...state,
                isSubmitting: false,
                vehicule: {
                    ...action.vehicule
                },
                vehicules: state.vehicules.concat(action.vehicule)
            }
        case CREATE_VEHICULE_ERROR:
            return {
                ...state,
                isSubmitting: false,
                error: action.error,
            }
        case GET_VEHICULE_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case GET_VEHICULE_SUCCESS:
            return {
                ...state,
                vehicule: {
                    ...action.vehicule
                }
            }
        case GET_VEHICULE_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error,
            }
        case GET_VEHICULE_LIST_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case GET_VEHICULE_LIST_SUCCESS:
            return {
                ...state,
                vehicules: Object.values(action.vehicules)
            }
        case GET_VEHICULE_LIST_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error,
            }
        case DELETE_VEHICULE_REQUEST:
            return {
                ...state,
                isSubmitting: true
            }
        case DELETE_VEHICULE_SUCCESS:
            return {
                ...initialState,
                vehicules: state.vehicules.filter(v => v.id !== action.vehiculeId)
            }
        case DELETE_VEHICULE_ERROR:
            return {
                ...state,
                isSubmitting: false,
                error: action.error,
            }
        default:
            return state
    }
}

export default vehicules
