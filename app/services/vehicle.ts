import { Promise } from 'core-js'
import store, { EntitiesVehiclesActions, UIFetchingActions, UIVehicleActions } from '../store'
import Service from './service'
import { RESTRequestFactory } from './rest'
import { Vehicle } from '../entities'

export interface CreateVehicleRequest extends Vehicle {}

class VehicleService extends Service {
    private static instance?: VehicleService = undefined

    public static getInstance(): VehicleService {
        if (!VehicleService.instance) {
            VehicleService.instance = new VehicleService()
        }

        return VehicleService.instance
    }

    constructor() {
        super()
    }

    create(vehicle: CreateVehicleRequest): Promise<Vehicle> {
        store.dispatch(UIFetchingActions.sendRequest())
    
        return RESTRequestFactory.post(`users/${vehicle.userId}/vehicules`, vehicle).send()
            .then((vehicle: Vehicle) => {
                store.dispatch(EntitiesVehiclesActions.addVehicles([vehicle]))
                store.dispatch(UIFetchingActions.receiveResponse(vehicle))
    
                return Promise.resolve(vehicle)
            })
            .catch(this.handleError)
    }
    
    getVehicleById(userId: string, vehiculeId: string): Promise<Vehicle> {
        store.dispatch(UIFetchingActions.sendRequest())
    
        return RESTRequestFactory.get(`users/${userId}/vehicules/${vehiculeId}`).send()
            .then((vehicle: Vehicle) => {
                this.updateVehicle(vehicle)

                store.dispatch(UIVehicleActions.selectVehicle(vehicle.id || ''))
                store.dispatch(UIFetchingActions.receiveResponse(vehicle))
    
                return Promise.resolve(vehicle)
            })
            .catch(this.handleError)
    }
    
    getVehiclesByUserId(userId: string): Promise<Vehicle[]> {
        store.dispatch(UIFetchingActions.sendRequest())
    
        return RESTRequestFactory.get(`users/${userId}/vehicules`).send()
            .then((vehicles: Vehicle[]) => {
                vehicles.forEach(v => this.updateVehicle(v))

                store.dispatch(UIFetchingActions.receiveResponse(vehicles))
    
                return Promise.resolve(vehicles)
            })
            .catch(this.handleError)
    }
    
    delete(userId: string, vehicleId: string): Promise<void> {
        store.dispatch(UIFetchingActions.sendRequest())
    
        return RESTRequestFactory.delete(`users/${userId}/vehicules/${vehicleId}`).send()
            .then(() => {
                store.dispatch(EntitiesVehiclesActions.removeVehicle(vehicleId))
                store.dispatch(UIFetchingActions.receiveResponse())
    
                return Promise.resolve()
            })
            .catch(this.handleError)
    }

    private updateVehicle(vehicle: Vehicle) {
        const state = store.getState()

        const existingVehicle = state.entities.vehicles.find(v => v.id === vehicle.id)
        if (existingVehicle) {
            store.dispatch(EntitiesVehiclesActions.updateVehicle(vehicle))
        } else {
            store.dispatch(EntitiesVehiclesActions.addVehicles([vehicle]))
        }
    }
}

export default VehicleService.getInstance()