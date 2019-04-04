import {
    UISearchState,
    UISearchActionTypes,
    START_SEARCH,
    STOP_SEARCH,
    ADD_SEARCH_RESULT,
    REMOVE_SEARCH_RESULT,
    CLEAR_SEARCH_RESULTS,
    SELECT_SEARCH_RESULT,
} from './types'

const initialState: UISearchState = {
    search: undefined,
    resultId: '',
    allResultIds: []
}

export function searchReducer(state = initialState, action: UISearchActionTypes): UISearchState {
    switch (action.type) {
        case ADD_SEARCH_RESULT:
            return {
                ...state,
                allResultIds: state.allResultIds.concat(action.resultId)
            }
        case REMOVE_SEARCH_RESULT:
            return {
                ...state,
                allResultIds: state.allResultIds.filter(resultId => resultId !== action.resultId)
            }
        case SELECT_SEARCH_RESULT:
            return {
                ...state,
                resultId: action.resultId
            }
        case CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                resultId: '',
                allResultIds: []
            }
        case START_SEARCH:
            return {
                ...state,
                search: {
                    ...action.search
                }
            }
        case STOP_SEARCH:
            return {
                ...state,
                search: undefined
            }
        default:
            return state
    }
}