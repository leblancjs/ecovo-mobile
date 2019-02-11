import { Platform, AsyncStorage } from 'react-native';
import Auth0 from 'react-native-auth0';
import { NavigationActions } from 'react-navigation';
import { clientId, domain } from '../../auth0.config.json';

const USER_KEY_STORAGE = "ecovo_auth_key";

const auth0 = new Auth0({ domain, clientId });

// Login
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
const loginRequest = () => ({
    type: LOGIN_REQUEST
});

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const loginSuccess = (credentials) => ({
    type: LOGIN_SUCCESS,
    credentials: {
        ...credentials
    }
});

export const LOGIN_ERROR = 'LOGIN_ERROR';
const loginError = (error) => ({
    type: LOGIN_ERROR,
    error: {
        ...error
    }
});

export const login = () => {
    return dispatch => {
        AsyncStorage.getItem(USER_KEY_STORAGE)
            .then(res => {
                if (res != null) {
                    let credentials = {
                        "accessToken": res
                    };
                    dispatch(loginSuccess(credentials));
                    dispatch(NavigationActions.navigate({ routeName: 'Profile' }));
                } else {
                    dispatch(loginRequest());

                    params = {
                        scope: 'openid profile email',
                        audience: `https://${domain}/userinfo`,
                        prompt: 'login'
                    };
                    return auth0.webAuth.authorize(params)
                        .then(credentials => {
                            dispatch(loginSuccess(credentials));
                            AsyncStorage.setItem(USER_KEY_STORAGE, credentials.accessToken)
                            dispatch(NavigationActions.navigate({ routeName: 'Profile' }));
                        })
                        .catch(error => {
                            console.log("ERROR");
                            console.log(error);
                            dispatch(loginError(error));
                            dispatch(NavigationActions.navigate({ routeName: 'Welcome' }));
                        });
                }
            })
            .catch(error => {
                dispatch(loginError(error));
                dispatch(NavigationActions.navigate({ routeName: 'Welcome' }));
            });
    };
};

// Logout
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const logoutRequest = () => ({
    type: LOGOUT_REQUEST
});

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
});

export const LOGOUT_ERROR = 'LOGOUT_ERROR';
const logoutError = (error) => ({
    type: LOGOUT_ERROR,
    error: error
});

export const logout = () => {
    return dispatch => {
        dispatch(logoutRequest());
        AsyncStorage.removeItem(USER_KEY_STORAGE);

        return auth0.webAuth.clearSession({})
            .then(() => {
                dispatch(logoutSuccess());
                dispatch(NavigationActions.navigate({ routeName: 'Welcome' }));
            })
            .catch(error => {
                dispatch(logoutError(error));
                dispatch(NavigationActions.navigate({ routeName: 'Welcome' }));
            });
    };
}

// User Info
export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';
const userInfoRequest = () => ({
    type: USER_INFO_REQUEST
});

export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
const userInfoSuccess = (userInfo) => ({
    type: USER_INFO_SUCCESS,
    userInfo: {
        ...userInfo
    }
});

export const USER_INFO_ERROR = 'USER_INFO_ERROR';
const userInfoError = (error) => ({
    type: USER_INFO_ERROR,
    error: {
        ...error
    }
});

export const getUserInfo = (accessToken) => {
    return dispatch => {
        dispatch(userInfoRequest());

        return auth0.auth.userInfo({ token: accessToken })
            .then(userInfo => dispatch(userInfoSuccess(userInfo)))
            .catch(error => dispatch(userInfoError(error)));
    };
};

// Profile
export const PROFILE_REQUEST = 'PROFILE_REQUEST';
const profileRequest = () => ({
    type: PROFILE_REQUEST
});

export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
const profileSuccess = (profile) => ({
    type: PROFILE_SUCCESS,
    profile: {
        ...profile
    }
});

export const PROFILE_ERROR = 'PROFILE_ERROR';
const profileError = (error) => ({
    type: PROFILE_ERROR,
    error: {
        ...error
    }
});

export const getProfileById = (accessToken, userId) => {
    return dispatch => {
        dispatch(profileRequest());

        return auth0.users(accessToken)
            .getUser({ id: userId })
            .then(profile => dispatch(profileSuccess(profile)))
            .catch(error => dispatch(profileError(error)));
    };
};
