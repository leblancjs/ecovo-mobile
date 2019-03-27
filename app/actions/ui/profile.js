const SELECT_USER_PROFILE = 'SELECT_USER_PROFILE'
const SELECT_DRIVER_PROFILE = 'SELECT_DRIVER_PROFILE'

const selectUser = (userId) => ({
    type: SELECT_USER_PROFILE,
    userId
})

const selectDriver = (userId) => ({
    type: SELECT_DRIVER_PROFILE,
    userId
})

export const ProfileUIActionType = {
    SELECT_USER_PROFILE,
    SELECT_DRIVER_PROFILE
}

export const ProfileUIAction = {
    selectUser,
    selectDriver
}