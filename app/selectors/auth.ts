import { createSelector } from 'reselect'
import { AppState } from '../store'

export const authSelector = (state: AppState) => state.auth

const getCredentials = createSelector(
    [authSelector], (auth) => auth.credentials
)

const getAccessToken = createSelector(
    [getCredentials], (credentials) => credentials.accessToken
)

const AuthSelectors = {
    getCredentials,
    getAccessToken,
}

export default AuthSelectors