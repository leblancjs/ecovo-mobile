import { createSelector } from 'reselect'
import { AppState } from '../store'

export const isFetchingSelector = (state: AppState) => state.ui.isFetching
export const errorSelector = (state: AppState) => state.ui.error

const isFetching = createSelector(
    [isFetchingSelector], (isFetching) => isFetching
)

const getErrors = createSelector(
    [errorSelector], (errors) => errors
)

const UISelectors = {
    isFetching,
    getErrors,
}

export default UISelectors