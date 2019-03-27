import { createSelector } from 'reselect'

const authSelector = state => state.auth

const getAccessToken = createSelector(
    [authSelector], (auth) => {
        return auth.credentials.accessToken
    }
)

export default AuthSelector = {
    getAccessToken
}