import { Promise } from 'core-js'
import store, { EntitiesTripsActions, UIFetchingActions } from '../store'
import Service from './service'
import { PubSubService, Message } from './pubsub'
import { RESTRequestFactory } from './rest'
import { Trip, Point, Details, Reservation } from '../entities'

export interface CreateTripRequestStop {
    point: Point
}

export interface CreateTripRequest {
    driverId: string
    vehicle: {
        year: number
        make: string
        model: string
    }
    leaveAt?: string
    arriveBy?: string
    seats: number
    stops: CreateTripRequestStop
    details: Details
}

export interface ReservationRequest {
    tripId: string,
	userId: string,
	sourceId: string,
	destinationId: string,
	seats: number
}

class TripService extends Service {
    private static instance?: TripService = undefined

    public static getInstance(): TripService {
        if (!TripService.instance) {
            TripService.instance = new TripService()
        }

        return TripService.instance
    }

    constructor() {
        super()

        PubSubService.subscribe('trips', this.subscriptionCallback)
    }

    create(trip: CreateTripRequest): Promise<Trip> {
        store.dispatch(UIFetchingActions.sendRequest())

        return RESTRequestFactory.post(`trips`, trip).send()
            .then((trip: Trip) => {
                store.dispatch(EntitiesTripsActions.addTrip(trip))
                store.dispatch(UIFetchingActions.receiveResponse(trip))

                return Promise.resolve(trip)
            })
            .catch(this.handleError)
    }

    delete(tripId: string): Promise<void> {
        store.dispatch(UIFetchingActions.sendRequest())

        return RESTRequestFactory.delete(`trips/${tripId}`).send()
            .then(() => {
                store.dispatch(EntitiesTripsActions.removeTrip(tripId))
                store.dispatch(UIFetchingActions.receiveResponse())

                return Promise.resolve()
            })
            .catch(this.handleError)
    }

    addReservation(reservation: ReservationRequest): Promise<void> {
        store.dispatch(UIFetchingActions.sendRequest())
        
        return RESTRequestFactory.post(`reservations`, reservation).send()
            .then((reservat: Reservation) => {
                store.dispatch(UIFetchingActions.receiveResponse(reservat))

                return Promise.resolve()
            })
            .catch(this.handleError)
    }

    private parseTrip(data?: any): Trip | undefined {
        if (data) {
            return JSON.parse(data)
        }

        return undefined
    }

    private subscriptionCallback = (message: Message): void => {
        const trip = this.parseTrip(message.data)
            
        switch (message.name) {
            case 'TRIP_UPDATED':
                this.updateTrip(trip)
                break
            case 'TRIP_ADDED':
                // Just ignore it :)
                break
            default:
                console.warn(`SearchService.subscription: discarded message with unknown name (${message.name})`)
                break
        }
    }

    private updateTrip(trip?: Trip) {
        if (!trip) {
            return
        }

        const state = store.getState()

        const existingTrip = state.entities.trips.find(t => t.id === trip.id)
        if (existingTrip) {
            store.dispatch(EntitiesTripsActions.updateTrip(trip))
        }
    }
}

export default TripService.getInstance()