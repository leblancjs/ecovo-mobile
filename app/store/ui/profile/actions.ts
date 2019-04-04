import { SELECT_USER_PROFILE, SELECT_DRIVER_PROFILE } from './types'

export const selectUserProfile = (userId: string) => ({
    type: SELECT_USER_PROFILE,
    userId,
})

export const selectDriverProfile = (driverId: string) => ({
    type: SELECT_DRIVER_PROFILE,
    driverId,
})

export const UIProfileActions = {
    selectUserProfile,
    selectDriverProfile,
}