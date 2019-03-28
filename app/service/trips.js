import { domain as fetchURL } from '../../app.json'
import { TripsEntitiesAction } from '../actions'
import { request, response, error } from '../actions/index'
import store from '../store'

const handleError = (err) => {
    store.dispatch(error(err))

    return Promise.reject(err)
}

const create = (accessToken, tripData) => {
    store.dispatch(request())

    const params = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tripData)
    }

    return fetch(fetchURL + '/trips', params)
        .then(res => {
            return res.json().then(data => {
                return res.ok ?
                    Promise.resolve(data) :
                    Promise.reject(data)
            })
        })
        .then(res => {
            store.dispatch(TripsEntitiesAction.add(res))
            store.dispatch(response())

            return Promise.resolve(res)
        })
        .catch(handleError)
}

const remove = (accessToken, tripId) => {
    store.dispatch(request())

    const params = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }

    return fetch(fetchURL + '/trips/' + tripId, params)
        .then(res => {
            return res.json().then(data => {
                return res.ok ?
                    Promise.resolve(data) :
                    Promise.reject(data)
            })
        })
        .then(res => {
            store.dispatch(TripsEntitiesAction.remove(tripId))
            store.dispatch(response())

            return Promise.resolve(res)
        })
        .catch(handleError)
}

export default TripService = {
    create,
    remove
}