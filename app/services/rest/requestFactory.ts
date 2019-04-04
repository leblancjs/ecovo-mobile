import { AppConfig } from '../../config'
import { RESTRequest, RESTRequestContentType } from "./request"
import AuthService from '../auth'

function buildUrl(endpoint: string): string {
    return `${AppConfig.domain}/${endpoint}`
}

function buildHeaders(contentType: RESTRequestContentType) {
    const credentials = AuthService.getCredentials()

    const headers = new Headers()
    headers.set('Authorization', `Bearer ${credentials.accessToken}`)
    headers.set('Content-Type', contentType)
    return headers
}

function buildBody(contentType: RESTRequestContentType, body: object = {}) {
    switch (contentType) {
        case RESTRequestContentType.JSON:
        default:
            return JSON.stringify(body)
    }
}

function post(endpoint: string, body: object, contentType: RESTRequestContentType = RESTRequestContentType.JSON) {
    return new RESTRequest('POST', buildUrl(endpoint), buildHeaders(contentType), buildBody(contentType, body))
}

function get(endpoint: string) {
    return new RESTRequest('GET', buildUrl(endpoint), buildHeaders(RESTRequestContentType.JSON))
}

function put(endpoint: string, body: object, contentType: RESTRequestContentType = RESTRequestContentType.JSON) {
    return new RESTRequest('PUT', buildUrl(endpoint), buildHeaders(contentType), buildBody(contentType, body))
}

function patch(endpoint: string, body: object, contentType: RESTRequestContentType = RESTRequestContentType.JSON) {
    return new RESTRequest('PATCH', buildUrl(endpoint), buildHeaders(contentType), buildBody(contentType, body))
}

function del(endpoint: string, body?: object, contentType: RESTRequestContentType = RESTRequestContentType.JSON) {
    return new RESTRequest('DELETE', buildUrl(endpoint), buildHeaders(contentType), buildBody(contentType, body))
}

export const RESTRequestFactory = {
    post,
    get,
    put,
    patch,
    /*
     * This is intentional. I can't name a function delete because it is a
     * reserved keyword.
     */
    delete: del,
}