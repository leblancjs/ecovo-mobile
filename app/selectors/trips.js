import { createSelector } from 'reselect'

const tripsEntitiesSelector = state => state.entities.trips
const userUISelector = state => state.ui.profile
const searchUISelector = state => state.ui.search

const getTripsByUser = createSelector(
    [tripsEntitiesSelector, userUISelector], (tripsEntities, userUI) => {
        return tripsEntities.find(t => t.userId === userUI.id)
    }
)

const getTripSelected = createSelector(
    [tripsEntitiesSelector, searchUISelector], (tripsEntities, ui) => {
        return tripsEntities.find(t => t.id === ui.resultId)
    }
)

const getSearch = createSelector(
    [searchUISelector], (searchUI) => {
        return searchUI.search
    }
)

const getAllSearchResult = createSelector(
    [tripsEntitiesSelector, searchUISelector], (tripsEntities, searchUI) => {
        return tripsEntities.filter(t => searchUI.allResultIds.includes(t.id)) 
    }
)

export default TripsSelector = {
    getTripsByUser,
    getTripSelected,
    getSearch,
    getAllSearchResult
}