import {
    START_SEARCH_REQUEST, START_SEARCH_SUCCESS, START_SEARCH_ERROR,
    STOP_SEARCH_REQUEST, STOP_SEARCH_SUCCESS, STOP_SEARCH_ERROR,
    RECEIVE_SEARCH_RESULT, CLEAR_SEARCH_RESULTS
} from '../actions/search'

const initialState = {
    isFetching: false,
    error: null,
    id: null,
    filters: {},
    results: []
}

const search = (state = initialState, action) => {
    switch (action.type) {
        case START_SEARCH_REQUEST:
            return {
                ...initialState,
                isFetching: true
            }
        case START_SEARCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                id: action.search.id,
                filters: {
                    ...action.search.filters
                }
            }
        case START_SEARCH_ERROR:
            return {
                ...initialState,
                error: action.error
            }
        case STOP_SEARCH_REQUEST:
            return {
                ...initialState,
                isFetching: true
            }
        case STOP_SEARCH_SUCCESS:
            return {
                ...initialState
            }
        case STOP_SEARCH_ERROR:
            return {
                ...initialState,
                error: action.error
            }
        case RECEIVE_SEARCH_RESULT:
            return {
                ...state,
                results: [
                    ...state.results,
                    action.result
                ]
            }
        case CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                results: []
            }
        default:
            return state
    }
}

export default search