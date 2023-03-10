import BootstrapScreen from './BootstrapScreen'

export {
    BootstrapScreen,
}

export const ScreenNames = {
    BOOTSTRAP: 'bootstrap',
    SignIn: {
        HOME: 'signIn'
    },
    SignUp: {
        HOME: 'signUp',
        PERSONAL_INFO: 'personalInfo',
        PREFERENCES: 'preferences'
    },
    Profile: {
        HOME: 'profile',
        UPDATE: 'updateProfile'
    },
    Trips: {
        HOME: 'trips',
        MAP: 'map',
        RESULTS: 'tripResults',
        DETAILS: 'tripDetails',
        ADD: 'addTrip',
        SEARCH: 'tripSearch',
    },
    Vehicules: {
        HOME: 'vehicule',
        CREATE: 'create_vehicule'
    },
    Errors: {
        HOME: 'errors',
        GENERIC: 'genericError'
    }
}

export * from './error'
export * from './signin'
export * from './signup'
export * from './vehicles'