import { DEQUEUE_ERROR } from './types'

export const dequeueError = () => ({
    type: DEQUEUE_ERROR,
})

export const UIErrorActions = {
    dequeueError,
}