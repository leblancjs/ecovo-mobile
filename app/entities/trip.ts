export interface Point {
    longitude: number
    latitude: number
    name?: string
}

export interface Stop {
    id?: string
    point: Point
    seats: number
    timestamp?: string
}

export interface Details {
    animals: number
    luggages: number
}

export interface Trip {
    id?: string
    driverId: string
    vehicle: {
        id: string
        year: number
        make: string
        model: string
    }
    full: boolean
    leaveAt: string
    arriveBy: string
    seats: number
    stops: Stop[]
    details: Details
    reservationsCount?: number
    pricePerSeat?: number
    totalDistance?: number
}

export interface Reservation {
    id?: string
	tripId: string
	userId: string
	sourceId: string
	destinationId: string
	seats: number
}