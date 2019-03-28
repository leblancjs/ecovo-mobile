import { domain } from '../../app.json'
import { request, response, error, SearchUIAction } from '../actions'
import store from '../store'

const handleError = (err) => {
    store.dispatch(err)

    return Promise.reject(err)
}

const start = (accessToken, filters = {}) => {
    store.dispatch(request())

    const params = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filters })
    }

    return fetch(domain + '/search', params)
        .then(res => {
            return res.json().then(data => {
                return res.ok ?
                    Promise.resolve(data) :
                    Promise.reject(data)
            })
        })
        .then(res => {
            store.dispatch(SearchUIAction.start(res))
            store.dispatch(response())

            return Promise.resolve(res)
        })
        .catch(handleError)
}

const stop = (accessToken, searchId) => {
    store.dispatch(request())

    const params = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }

    return fetch(domain + '/search/' + searchId, params)
        .then(res => {
            return res.ok ?
                Promise.resolve() :
                res.json().then(data => Promise.reject(data))
        })
        .then(() => {
            store.dispatch(SearchUIAction.stop())
            store.dispatch(response())

            return Promise.resolve()
        })
        .catch(handleError)
}

export default SearchService = {
    start,
    stop
}