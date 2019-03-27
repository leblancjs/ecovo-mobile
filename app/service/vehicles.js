import { domain as fetchURL } from '../../app.json'
import { request, response, error, VehiclesEntitiesAction, VehiclesUIAction } from '../actions'

const getVehiculeById = (accessToken, userId, vehiculeId) => {
    return dispatch => {
        dispatch(request())

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
                let list = []
                list.push(vehicule)
                dispatch(VehiclesEntitiesAction.addList(list))
                dispatch(VehiclesUIAction.select(vehicule.id))
                dispatch(response())
                return Promise.resolve(vehicule)
            })
            .catch(err => {
                dispatch(error(err))
                return Promise.reject(err)
            })
    }
}

const getVehiclesByUserId = (accessToken, userId) => {
    return dispatch => {
        dispatch(request())

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
            .then(res => {
                dispatch(VehiclesEntitiesAction.addList(res))
                dispatch(response())
                return Promise.resolve(res)
            })
            .catch(err => {
                dispatch(error(err))
                return Promise.reject(err)
            })
    }
}

const create = (accessToken, userId, vehiculeData) => {
    return dispatch => {
        dispatch(request())

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
            .then(res => {
                let list = []
                list.push(res)
                dispatch(VehiclesEntitiesAction.addList(list))
                dispatch(response())
                return Promise.resolve(res)
            })
            .catch(err => {
                dispatch(error(err))
                return Promise.reject(err)
            })
    }
}

const remove = (accessToken, userId, vehiculeId) => {
    return dispatch => {
        dispatch(request())

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
            .then(res => {
                dispatch(VehiclesEntitiesAction.remove(vehiculeId))
                dispatch(response())
                return Promise.resolve(res)
            })
            .catch(err => {
                dispatch(error(err))
                return Promise.reject(err)
            })
    }
}

export default VehicleService = {
    getVehiculeById,
    getVehiclesByUserId,
    create,
    remove
}