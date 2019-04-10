import { createSelector } from 'reselect'
import { uiProfileSelector } from './user'
import { AppState } from '../store'

export const entitiesTripsSelector = (state: AppState) => state.entities.trips
export const uiSearchSelector = (state: AppState) => state.ui.search

const getTripsByUser = createSelector(
    [entitiesTripsSelector, uiProfileSelector], (trips, profile) =>
        trips.find(t => t.driverId === profile.userId)
)

const getTripSelected = createSelector(
    [entitiesTripsSelector, uiSearchSelector], (trips, ui) =>
        trips.find(t => t.id === ui.resultId)
)

const getSearch = createSelector(
    [uiSearchSelector], (search) =>
        search.search
)

const getNbSeatsSearch = createSelector(
    [uiSearchSelector], (search) =>
        search.search.filters.seats
)

const getSearchResults = createSelector(
    [entitiesTripsSelector, uiSearchSelector], (trips, search) =>
        search.allResultIds.map(resultId =>
            trips.find(t => t.id === resultId)
        )
)

const TripSelectors = {
    getTripsByUser,
    getTripSelected,
    getSearch,
    getSearchResults,
    getNbSeatsSearch,
}

export default TripSelectors