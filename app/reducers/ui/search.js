import { SearchUIActionType } from '../../actions'

const { ADD_SEARCH_RESULT, REMOVE_SEARCH_RESULT, SELECT_SEARCH_RESULT,
    START_SEARCH, STOP_SEARCH, CLEAR_SEARCH_RESULTS } = SearchUIActionType

const initialState = {
    search: null,
    // Ce serait le ID du trip à afficher dans l'écran "details".
    resultId: null,

    // Ce serait les IDs des entités trips qui sont stockés ailleurs dans le store.
    // On utiliserait un selector pour aller les chercher.
    allResultIds: []
}

const search = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SEARCH_RESULT:
            return {
                ...state,
                allResultIds: state.allResultIds.concat(action.tripId)
            }
        case REMOVE_SEARCH_RESULT:
            return {
                ...state,
                allResultIds: state.allResultIds.filter(trip => trip !== action.tripIs)
            }
        case SELECT_SEARCH_RESULT:
            return {
                ...state,
                resultId: {
                    ...action.tripId
                }
            }
        case CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                resultId: null,
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
                search: null
            }
        default:
            return state
    }
}

export default search
