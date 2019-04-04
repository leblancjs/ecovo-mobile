import {
    START_SEARCH,
    STOP_SEARCH,
    ADD_SEARCH_RESULT,
    REMOVE_SEARCH_RESULT,
    CLEAR_SEARCH_RESULTS,
    SELECT_SEARCH_RESULT,
} from './types'
import { Search } from '../../../entities'

export const startSearch = (search: Search) => ({
    type: START_SEARCH,
    search
})

export const stopSearch = () => ({
    type: STOP_SEARCH
})

export const addSearchResult = (resultId: string) => ({
    type: ADD_SEARCH_RESULT,
    resultId
})

export const removeSearchResult = (resultId: string) => ({
    type: REMOVE_SEARCH_RESULT,
    resultId
})

export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS
})

export const selectSearchResult = (resultId: string) => ({
    type: SELECT_SEARCH_RESULT,
    resultId
})

export const UISearchActions = {
    startSearch,
    stopSearch,
    addSearchResult,
    removeSearchResult,
    clearSearchResults,
    selectSearchResult,
}