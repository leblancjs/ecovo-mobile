import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
import { connect } from 'react-redux'
import { withStatusBar } from '../../hoc'
import TripCardCarousel from '../../astuvu-native/TripCardCarousel'
import { Container } from 'native-base'
import EcovoMapView from '../../astuvu-native/EcovoMapView'
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
            searchParam: props.navigation.getParam("searchFilters", {}),
            minDate: new Date(),
            selectedTrip : 0,
        }
    }

    componentDidMount() {
        this._subscribe()
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    _onItemChange = (index) => { 
        this.setState({ ...this.state, selectedTrip : index })
    }

    renderLoadingMap() {
        const trips = this.props.search.results
        if (trips == undefined || trips.length == 0) {
            return <View><ActivityIndicator size="large" color="#2bb267" /><Text style={styles.centerText}>Searching...</Text></View> 
        } else {
            var trip = trips[this.state.selectedTrip]
            let marker = []
            marker.push(trip.source)
            marker = marker.concat(trip.stops)
            marker.push(trip.destination)

            return <EcovoMapView markers={marker} source={trip.source} destination={trip.destination} steps={marker} />
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                {this.renderLoadingMap()}

                <View style={styles.bottom}>
                    <TripCardCarousel onItemChange={this._onItemChange} style={styles.carousel} items={this.props.search.results}></TripCardCarousel>
                </View>
            </Container>

        )
    }

    _subscribe = () => {
        this.props.startSearch(this.props.accessToken, this.state.searchParam)
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
    },
    bottom: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        justifyContent: 'flex-end',
        paddingBottom: 0,
    },
    centerText: {
        justifyContent: 'center',
    },
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