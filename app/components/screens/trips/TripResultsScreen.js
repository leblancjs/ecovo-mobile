import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { withStatusBar } from '../../hoc'
import { Text } from 'native-base'
import { NavigationActions } from 'react-navigation'
import PubSubService from '../../../service/pubsub'
import {
    startSearch, stopSearch,
    ADD_SEARCH_RESULT, REMOVE_SEARCH_RESULT, CLEAR_SEARCH_RESULTS,
    addSearchResult, removeSearchResult, clearSearchResults
} from '../../../actions/search'
import { ScreenNames } from '../'

class TripResultsScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchParam: {
                departureDate: null,
                arrivalDate: null,
                from: '',
                to: '',
                pickupRadius: 50,
                driverRating: 0,
            },
            minDate: new Date()
        }
    }

    componentDidMount() {
        this._subscribe()
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading Results</Text>

                <ActivityIndicator size="large" color="#2bb267" />

                <Text>{JSON.stringify(this.props.search)}</Text>
            </View>

        )
    }

    _subscribe = () => {
        this.props.startSearch(this.props.accessToken, this.props.search.filters)
            .then((search) => {
                PubSubService.subscribe(search.id, (msg) => {
                    let payload = msg.data ? JSON.parse(msg.data) : {}
                    
                    switch (msg.name) {
                        case ADD_SEARCH_RESULT:
                            this.props.addSearchResult(payload)
                            break
                        case REMOVE_SEARCH_RESULT:
                            this.props.removeSearchResult(payload.id)
                            break
                        case CLEAR_SEARCH_RESULTS:
                            this.props.clearSearchResults()
                            break
                        default:
                            console.error(`TripResultsScreen: received message with unknown name "${msg.name}"`)
                            break
                    }
                })
            })
            .catch((error) => {
                console.log(error)
                this.props.goToError()
            })
    }

    _unsubscribe = () => {
        let searchId = this.props.search.id

        this.props.stopSearch(this.props.accessToken, searchId)
            .then(() => PubSubService.unsubscribe(searchId))
            .catch((error) => {
                console.log(error)
                this.props.goToError()
            })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})


const mapStateToProps = state => ({
    accessToken: state.auth.credentials.accessToken,
    search: state.search
})
const mapDispatchToProps = dispatch => ({
    startSearch: (accessToken, filters) => dispatch(startSearch(accessToken, filters)),
    stopSearch: (accessToken, id) => dispatch(stopSearch(accessToken, id)),
    addSearchResult: (trip) => dispatch(addSearchResult(trip)),
    removeSearchResult: (tripId) => dispatch(removeSearchResult(tripId)),
    clearSearchResults: () => dispatch(clearSearchResults()),
    goToError: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Errors.HOME }))
})

export default withStatusBar(connect(mapStateToProps, mapDispatchToProps)(TripResultsScreen))