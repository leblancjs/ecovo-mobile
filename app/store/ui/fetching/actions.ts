import {
    SEND_REQUEST,
    RECEIVE_RESPONSE,
    RECEIVE_ERROR_RESPONSE,
} from './types'
import { Error } from '../../../entities'

export const sendRequest = () => ({
    type: SEND_REQUEST,
})

export const receiveResponse = (data?: any) => ({
    type: RECEIVE_RESPONSE,
    data,
})

export const receiveErrorResponse = (data: Error) => ({
    type: RECEIVE_ERROR_RESPONSE,
    data,
})

export const UIFetchingActions = {
    sendRequest,
    receiveResponse,
    receiveErrorResponse,
}