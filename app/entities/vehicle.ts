export interface Vehicle {
    id?: string
    userId: string
    year: number
    make: string
    model: string
    color: string
    photo?: string
    seats: number
    accessories?: string[]
}