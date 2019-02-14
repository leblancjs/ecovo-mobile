import {
    UPDATE_FIRSTNAME,
    UPDATE_LASTNAME,
    UPDATE_BIRTHDATE,
    UPDATE_SEXE,
    FORM_FILLED
} from '../../actions/ui/signup';


const initialState = {
    user: {
        personnalInfo: {
            firstName: '',
            lastName: '',
            birthdate: undefined,
            sexe: 'male',
        },
        preferences: {
            smoking: 0,
            music: 0,
            talking: 0
        }
    },
    formFilled: false
};

const signup = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FIRSTNAME:
            return {
                ...state,
                user: {
                    ...state.user,
                    personnalInfo: {
                        ...state.user.personnalInfo,
                        firstName: action.firstName
                    }
                } 
            };
        case UPDATE_LASTNAME:
            return {
                ...state,
                user: {
                    ...state.user,
                    personnalInfo: {
                        ...state.user.personnalInfo,
                        lastName: action.lastName
                    }
                } 
            };
        case UPDATE_BIRTHDATE:
            return {
                ...state,
                user: {
                    ...state.user,
                    personnalInfo: {
                        ...state.user.personnalInfo,
                        birthdate: action.birthdate
                    }
                } 
            };
        case UPDATE_SEXE:
            return {
                ...state,
                user: {
                    ...state.user,
                    personnalInfo: {
                        ...state.user.personnalInfo,
                        sexe: action.sexe
                    }
                } 
            };
        case FORM_FILLED:
            return {
                ...state,
                formFilled: action.formFilled
            };
        default:
            return state
    }
};


export default signup
