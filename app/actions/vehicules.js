import { domain as fetchURL } from '../../app.json'

// Get vehicule
export const GET_VEHICULE_REQUEST = 'GET_VEHICULE_REQUEST'
const getVehiculeRequest = () => ({
    type: GET_VEHICULE_REQUEST
})

export const GET_VEHICULE_SUCCESS = 'GET_VEHICULE_SUCCESS'
const getVehiculeSuccess = (vehicule) => ({
    type: GET_VEHICULE_SUCCESS,
    vehicule: {
        ...vehicule
    }
})

export const GET_VEHICULE_ERROR = 'GET_VEHICULE_ERROR'
const getVehiculeError = (error) => ({
    type: GET_VEHICULE_ERROR,
    error: {
        ...error
    }
})

export const getVehiculeById = (accessToken, userId, vehiculeId) => {
    return dispatch => {
        dispatch(getVehiculeRequest())

        return fetch(fetchURL + '/users/' + userId + '/vehicules/' + vehiculeId,
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
            .then(vehicule => {
                dispatch(getVehiculeSuccess(vehicule))
                return Promise.resolve(vehicule)
            })
            .catch(error => {
                dispatch(getVehiculeError(error))
                return Promise.reject(error)
            })
    }
}

// Get vehicule list
export const GET_VEHICULE_LIST_REQUEST = 'GET_VEHICULE_LIST_REQUEST'
const getVehiculeListRequest = () => ({
    type: GET_VEHICULE_LIST_REQUEST
})

export const GET_VEHICULE_LIST_SUCCESS = 'GET_VEHICULE_LIST_SUCCESS'
const getVehiculeListSuccess = (vehicules) => ({
    type: GET_VEHICULE_LIST_SUCCESS,
    vehicules: {
        ...vehicules
    }
})

export const GET_VEHICULE_LIST_ERROR = 'GET_VEHICULE_LIST_ERROR'
const getVehiculeListError = (error) => ({
    type: GET_VEHICULE_LIST_ERROR,
    error: {
        ...error
    }
})

export const getVehiculeList = (accessToken, userId) => {
    return dispatch => {
        dispatch(getVehiculeListRequest())

        return fetch(fetchURL + '/users/' + userId + '/vehicules',
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
                dispatch(getVehiculeListSuccess(response))
                return Promise.resolve(response)
            })
            .catch(error => {
                dispatch(getVehiculeListError(error))
                return Promise.reject(error)
            })
    }
}

// Create vehicule
export const CREATE_VEHICULE_REQUEST = 'CREATE_VEHICULE_REQUEST'
const createVehiculeRequest = () => ({
    type: CREATE_VEHICULE_REQUEST
})

export const CREATE_VEHICULE_SUCCESS = 'CREATE_VEHICULE_SUCCESS'
const createVehiculeSuccess = (vehicule) => ({
    type: CREATE_VEHICULE_SUCCESS,
    vehicule: {
        ...vehicule
    }
})

export const CREATE_VEHICULE_ERROR = 'CREATE_VEHICULE_ERROR'
const createVehiculeError = (error) => ({
    type: CREATE_VEHICULE_ERROR,
    error: {
        ...error
    }
})

export const createVehicule = (accessToken, userId, vehiculeData) => {
    return dispatch => {
        dispatch(createVehiculeRequest())

        return fetch(fetchURL + '/users/' + userId + '/vehicules',
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(vehiculeData)
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
                dispatch(createVehiculeSuccess(response))
                return Promise.resolve(response)
            })
            .catch(error => {
                dispatch(createVehiculeError(error))
                return Promise.reject(error)
            })
    }
}

// Delete vehicule
export const DELETE_VEHICULE_REQUEST = 'DELETE_VEHICULE_REQUEST'
const deleteVehiculeRequest = () => ({
    type: DELETE_VEHICULE_REQUEST
})

export const DELETE_VEHICULE_SUCCESS = 'DELETE_VEHICULE_SUCCESS'
const deleteVehiculeSuccess = (vehiculeId) => ({
    type: DELETE_VEHICULE_SUCCESS,
    vehiculeId: vehiculeId
})

export const DELETE_VEHICULE_ERROR = 'DELETE_VEHICULE_ERROR'
const deleteVehiculeError = (error) => ({
    type: DELETE_VEHICULE_ERROR,
    error: {
        ...error
    }
})

export const deleteVehicule = (accessToken, userId, vehiculeId) => {
    return dispatch => {
        dispatch(deleteVehiculeRequest())

        return fetch(fetchURL + '/users/' + userId + '/vehicules/' + vehiculeId,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => {
                return response.ok ?
                    Promise.resolve(vehiculeId) :
                    Promise.reject(response)
            })
            .then(response => {
                dispatch(deleteVehiculeSuccess(response))
                return Promise.resolve(response)
            })
            .catch(error => {
                dispatch(deleteVehiculeError(error))
                return Promise.reject(error)
            })
    }
}