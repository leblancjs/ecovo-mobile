import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Container, Content, Header, Left, Right, Body, Title, Button, Text, Icon } from 'native-base'
import { connect } from 'react-redux'
import { TripCardCarousel, EcovoMapView } from '../../components'
import { NavigationActions, StackActions } from 'react-navigation'
import { AppState, UISearchActions, clearSearchResults } from '../../store'
import { SearchService, UserService, VehicleService } from '../../services'
import { TripSelectors } from '../../selectors'
import { ScreenNames } from '..'
import { Trip, Search } from '../../entities'
import { Dispatch, AnyAction } from 'redux'

export interface TripResultsScreenProps {
    navigation: any
    results: Trip[]
    search: Search
    goToDetails: () => void
    selectSearchResult: (tripId: string) => void
    clearSearchResults: () => void
    back: () => void

}
interface TripResultsState {
    minDate: Date
    selectedTrip: number
}
class TripResultsScreen extends Component<TripResultsScreenProps, TripResultsState> {
    constructor(props: TripResultsScreenProps) {
        super(props)

        this.state = {
            minDate: new Date(),
            selectedTrip: 0,
        }
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    private onItemChange = (index: number) => {
        this.setState({ ...this.state, selectedTrip: index })
    }

    private onItemMorePressed = (tripId: string) => {
        let trip = this.props.results.find(r => r.id === tripId)
        if (trip) {
            UserService.getDriverById(trip.driverId)
                .then(() => {
                    // Ignore the damn error...
                    return VehicleService.getVehicleById(trip.driverId, trip.vehicle.id)
                        .then(() => {
                            this.props.selectSearchResult(tripId)
                            this.props.goToDetails()
                        })
                        .catch(error => {
                            console.log(`Failed to get vehicle used in trip.`, error)
                        })
                })
                .catch(error => {
                    console.log(`Failed to get driver for trip.`, error)
                })
        }

    }

    private back = () => {
        this.props.clearSearchResults()
        this.props.back()
    }

    private renderLoadingMap() {
        if (this.props.results) {
            const trips = this.props.results
            if (trips == undefined || trips.length == 0) {
                return (
                    <View>
                        <ActivityIndicator size="large" color="#2bb267" />
                    </View>
                )
            } else {
                const trip = trips[this.state.selectedTrip]

                return <EcovoMapView stops={trip.stops.map(stop => stop.point)} />
            }
        } else {
            return (
                <View>
                    <ActivityIndicator size="large" color="#2bb267" />
                </View>
            )
        }
    }

    renderCarousel() {
        if (this.props.results) {
            return (
                <View style={styles.bottom}>
                    <TripCardCarousel
                        onItemChange={this.onItemChange}
                        onItemMorePressed={this.onItemMorePressed}
                        items={this.props.results}
                    />
                </View>
            );
        }
    }

    render() {
        return (
            <Container>
                <Header noShadow>
                    <Left>
                        <Button transparent onPress={this.back}>
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

    private unsubscribe = () => {
        if (this.props.search) {
            let searchId = this.props.search.id
            if (searchId) {
                SearchService.stop(searchId)
                .catch((error) => {
                    console.log(`Failed to stop searching for trips.`, error)
                })
             }

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


const mapStateToProps = (state: AppState) => ({
    results: TripSelectors.getSearchResults(state),
})
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    goToDetails: () => dispatch(StackActions.push({ routeName: ScreenNames.Trips.DETAILS })),
    selectSearchResult: (tripId: string) => dispatch(UISearchActions.selectSearchResult(tripId)),
    clearSearchResults: () => dispatch(UISearchActions.clearSearchResults()),
    back: () => dispatch(StackActions.pop({})),
})

export default connect(mapStateToProps, mapDispatchToProps)(TripResultsScreen)