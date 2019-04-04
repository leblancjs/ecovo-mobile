export enum Preference {Never, Occasionally, Regularly}

export interface Preferences {
    smoking: Preference
    conversation: Preference
    music: Preference
}

export interface User {
    id?: string
    email: string
    firstName: string
    lastName: string
    dateOfBirth?: string | Date
    phoneNumber: string
    gender: string
    photo: string
    description: string
    preferences?: Preferences
    signUpPhase: string
    userRating: number
    driverRating: number
}