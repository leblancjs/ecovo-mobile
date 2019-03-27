import { UsersEntitiesActionType } from '../../actions/'

const { ADD_USER, REMOVE_USER, UPDATE_USER } = UsersEntitiesActionType

const initialState = []

const users = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return [...state, {
                ...action.user,
                preferences: {
                    ...action.user.preferences
                }
            }]
        case REMOVE_USER:
            return state.filter(u => u.id !== action.userId)
        case UPDATE_USER:
            return state.map(u => {
                if (u.id === action.user.id) {
                    return {
                        ...action.user,
                        preferences: {
                            ...action.user.preferences
                        }
                    }
                } else {
                    return u
                }
            })
        default:
            return state
    }
}

export default users
