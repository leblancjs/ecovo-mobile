const ADD_USER = 'ADD_USER'
const UPDATE_USER = 'UPDATE_USER'
const REMOVE_USER = 'REMOVE_USER'

const add = (user) => ({
    type: ADD_USER,
    user
})

const update = (user) => ({
    type: UPDATE_USER,
    user
})

const remove = (userId) => ({
    type: REMOVE_USER,
    userId
})

export const UsersEntitiesActionType = {
    ADD_USER,
    UPDATE_USER,
    REMOVE_USER
}

export const UsersEntitiesAction = {
    add,
    update,
    remove
}