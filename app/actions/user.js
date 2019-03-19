import { domain as fetchURL } from '../../app.json'

// Create user
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST'
const createUserRequest = () => ({
    type: CREATE_USER_REQUEST
})

export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
const createUserSuccess = (user) => ({
    type: CREATE_USER_SUCCESS,
    user: {
        ...user
    }
})

export const CREATE_USER_ERROR = 'CREATE_USER_ERROR'
const createUserError = (error) => ({
    type: CREATE_USER_ERROR,
    error: {
        ...error
    }
})

// Update user
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
const updateUserRequest = () => ({
    type: UPDATE_USER_REQUEST
})

export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
const updateUserSuccess = (user) => ({
    type: UPDATE_USER_SUCCESS,
    user: {
        ...user
    }
})

export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR'
const updateUserError = (error) => ({
    type: UPDATE_USER_ERROR,
    error: {
        ...error
    }
})

// Get current user info
export const GET_CURRENT_USER_INFO_REQUEST = 'GET_CURRENT_USER_INFO_REQUEST'
const getCurrentUserInfoRequest = () => ({
    type: GET_CURRENT_USER_INFO_REQUEST
})

export const GET_CURRENT_USER_INFO_SUCCESS = 'GET_CURRENT_USER_INFO_SUCCESS'
const getCurrentUserInfoSuccess = (user) => ({
    type: GET_CURRENT_USER_INFO_SUCCESS,
    user: {
        ...user
    }
})

export const GET_CURRENT_USER_INFO_ERROR = 'GET_CURRENT_USER_INFO_ERROR'
const getCurrentUserInfoError = (error) => ({
    type: GET_CURRENT_USER_INFO_ERROR,
    error: {
        ...error
    }
})

// Get user
export const GET_USER_REQUEST = 'GET_USER_REQUEST'
const getUserRequest = () => ({
    type: GET_USER_REQUEST
})

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
const getUserSuccess = (user) => ({
    type: GET_USER_SUCCESS,
    user: {
        ...user
    }
})

export const GET_USER_ERROR = 'GET_USER_ERROR'
const getUserError = (error) => ({
    type: GET_USER_ERROR,
    error: {
        ...error
    }
})

export const getCurrentUserInfo = (accessToken) => {
    return dispatch => {
        dispatch(getCurrentUserInfoRequest())

        return fetch(fetchURL + '/users/me', 
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        )
        .then(response => {
            return response.json().then(data => {
                return response.ok ?
                    Promise.resolve(data) :
                    Promise.reject(data)
            })
        })
        .then(response => {
            dispatch(getCurrentUserInfoSuccess(response))
            return Promise.resolve(response)
        })
        .catch(error => {
            dispatch(getCurrentUserInfoError(error))
            return Promise.reject(error)
        })
    }
}

export const getUserById = (accessToken, userId) => {
    return dispatch => {
        dispatch(getUserRequest())

        return fetch(fetchURL + '/users/' + userId, 
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => {
            return response.json().then(data => {
                return response.ok ?
                    Promise.resolve(data) :
                    Promise.reject(data)
            })
        })
        .then(user => {
            dispatch(getUserSuccess(user))
            return Promise.resolve(user)
        })
        .catch(error => { 
            dispatch(getUserError(error))
            return Promise.reject(error)
        })
    }
}

export const createUser = (accessToken, userData) => {
    return dispatch => {
        dispatch(createUserRequest())

        return fetch(fetchURL + '/users', 
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }
        )
        .then(response => {
            return response.json().then(data => {
                return response.ok ?
                    Promise.resolve(data) :
                    Promise.reject(data)
            })
        })
        .then(response => {
            dispatch(createUserSuccess(response))
            return Promise.resolve(response)
        }) 
        .catch(error => { 
            dispatch(createUserError(error))
            return Promise.reject(error)
        })
    }
}

export const updateUser = (accessToken, user) => {
    return dispatch => {
        dispatch(updateUserRequest())

        let payload = {
            ...user
        }
        delete payload['id']

        return fetch(fetchURL + '/users/' + user.id, 
            {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        )
        .then(response => {
            if (response.ok) {
                return Promise.resolve()
            } else {
                return response.json()
                    .then(data => Promise.reject(data))
            }
        })
        .then(() => {
            dispatch(updateUserSuccess(payload))
            return Promise.resolve(payload)
        }) 
        .catch(error => { 
            dispatch(updateUserError(error))
            return Promise.reject(error)
        })
    }
}

