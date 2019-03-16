import React, { Component } from 'react'
import { StyleSheet, View, Image, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { withStatusBar } from '../../hoc';
import TripCardCarousel from '../../astuvu-native/TripCardCarousel';
import { Container } from 'native-base';
import EcovoMapView from '../../astuvu-native/EcovoMapView';
import { NavigationActions } from 'react-navigation'
import PubSubService from '../../../service/pubsub'
import {
    startSearch, stopSearch,
    ADD_SEARCH_RESULT, REMOVE_SEARCH_RESULT, CLEAR_SEARCH_RESULTS,
    addSearchResult, removeSearchResult, clearSearchResults
} from '../../../actions/search'
import { ScreenNames } from '../'

class TripResultsScreen extends Component {
    items = [{ time: '3h25', price: 23.12, departure: new Date('2018-01-12'), arrival: new Date('2018-01-12'), stops: 1, car: { make: "Toyota", model: "Camry", year: 2016 } },
        { time: '3h25', price: 23.12, departure: new Date('2018-01-12'), arrival: new Date('2018-01-12'), stops: 1, car: { make: "Toyota", model: "Camry", year: 2016 } }
        ,{ time: '3h25', price : 23.12, departure: new Date('2018-01-12'), arrival: new Date('2018-01-12'), stops: 1, car: {make: "Toyota", model: "Camry", year : 2016}}];

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
            <Container style={styles.container}>
                <EcovoMapView></EcovoMapView>

                <View style={styles.bottom}>
                    <TripCardCarousel style={styles.carousel} items={this.props.search}></TripCardCarousel>
                </View>
            </Container>

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
    },
    bottom: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        justifyContent: 'flex-end',
        paddingBottom: 0,
    },
    carousel: {


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