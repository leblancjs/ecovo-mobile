import { domain as domaineName, portNb as portNb } from '../../app.json';

const baseUrl = "http://" + domaineName + ":" + portNb;

// Create user
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
const createUserRequest = () => ({
    type: CREATE_USER_REQUEST
});

export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
const createUserSuccess = (user) => ({
    type: CREATE_USER_SUCCESS,
    user: {
        ...user
    }
});

export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';
const createUserError = (error) => ({
    type: CREATE_USER_ERROR,
    error: {
        ...error
    }
});

// Update user
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
const updateUserRequest = () => ({
    type: UPDATE_USER_REQUEST
});

export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
const updateUserSuccess = (user) => ({
    type: UPDATE_USER_SUCCESS,
    user: {
        ...user
    }
});

export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
const updateUserError = (error) => ({
    type: UPDATE_USER_ERROR,
    error: {
        ...error
    }
});

// Get user
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
const getUserRequest = () => ({
    type: GET_USER_REQUEST
});

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const getUserSuccess = (user) => ({
    type: GET_USER_SUCCESS,
    user: {
        ...user
    }
});

export const GET_USER_ERROR = 'GET_USER_ERROR';
const getUserError = (error) => ({
    type: GET_USER_ERROR,
    error: {
        ...error
    }
});

export const getUserById = (accessToken, userId) => {
    return dispatch => {
        dispatch(getUserRequest());

        return fetch(baseUrl + '/users/' + userId, 
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        ).then(user => dispatch(getUserSuccess(user)))
        .catch(error => { 
            dispatch(getUserError(error))
        });
    };
};


export const createUser = (accessToken, userData) => {
    return dispatch => {
        dispatch(createUserRequest());

        return fetch(baseUrl + '/users', 
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }
        ).then(response => response.json())
        .then(responseData => dispatch(createUserSuccess(responseData))) 
        .catch(error => { dispatch(createUserError(error))});
    };
};

export const updateUser = (accessToken, userId, userData) => {
    return dispatch => {
        dispatch(updateUserRequest());

        return fetch(baseUrl + '/users/' + userId, 
            {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }
        ).then(response => response.json())
        .then(responseData => dispatch(updateUserSuccess(responseData))) 
        .catch(error => { 
            dispatch(updateUserError(error))
        });
    };
};

