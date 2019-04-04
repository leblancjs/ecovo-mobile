import { createSelector } from 'reselect'
import { authSelector } from './auth'
import { AppState } from '../store'

export const entitiesUsersSelector = (state: AppState) => state.entities.users
export const uiProfileSelector = (state: AppState) => state.ui.profile

const getUser = createSelector(
    [uiProfileSelector, entitiesUsersSelector], (profile, users) =>
        users.find(u => u.id === profile.userId)
)

const getDriver = createSelector(
    [uiProfileSelector, entitiesUsersSelector], (profile, users) =>
        users.find(u => u.id === profile.driverId)
)

const getUserConnected =  createSelector(
    [authSelector], (auth) => auth.user
)

const UserSelectors = {
    getUser,
    getDriver,
    getUserConnected,
}

export default UserSelectors