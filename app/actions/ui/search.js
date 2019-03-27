const START_SEARCH = 'START_SEARCH'
const STOP_SEARCH = 'STOP_SEARCH'
const ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT'
const REMOVE_SEARCH_RESULT = 'REMOVE_SEARCH_RESULT'
const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS'
const SELECT_SEARCH_RESULT = 'SELECT_SEARCH_RESULT'


const start = (search) => ({
    type: START_SEARCH,
    search
})


const stop = () => ({
    type: STOP_SEARCH
})


const addSearchIdResult = (tripId) => ({
    type: ADD_SEARCH_RESULT,
    tripId
})


const removeSearchIdResult = (tripId) => ({
    type: REMOVE_SEARCH_RESULT,
    tripId
})


const clearSearchIdResults = () => ({
    type: CLEAR_SEARCH_RESULTS
})


const selectSearchResult = (tripId) => ({
    type: SELECT_SEARCH_RESULT,
    tripId
})

export const SearchUIActionType = {
    START_SEARCH,
    STOP_SEARCH,
    ADD_SEARCH_RESULT,
    REMOVE_SEARCH_RESULT,
    CLEAR_SEARCH_RESULTS,
    SELECT_SEARCH_RESULT
}

export const SearchUIAction = {
    start,
    stop,
    addSearchIdResult,
    removeSearchIdResult,
    clearSearchIdResults,
    selectSearchResult
}