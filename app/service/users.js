import { domain as fetchURL } from '../../app.json'
import { request, response, error, UsersEntitiesAction, ProfileUIAction, AuthAction } from '../actions'
import store from '../store'

const handleError = (err) => {
    store.dispatch(error(err))

    return Promise.reject(err)
}

const getCurrentUser = (accessToken) => {
    store.dispatch(request())

    const params = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }

    return fetch(fetchURL + '/users/me', params)
        .then(res => {
            return res.json().then(data => {
                return res.ok ?
                    Promise.resolve(data) :
                    Promise.reject(data)
            })
        })
        .then(res => {
            store.dispatch(UsersEntitiesAction.add(res))
            store.dispatch(ProfileUIAction.selectUser(res.id))
            store.dispatch(AuthAction.userConnected(res.id))
            store.dispatch(response())

            return Promise.resolve(res)
        })
        .catch(handleError)
}

const getDriverById = (accessToken, userId) => {
    store.dispatch(request())

    const params = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    }

    return fetch(fetchURL + '/users/' + userId, params)
        .then(res => {
            return res.json().then(data => {
                return res.ok ?
                    Promise.resolve(data) :
                    Promise.reject(data)
            })
        })
        .then(user => {
            store.dispatch(UsersEntitiesAction.add(user))
            store.dispatch(ProfileUIAction.selectDriver(user.id))
            store.dispatch(response())

            return Promise.resolve(user)
        })
        .catch(handleError)
}

const create = (accessToken, userData) => {
    store.dispatch(request())

    const params = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }

    return fetch(fetchURL + '/users', params)
        .then(res => {
            return res.json().then(data => {
                return res.ok ?
                    Promise.resolve(data) :
                    Promise.reject(data)
            })
        })
        .then(res => {
            store.dispatch(UsersEntitiesAction.add(res))
            store.dispatch(ProfileUIAction.selectUser(res.id))
            store.dispatch(response())

            return Promise.resolve(res)
        })
        .catch(handleError)
}

const update = (accessToken, user) => {
    store.dispatch(request())

    let payload = {
        ...user
    }
    delete payload['id']

    const params = {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }

    return fetch(fetchURL + '/users/' + user.id, params)
        .then(res => {
            if (res.ok) {
                return Promise.resolve()
            } else {
                return res.json()
                    .then(data => Promise.reject(data))
            }
        })
        .then(() => {
            store.dispatch(UsersEntitiesAction.update(user))
            store.dispatch(response())

            return Promise.resolve(payload)
        })
        .catch(handleError)
}

export default UserService = {
    getCurrentUser,
    getDriverById,
    create,
    update
}