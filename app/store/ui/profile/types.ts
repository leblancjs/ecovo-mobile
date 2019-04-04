export interface UIProfileState {
    userId: string
    driverId: string
}

export const SELECT_USER_PROFILE = 'SELECT_USER_PROFILE'
export const SELECT_DRIVER_PROFILE = 'SELECT_DRIVER_PROFILE'

interface SelectUserProfileAction {
    type: typeof SELECT_USER_PROFILE
    userId: string
}

interface SelectDriverProfileAction {
    type: typeof SELECT_DRIVER_PROFILE
    driverId: string
}

export type UIProfileActionTypes = SelectUserProfileAction | SelectDriverProfileAction