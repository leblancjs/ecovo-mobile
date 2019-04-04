import { Search } from '../../../entities'

export interface UISearchState {
    search?: Search
    resultId: string
    allResultIds: string[]
}

export const START_SEARCH = 'START_SEARCH'
export const STOP_SEARCH = 'STOP_SEARCH'
export const ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT'
export const REMOVE_SEARCH_RESULT = 'REMOVE_SEARCH_RESULT'
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS'
export const SELECT_SEARCH_RESULT = 'SELECT_SEARCH_RESULT'

interface StartSearchAction {
    type: typeof START_SEARCH
    search: Search
}

interface StopSearchAction {
    type: typeof STOP_SEARCH
}

interface AddSearchResultAction {
    type: typeof ADD_SEARCH_RESULT
    resultId: string
}

interface RemoveSearchResultAction {
    type: typeof REMOVE_SEARCH_RESULT
    resultId: string
}

interface ClearSearchResultsAction {
    type: typeof CLEAR_SEARCH_RESULTS
}

interface SelectSearchResultAction {
    type: typeof SELECT_SEARCH_RESULT
    resultId: string
}

export type UISearchActionTypes = StartSearchAction | StopSearchAction | AddSearchResultAction | RemoveSearchResultAction | ClearSearchResultsAction | SelectSearchResultAction