import { Promise } from 'core-js'
import { RESTRequestFactory } from './rest'
import Service from './service'
import { PubSubService, Message } from './pubsub'
import { Search, Trip } from '../entities'
import store, {
    UISearchActions,
    ADD_SEARCH_RESULT,
    REMOVE_SEARCH_RESULT,
    CLEAR_SEARCH_RESULTS,
    UIFetchingActions,
    EntitiesTripsActions,
} from '../store'

class SearchService extends Service {
    private static instance?: SearchService = undefined

    public static getInstance(): SearchService {
        if (!SearchService.instance) {
            SearchService.instance = new SearchService()
        }

        return SearchService.instance
    }

    constructor() {
        super()
    }

    public start(search: Search): Promise<Search> {
        store.dispatch(UIFetchingActions.sendRequest())
    
        return RESTRequestFactory.post(`search`, search).send()
            .then((search: Search) => {
                if (!search.id) {
                    return Promise.reject({
                        message: `SearchService.start: search has no ID; cannot subscribe for results`
                    })
                }

                const sub = PubSubService.subscribe(this.buildTopic(search.id), this.subscriptionCallback)
                sub.history()

                store.dispatch(UISearchActions.startSearch(search))
                store.dispatch(UIFetchingActions.receiveResponse(search))
    
                return Promise.resolve(search)
            })
            .catch(this.handleError)
    }
    
    public stop(searchId: string): Promise<void> {
        PubSubService.unsubscribe(this.buildTopic(searchId))

        store.dispatch(UIFetchingActions.sendRequest())
    
        return RESTRequestFactory.delete(`search/${searchId}`).send()
            .then(() => {
                store.dispatch(UISearchActions.stopSearch())
                store.dispatch(UIFetchingActions.receiveResponse())
    
                return Promise.resolve()
            })
            .catch(this.handleError)
    }

    private buildTopic(searchId: string) {
        return `search:${searchId}`
    }

    private parseResult(data?: any): Trip | undefined {
        if (data) {
            return JSON.parse(data)
        }

        return undefined
    }

    private addResult(result?: Trip): void {
        if (!result) {
            console.warn(`SearchService.addResult: discarded search result since it had no data`)
            return
        }

        if (!result.id) {
            console.warn(`SearchService.addResult: discarded search result since it had no ID`)
            return
        }

        const state = store.getState()
        const currentUser = state.auth.user
        if (currentUser && currentUser.id === result.driverId) {
            // We don't care about our own trips!
            return
        }

        this.updateTrips(result)
        this.updateResults(result.id)
    }

    private removeResult(result?: Trip): void {
        if (!result) {
            console.warn(`SearchService.removeResult: discarded search result since it had no data`)
            return
        }

        if (!result.id) {
            console.warn(`SearchService.removeResult: discarded search result since it had no ID`)
            return
        }

        store.dispatch(UISearchActions.removeSearchResult(result.id))
    }

    private clearResults(): void {
        store.dispatch(UISearchActions.clearSearchResults())
    }

    private subscriptionCallback = (message: Message): void => {
        const result = this.parseResult(message.data)
            
        switch (message.name) {
            case ADD_SEARCH_RESULT:
                this.addResult(result)
                break
            case REMOVE_SEARCH_RESULT:
                this.removeResult(result)
                break
            case CLEAR_SEARCH_RESULTS:
                this.clearResults()
                break
            default:
                console.warn(`SearchService.subscription: discarded message with unknown name (${message.name})`)
                break
        }
    }
    
    private updateTrips(trip?: Trip) {
        if (!trip) {
            return
        }

        const state = store.getState()

        const existingTrip = state.entities.trips.find(t => t.id === trip.id)
        if (existingTrip) {
            store.dispatch(EntitiesTripsActions.updateTrip(trip))
        } else {
            store.dispatch(EntitiesTripsActions.addTrip(trip))
        }
    }

    private updateResults(resultId?: string) {
        if (!resultId) {
            return
        }

        const state = store.getState()

        const existingResultId = state.ui.search.allResultIds.find(id => id === resultId)
        if (!existingResultId) {
            store.dispatch(UISearchActions.addSearchResult(resultId))
        }
    }
}

export default SearchService.getInstance()