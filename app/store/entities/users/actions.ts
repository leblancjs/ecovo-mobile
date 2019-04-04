import { ADD_USER, UPDATE_USER, REMOVE_USER } from './types'
import { User } from '../../../entities'

export const addUser = (user: User) => ({
    type: ADD_USER,
    user,
})

export const updateUser = (user: Partial<User>) => ({
    type: UPDATE_USER,
    user,
})

export const removeUser = (userId: string) => ({
    type: REMOVE_USER,
    userId,
})

export const EntitiesUsersActions = {
    addUser,
    updateUser,
    removeUser,
}