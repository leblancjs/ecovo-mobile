import { User } from '../../../entities'

export type EntitiesUsersState = User[]

export const ADD_USER = 'ADD_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const REMOVE_USER = 'REMOVE_USER'

interface AddUserAction {
    type: typeof ADD_USER
    user: User
}

interface UpdateUserAction {
    type: typeof UPDATE_USER
    user: Partial<User>
}

interface RemoveUserAction {
    type: typeof REMOVE_USER
    userId: string
}

export type EntitiesUsersActionTypes = AddUserAction | UpdateUserAction | RemoveUserAction