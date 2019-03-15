import { domain } from '../../app.json'

export const START_SEARCH_REQUEST = 'START_SEARCH_REQUEST'
const startSearchRequest = () => ({
    type: START_SEARCH_REQUEST
})

export const START_SEARCH_SUCCESS = 'START_SEARCH_SUCCESS'
const startSearchSuccess = (search) => ({
    type: START_SEARCH_SUCCESS,
    search: {
        ...search
    }
})

export const START_SEARCH_ERROR = 'START_SEARCH_ERROR'
const startSearchError = (error) => ({
    type: START_SEARCH_ERROR,
    error: {
        ...error
    }
})

export const startSearch = (accessToken, filters = {}) => {
    return dispatch => {
        dispatch(startSearchRequest())

        return fetch(domain + '/search',
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filters)
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
                dispatch(startSearchSuccess(response))
                return Promise.resolve(response)
            })
            .catch(error => {
                dispatch(startSearchError(error))
                return Promise.reject(error)
            })
    }
}

export const STOP_SEARCH_REQUEST = 'STOP_SEARCH_REQUEST'
const stopSearchRequest = () => ({
    type: STOP_SEARCH_REQUEST
})

export const STOP_SEARCH_SUCCESS = 'STOP_SEARCH_SUCCESS'
const stopSearchSuccess = () => ({
    type: STOP_SEARCH_SUCCESS
})

export const STOP_SEARCH_ERROR = 'STOP_SEARCH_ERROR'
const stopSearchError = (error) => ({
    type: STOP_SEARCH_ERROR,
    error: {
        ...error
    }
})

export const stopSearch = (accessToken, searchId) => {
    return dispatch => {
        dispatch(stopSearchRequest())

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
                dispatch(stopSearchSuccess())
                return Promise.resolve()
            })
            .catch(error => {
                dispatch(stopSearchError(error))
                return Promise.reject(error)
            })
    }
}

export const ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT'
export const addSearchResult = (trip) => ({
    type: ADD_SEARCH_RESULT,
    trip: {
        ...trip
    }
})

export const REMOVE_SEARCH_RESULT = 'REMOVE_SEARCH_RESULT'
export const removeSearchResult = (tripId) => ({
    type: REMOVE_SEARCH_RESULT,
    tripId
})

export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS'
export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS
})