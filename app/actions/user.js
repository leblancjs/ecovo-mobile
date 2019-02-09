import Auth0 from 'react-native-auth0';
import { clientId, domain } from '../../auth0.config.json';

const auth0 = new Auth0({ domain, clientId });

// Personnal Info
export const SUBMIT_PERSONNAL_INFO_REQUEST = 'SUBMIT_PERSONNAL_INFO_REQUEST';
const submitPersonnalInfoRequest = () => ({
    type: SUBMIT_PERSONNAL_INFO_REQUEST
});

export const SUBMIT_PERSONNAL_INFO_SUCCESS = 'SUBMIT_PERSONNAL_INFO_SUCCESS';
const submitPersonnalInfoSuccess = (params) => ({
    type: SUBMIT_PERSONNAL_INFO_SUCCESS,
    personnalInfo: {
        ...personnalInfo
    }
});

export const SUBMIT_PERSONNAL_INFO_ERROR = 'SUBMIT_PERSONNAL_INFO_ERROR';
const submitPersonnalInfoError = (error) => ({
    type: SUBMIT_PERSONNAL_INFO_ERROR,
    error: {
        ...error
    }
});

export const submitPersonnalInfo = (accessToken, personnalInfo) => {
    return dispatch => {
        dispatch(submitPersonnalInfoRequest());

        return auth0.auth.submitPersonnalInfo({ token: accessToken })
            .then(personnalInfo => dispatch(submitPersonnalInfoSuccess(personnalInfo)))
            .catch(error => dispatch(submitPersonnalInfoError(error)));
    };
};
