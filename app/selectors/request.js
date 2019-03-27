import { createSelector } from 'reselect'

const isFetchingSelector = state => state.ui.isFetching
const errorSelector = state => state.ui.error

const isFetching = createSelector(
    [isFetchingSelector], (isFetching) => isFetching
)

const getError = createSelector(
    [errorSelector], (error) => error
)

export { isFetching, getError }