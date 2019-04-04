import { Promise } from 'core-js'

export enum RESTRequestContentType {
    JSON = 'application/json',
}

export class RESTRequest {
    constructor(
        private method: string,
        private url: string,
        private headers: Headers = new Headers(),
        private body: string = '',
    ) {}

    private parseResponseBody(response: Response): Promise<any> {
        const contentType = response.headers.get('Content-Type')

        switch (contentType) {
            case RESTRequestContentType.JSON:
                return response.json()
            default:
                return response.text()
                    .then(text => Promise.resolve(JSON.parse(text)))
        }
    }

    send(): Promise<any> {
        const params = {
            method: this.method,
            headers: this.headers,
            body: this.body,
        }

        return fetch(this.url, params)
            .then((response: Response) => {
                switch (this.method) {
                    case 'PUT':
                    case 'PATCH':
                    case 'DELETE':
                        return response.ok ?
                            Promise.resolve() :
                            this.parseResponseBody(response)
                                .then((body: any) => Promise.reject(body))
                    default:
                        return this.parseResponseBody(response)
                            .then((body: any) => {
                                return response.ok ?
                                    Promise.resolve(body) :
                                    Promise.reject(body)
                            })
                }
            })
            .catch((reason: any) => Promise.reject(reason))
    }
}