import { domain as fetchURL } from '../../app.json'
import { request, response, error, VehiclesEntitiesAction, VehiclesUIAction } from '../actions'
import store from '../store'

const handleError = (err) => {
    store.dispatch(error(err))

    return Promise.reject(err)
}

const getVehiculeById = (accessToken, userId, vehiculeId) => {
    store.dispatch(request())

    const params = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    }

    return fetch(fetchURL + '/users/' + userId + '/vehicules/' + vehiculeId, params)
        .then(res => {
            return res.json().then(data => {
                return res.ok ?
                    Promise.resolve(data) :
                    Promise.reject(data)
            })
        })
        .then(vehicule => {
            store.dispatch(VehiclesEntitiesAction.addList([vehicle]))
            store.dispatch(VehiclesUIAction.select(vehicule.id))
            store.dispatch(response())

            return Promise.resolve(vehicule)
        })
        .catch(handleError)
}

const getVehiclesByUserId = (accessToken, userId) => {
    store.dispatch(request())

    const params = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }

    return fetch(fetchURL + '/users/' + userId + '/vehicules', params)
        .then(res => {
            return res.json().then(data => {
                return res.ok ?
                    Promise.resolve(data) :
                    Promise.reject(data)
            })
        })
        .then(res => {
            store.dispatch(VehiclesEntitiesAction.addList(res))
            store.dispatch(response())

            return Promise.resolve(res)
        })
        .catch(handleError)
}

const create = (accessToken, userId, vehiculeData) => {
    store.dispatch(request())

    const params = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vehiculeData)
    }

    return fetch(fetchURL + '/users/' + userId + '/vehicules', params)
        .then(res => {
            return res.json().then(data => {
                return res.ok ?
                    Promise.resolve(data) :
                    Promise.reject(data)
            })
        })
        .then(vehicle => {
            store.dispatch(VehiclesEntitiesAction.addList([vehicle]))
            store.dispatch(response())

            return Promise.resolve(vehicle)
        })
        .catch(handleError)
}

const remove = (accessToken, userId, vehiculeId) => {
    store.dispatch(request())

    const params = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    }

    return fetch(fetchURL + '/users/' + userId + '/vehicules/' + vehiculeId, params)
        .then(res => {
            return res.ok ?
                Promise.resolve(vehiculeId) :
                Promise.reject(res)
        })
        .then(res => {
            store.dispatch(VehiclesEntitiesAction.remove(vehiculeId))
            store.dispatch(response())
            
            return Promise.resolve(res)
        })
        .catch(handleError)
}

export default VehicleService = {
    getVehiculeById,
    getVehiclesByUserId,
    create,
    remove
}