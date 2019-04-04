export type UIFetchingState = boolean

export const SEND_REQUEST = 'SEND_REQUEST'
export const RECEIVE_RESPONSE = 'RECEIVE_RESPONSE'
export const RECEIVE_ERROR_RESPONSE = 'RECEIVE_ERROR_RESPONSE'

interface SendRequestAction {
    type: typeof SEND_REQUEST
}

interface ReceiveResponseAction {
    type: typeof RECEIVE_RESPONSE
    data?: any
}

interface ReceiveErrorResponseAction {
    type: typeof RECEIVE_ERROR_RESPONSE
    data: any
}

export type UIFetchingActionTypes = SendRequestAction | ReceiveResponseAction | ReceiveErrorResponseAction