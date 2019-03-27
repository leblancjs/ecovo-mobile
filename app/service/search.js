import { domain } from '../../app.json'
import { request, response, error, SearchUIAction } from '../actions'

const start = (accessToken, filters = {}) => {
    return dispatch => {
        dispatch(request())

        return fetch(domain + '/search',
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ filters })
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
                dispatch(SearchUIAction.start(res))
                dispatch(response())
                return Promise.resolve(res)
            })
            .catch(err => {
                dispatch(error(err))
                return Promise.reject(err)
            })
    }
}

const stop = (accessToken, searchId) => {
    return dispatch => {
        dispatch(request())

        return fetch(domain + '/search/' + searchId,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        )
            .then(response => {
                return response.ok ?
                    Promise.resolve() :
                    response.json().then(data => Promise.reject(data))
            })
            .then(() => {
                dispatch(SearchUIAction.stop())
                dispatch(response)
                return Promise.resolve()
            })
            .catch(err => {
                dispatch(error(err))
                return Promise.reject(err)
            })
    }
}

export default SearchService = {
    start,
    stop
}