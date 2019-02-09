import {
    SUBMIT_PERSONNAL_INFO_REQUEST, SUBMIT_PERSONNAL_INFO_SUCCESS, SUBMIT_PERSONNAL_INFO_ERROR
} from '../actions/user';

const initialState = {
    isSudmitting: false,
    error: null,
    personnalInfo: {
        picture: null,
        firstName: null,
        lastName: null,
        birthDate: null,
        sexe: null
    }
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_PERSONNAL_INFO_REQUEST:
            return {
                ...initialState,
                isSudmitting: true
            };
        case SUBMIT_PERSONNAL_INFO_SUCCESS:
            return {
                ...initialState,
                personnalInfo: {
                    ...action.personnalInfo
                }
            };
        case SUBMIT_PERSONNAL_INFO_ERROR:
            return {
                ...initialState,
                error: action.error,
            };
        default:
            return state
    }
};

export default auth;
