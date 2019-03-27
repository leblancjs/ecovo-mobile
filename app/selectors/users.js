import { createSelector } from 'reselect'

const usersEntitiesSelector = state => state.entities.users
const userUISelector = state => state.ui.profile
const authSelector = state => state.auth

const getUser = createSelector(
    [userUISelector, usersEntitiesSelector], (ui, userEntities) => {
        return userEntities.find(u => u.id === ui.userId)
    }
)

const getDriver = createSelector(
    [userUISelector, usersEntitiesSelector], (ui, userEntities) => {
        return userEntities.find(u => u.id === ui.driverId)
    }
)

const getUserConnected =  createSelector(
    [authSelector, usersEntitiesSelector], (auth, userEntities) => {
        return userEntities.find(u => u.id === auth.userId)
    }
)

export default UsersSelector = {
    getUser,
    getDriver,
    getUserConnected
}