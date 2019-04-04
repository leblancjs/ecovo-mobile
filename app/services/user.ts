import { Promise } from 'core-js'
import store, { AuthActions, EntitiesUsersActions, UIFetchingActions, UIProfileActions, updateUser } from '../store'
import Service from './service'
import { RESTRequestFactory } from './rest'
import { User, Preferences } from '../entities'

export interface CreateUserRequest extends User {}

export interface UpdateUserRequest {
    id: string
    firstName?: string
    lastName?: string
    dateOfBirth?: string | Date
    phoneNumber?: string
    gender?: string
    photo?: string
    description?: string
    preferences?: Preferences
    signUpPhase?: string
    userRating?: number
    driverRating?: number
}

class UserService extends Service {
    private static instance?: UserService = undefined

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService()
        }

        return UserService.instance
    }

    constructor() {
        super()
    }

    create(user: CreateUserRequest): Promise<User> {
        store.dispatch(UIFetchingActions.sendRequest())
    
        return RESTRequestFactory.post(`users`, user).send()
            .then((user: User) => {
                store.dispatch(EntitiesUsersActions.addUser(user))
                store.dispatch(UIProfileActions.selectUserProfile(user.id || ''))
                store.dispatch(AuthActions.userConnected(user))
                store.dispatch(UIFetchingActions.receiveResponse(user))
    
                return Promise.resolve(user)
            })
            .catch(this.handleError)
    }
    
    getCurrentUser(): Promise<User> {
        store.dispatch(UIFetchingActions.sendRequest())
    
        return RESTRequestFactory.get(`users/me`).send()
            .then((user: User) => {
                this.updateUser(user)

                store.dispatch(UIProfileActions.selectUserProfile(user.id || ''))
                store.dispatch(AuthActions.userConnected(user))
                store.dispatch(UIFetchingActions.receiveResponse(user))
    
                return Promise.resolve(user)
            })
            .catch(this.handleError)
    }
    
    getDriverById(driverId: string): Promise<User> {
        store.dispatch(UIFetchingActions.sendRequest())
    
        return RESTRequestFactory.get(`users/${driverId}`).send()
            .then((user: User) => {
                this.updateUser(user)

                store.dispatch(UIProfileActions.selectDriverProfile(user.id || ''))
                store.dispatch(UIFetchingActions.receiveResponse(user))
    
                return Promise.resolve(user)
            })
            .catch(this.handleError)
    }
    
    update(user: UpdateUserRequest): Promise<User> {
        store.dispatch(UIFetchingActions.sendRequest())
    
        return RESTRequestFactory.patch(`users/${user.id}`, user).send()
            .then(() => {
                store.dispatch(EntitiesUsersActions.updateUser(user))
                store.dispatch(AuthActions.userConnected(user))
                store.dispatch(UIFetchingActions.receiveResponse(user))
    
                return Promise.resolve(user)
            })
            .catch(this.handleError)
    }

    private updateUser(user: User) {
        const state = store.getState()

        const existingUser = state.entities.users.find(u => u.id === user.id)
        if (existingUser) {
            store.dispatch(EntitiesUsersActions.updateUser(user))
        } else {
            store.dispatch(EntitiesUsersActions.addUser(user))
        }
    }
}

export default UserService.getInstance()