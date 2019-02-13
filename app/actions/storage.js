import { loginRequest, loginSuccess, loginError } from './auth';
import { AsyncStorage } from 'react-native';

const USER_AUTH_KEY_STORAGE = "ecovo_auth_key";

export const getUserAuth = () => {
    return dispatch => {
        dispatch(loginRequest());
        AsyncStorage.getItem(USER_AUTH_KEY_STORAGE)
            .then(res => {
                if (res != null) {
                    let credentials = {
                        "accessToken": res
                    };
                    dispatch(loginSuccess(credentials));
                }else {
                    throw "Not user storaged";
                }
            })
            .catch(error => {
                dispatch(loginError(error));
                throw "Not user storaged";
            });
    }
}

export const setUserAuth = (accessToken) => {
    AsyncStorage.setItem(USER_AUTH_KEY_STORAGE, accessToken)
}

export const deleteUserAuth = () => {
    AsyncStorage.removeItem(USER_AUTH_KEY_STORAGE);
}