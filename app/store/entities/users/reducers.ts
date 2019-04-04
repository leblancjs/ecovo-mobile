import {
    EntitiesUsersState,
    EntitiesUsersActionTypes,
    ADD_USER,
    UPDATE_USER,
    REMOVE_USER,
} from './types'

const initialState: EntitiesUsersState = []

export function usersReducer(state = initialState, action: EntitiesUsersActionTypes): EntitiesUsersState {
    switch (action.type) {
        case ADD_USER:
            return [
                ...state,
                {
                    ...action.user,
                    preferences: action.user.preferences ?
                        {
                            ...action.user.preferences
                        } :
                        undefined
                }
            ]
        case REMOVE_USER:
            return state.filter(u => u.id !== action.userId)
        case UPDATE_USER:
            return state.map(u => {
                if (u.id === action.user.id) {
                    return {
                        ...u,
                        ...action.user,
                        preferences: action.user.preferences ?
                            {
                                ...action.user.preferences
                            } :
                            undefined
                    }
                } else {
                    return u
                }
            })
        default:
            return state
    }
}