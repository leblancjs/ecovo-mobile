import { domain as fetchURL } from '../../app.json'
import { TripsEntitiesAction } from '../actions'
import { request, response, error } from '../actions/index'

const create = (accessToken, tripData) => {
    return dispatch => {
        dispatch(request())

        return fetch(fetchURL + '/trips',
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tripData)
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
                dispatch(TripsEntitiesAction.add(res))
                dispatch(response())
                return Promise.resolve(res)
            })
            .catch(err => {
                dispatch(error(err))
                return Promise.reject(err)
            })
    }
}

const remove = (accessToken, tripId) => {
    return dispatch => {
        dispatch(request())

        return fetch(fetchURL + '/trips/' + tripId,
            {
                method: 'DELETE',
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
                dispatch(TripsEntitiesAction.remove(tripId))
                dispatch(response())
                return Promise.resolve(res)
            })
            .catch(err => {
                dispatch(error(err))
                return Promise.reject(err)
            })
    }
}

export default TripService = {
    create,
    remove
}