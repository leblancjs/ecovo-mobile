import { AsyncStorage } from 'react-native'

const USER_AUTH_KEY_STORAGE = "ecovo_auth_key"

export const getUserAuth = () => {
    return AsyncStorage.getItem(USER_AUTH_KEY_STORAGE)
        .then(res => {
            if (res != null) {
                return {
                    "accessToken": res
                }
            } else {
                return null
            }
        })
        .catch(error => {
            return error
        })
}

export const setUserAuth = (accessToken) => {
    return AsyncStorage.setItem(USER_AUTH_KEY_STORAGE, accessToken)
}

export const deleteUserAuth = () => {
    return AsyncStorage.removeItem(USER_AUTH_KEY_STORAGE)
}