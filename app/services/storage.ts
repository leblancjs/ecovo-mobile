import { AsyncStorage } from 'react-native'
import { Credentials } from '../entities'
import { Promise } from 'core-js'

const USER_AUTH_KEY_STORAGE = 'ecovo_auth_key'

function getUserAuth(): Promise<Credentials | null> {
    return AsyncStorage.getItem(USER_AUTH_KEY_STORAGE)
        .then(result => {
            if (result != null) {
                return Promise.resolve({
                    'accessToken': result
                })
            } else {
                return Promise.resolve(null)
            }
        })
        .catch(error => {
            return error
        })
}

function setUserAuth(credentials: Credentials): Promise<void> {
    return AsyncStorage.setItem(USER_AUTH_KEY_STORAGE, credentials.accessToken)
}

function deleteUserAuth(): Promise<void> {
    return AsyncStorage.removeItem(USER_AUTH_KEY_STORAGE)
}

export default {
    getUserAuth,
    setUserAuth,
    deleteUserAuth,
}