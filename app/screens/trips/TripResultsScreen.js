import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Container, Content, Header, Left, Right, Body, Title, Button, Text, Icon } from 'native-base'
import { connect } from 'react-redux'
import { astuvu } from '../../components/hoc'
import TripCardCarousel from '../../components/astuvu-native/TripCardCarousel'
import EcovoMapView from '../../components/astuvu-native/EcovoMapView'
import { NavigationActions, StackActions } from 'react-navigation'
import PubSubService from '../../service/pubsub'
import { TripsEntitiesAction, SearchUIAction, SearchUIActionType } from '../../actions'
import { SearchService, UserService, VehicleService } from '../../service'
import { TripsSelector, AuthSelector } from '../../selectors'
import { ScreenNames } from '..'

class TripResultsScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchParam: {
                filters: props.navigation.getParam("searchFilters", {})
            },
            minDate: new Date(),
            selectedTrip: 0,
        }
    }

    componentDidMount() {
        this._subscribe()
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    _onItemChange = (index) => {
        this.setState({ ...this.state, selectedTrip: index })
    }

    _onItemMorePressed = (tripId) => {
        let trip = this.props.results.find(r => r.id === tripId)
        this.props.getDriverById(this.props.accessToken, trip.driverId).then(() => {
            //TODO then for the vehicle too, but vehicle catch execption
            this.props.getVehiculeById(this.props.accessToken, trip.vehicleId);
            this.props.selectSearchResult(tripId)
            this.props.goToDetails()
        })
    }

    _back = () => {
        this.props.back()
    }

    renderLoadingMap() {
        if (this.props.results) {
            const trips = this.props.results
            if (trips == undefined || trips.length == 0) {
                return <View><ActivityIndicator size="large" color="#2bb267" /></View>
            } else {
                var trip = trips[this.state.selectedTrip]
                let marker = []
                marker.push(trip.source)
                marker = marker.concat(trip.stops)
                marker.push(trip.destination)

                return <EcovoMapView markers={marker} source={trip.source} destination={trip.destination} steps={marker} />
            }
        } else {
            return <View><ActivityIndicator size="large" color="#2bb267" /></View>
        }
    }

    renderCarousel() {
        if (this.props.results) {
            return (
                <View style={styles.bottom}>
                    <TripCardCarousel onItemChange={this._onItemChange} onItemMorePressed={this._onItemMorePressed} style={styles.carousel} items={this.props.results}></TripCardCarousel>
                </View>
            );
        }
    }

    render() {
        return (
            <Container>
                <Header noShadow>
                    <Left>
                        <Button transparent onPress={this._back}>
                            <Icon name="arrow-back" />
                            <Text>Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Results</Title>
                    </Body>
                    <Right />
                </Header>
                <Content
                    scrollEnabled={false}
                    contentContainerStyle={styles.container}
                >
                    {this.renderLoadingMap()}

                    {this.renderCarousel()}
                </Content>
            </Container>

        )
    }

    _subscribe = () => {
        this.props.startSearch(this.props.accessToken, this.state.searchParam)
            .then((search) => {
                PubSubService.subscribe(search.id, (msg) => {
                    let payload = msg.data ? JSON.parse(msg.data) : {}

                    const { ADD_SEARCH_RESULT, REMOVE_SEARCH_RESULT, CLEAR_SEARCH_RESULTS } = SearchUIActionType
                    switch (msg.name) {
                        case ADD_SEARCH_RESULT:
                            this.props.addSearchIdResult(payload.id)
                            this.props.addTrip(payload)
                            break
                        case REMOVE_SEARCH_RESULT:
                            this.props.removeSearchIdResult(payload.id)
                            this.props.removeTrip(payload.id)
                            break
                        case CLEAR_SEARCH_RESULTS:
                            this.props.clearSearchIdResults()
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
        if (this.props.search) {
            let searchId = this.props.search.id

            this.props.stopSearch(this.props.accessToken, searchId)
                .then(() => PubSubService.unsubscribe(searchId))
                .catch((error) => {
                    console.log(error)
                    this.props.goToError()
                })
        }
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
    accessToken: AuthSelector.getAccessToken(state),
    search: TripsSelector.getSearch(state),
    results: TripsSelector.getAllSearchResult(state)
})
const mapDispatchToProps = dispatch => ({
    startSearch: (accessToken, filters) => dispatch(SearchService.start(accessToken, filters)),
    stopSearch: (accessToken, id) => dispatch(SearchService.stop(accessToken, id)),
    addSearchIdResult: (trip) => dispatch(SearchUIAction.addSearchIdResult(trip)),
    removeSearchIdResult: (tripId) => dispatch(SearchUIAction.removeSearchIdResult(tripId)),
    clearSearchIdResults: () => dispatch(SearchUIAction.clearSearchIdResults()),
    addTrip: (trip) => dispatch(TripsEntitiesAction.add(trip)),
    removeTrip: (tripId) => dispatch(TripsEntitiesAction.remove(tripId)),
    goToError: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Errors.HOME })),
    goToDetails: () => dispatch(StackActions.push({ routeName: ScreenNames.Trips.DETAILS })),
    selectSearchResult: (tripId) => dispatch(SearchUIAction.selectSearchResult(tripId)),
    getDriverById: (accessToken, userId) => dispatch(UserService.getDriverById(accessToken, userId)),
    getVehiculeById: (accessToken, vehicleId) => dispatch(VehicleService.getVehiculeById(accessToken, vehicleId)),
    back: () => dispatch(StackActions.pop())
})

export default astuvu(connect(mapStateToProps, mapDispatchToProps)(TripResultsScreen))