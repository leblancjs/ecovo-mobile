import {
    UPDATE_FIRSTNAME,
    UPDATE_LASTNAME,
    UPDATE_DATE_OF_BIRTH,
    UPDATE_GENDER,
    UPDATE_CONVERSATION,
    UPDATE_MUSIC,
    UPDATE_SMOKING,
    FORM_FILLED
} from '../../actions/ui/signup';


const initialState = {
    user: {
        photo: '',
        firstName: '',
        lastName: '',
        dateOfBirth: undefined,
        gender: 'male',
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
                        firstName: action.firstName
                } 
            };
        case UPDATE_LASTNAME:
            return {
                ...state,
                user: {
                    ...state.user,
                        lastName: action.lastName
                }
            };
        case UPDATE_DATE_OF_BIRTH:
            return {
                ...state,
                user: {
                    ...state.user,
                        dateOfBirth: action.dateOfBirth
                } 
            };
        case UPDATE_GENDER:
            return {
                ...state,
                user: {
                    ...state.user,
                        gender: action.gender
                } 
            };
        case UPDATE_MUSIC:
            return {
                ...state,
                user: {
                    ...state.user,
                        preferences: {
                            ...state.user.preferences,
                                music: action.music
                        }
                } 
            };
        case UPDATE_CONVERSATION:
            return {
                ...state,
                user: {
                    ...state.user,
                        preferences: {
                            ...state.user.preferences,
                                conversation: action.conversation
                        }
                } 
            };
        case UPDATE_SMOKING:
            return {
                ...state,
                user: {
                    ...state.user,
                        preferences: {
                            ...state.user.preferences,
                                smoking: action.smoking
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
