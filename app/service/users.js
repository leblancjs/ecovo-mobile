import { domain as fetchURL } from '../../app.json'
import { request, response, error, UsersEntitiesAction, ProfileUIAction, AuthAction } from '../actions'

const getCurrentUser = (accessToken) => {
    return dispatch => {
        dispatch(request())

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
            .then(res => {
                dispatch(UsersEntitiesAction.add(res))
                dispatch(ProfileUIAction.selectUser(res.id))
                dispatch(AuthAction.userConnected(res.id))
                dispatch(response())
                return Promise.resolve(res)
            })
            .catch(err => {
                dispatch(error(err))
                return Promise.reject(err)
            })
    }
}

const getDriverById = (accessToken, userId) => {
    return dispatch => {
        dispatch(request())

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
                dispatch(UsersEntitiesAction.add(user))
                dispatch(ProfileUIAction.selectDriver(user.id))
                dispatch(response())
                return Promise.resolve(user)
            })
            .catch(err => {
                dispatch(error(err))
                return Promise.reject(err)
            })
    }
}

const create = (accessToken, userData) => {
    return dispatch => {
        dispatch(request())

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
            .then(res => {
                dispatch(UsersEntitiesAction.add(res))
                dispatch(ProfileUIAction.selectUser(res.id))
                dispatch(response())
                return Promise.resolve(res)
            })
            .catch(err => {
                dispatch(error(err))
                return Promise.reject(err)
            })
    }
}

const update = (accessToken, user) => {
    return dispatch => {
        dispatch(request())

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
                dispatch(UsersEntitiesAction.update(user))
                dispatch(response)
                return Promise.resolve(payload)
            })
            .catch(err => {
                dispatch(error(err))
                return Promise.reject(err)
            })
    }
}

export default UserService = {
    getCurrentUser,
    getDriverById,
    create,
    update
}