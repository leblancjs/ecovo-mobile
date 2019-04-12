import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Container, Content, Header, Left, Right, Body, Title, Tab, Tabs, Button, Icon, Text, Card, CardItem } from 'native-base'
import { connect } from 'react-redux'
import { StackActions } from 'react-navigation'
import { TripDetails, ProfileComponent } from '../../components'
import { TripSelectors, UserSelectors, VehicleSelectors, AuthSelector } from '../../selectors'
import { TripService } from '../../services'
import { Trip, User, Vehicle } from '../../entities'
import { Dispatch, AnyAction } from 'redux'
import { AppState } from '../../store'
import Modal from "react-native-modal"

export interface DetailsTripTabScreenProps {
    user: User
    driver: User
    trip: Trip
    vehicle: Vehicle
    nbSeats: number
    back: () => void
}

class DetailsTripTabScreen extends Component<DetailsTripTabScreenProps> {
    constructor(props: DetailsTripTabScreenProps) {
        super(props)

        this.state = {
            user: props.driver,
            trip: props.trip,
            vehicle: props.vehicle ? props.vehicle : {
                make: "",
                model: "",
                year: 0,
                color: ""
            },
            modalVisible: false,
        }
    }

    _onReserve = () => {
        let numStop = this.props.trip.stops.length - 1
        let reservation = {
            tripId: this.props.trip.id,
            userId: this.props.user.id,
            sourceId: this.props.trip.stops[0].id,
            destinationId: this.props.trip.stops[numStop].id,
            seats: this.props.nbSeats
        }
        console.log(reservation)
        TripService.addReservation(reservation)
            .then(() => this._toggleModal())
            .catch(error => {
                console.log(`Failed to create trip.`, error)
            })
    }

    _toggleModal = () => {
        this.setState({ ...this.state, modalVisible: !this.state.modalVisible });
    }

    _fabClickHandle = () => {
        console.log("Fab clicked")
    }

    _back = () => {
        this.props.back()
    }

    render() {
        return (
            <Container>
                <Modal animationType={"slide"}
                    isVisible={this.state.modalVisible}>
                    <Card>
                        <CardItem header>
                            <Text>ARE YOU SURE?</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>
                                    Do you really want to reserve this trip?
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Button transparent onPress={this._toggleModal}>
                                <Text>No</Text>
                            </Button>
                            <Button transparent onPress={this._onReserve}>
                                <Text>Yes</Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Modal>
                <Header>
                    <Left>
                        <Button transparent onPress={this._back}>
                            <Icon name="arrow-back" />
                            <Text>Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Trip Details</Title>
                    </Body>
                    <Right />
                </Header>
                <Content
                    scrollEnabled={false}
                    contentContainerStyle={styles.container}
                >
                    <Tabs tabBarUnderlineStyle={{ backgroundColor: '#fff', height: 2 }} locked={true}>
                        <Tab heading="TRIP"
                            tabStyle={{ backgroundColor: '#2bb267' }}
                            textStyle={{ color: '#fff' }}
                            activeTabStyle={{ backgroundColor: '#2bb267' }}
                            activeTextStyle={{ color: '#fff' }}>
                            <TripDetails {...this.props} trip={this.state.trip} vehicule={this.state.vehicle} isReservable={true} onFabTapped={this._toggleModal} />
                        </Tab>
                        <Tab heading="DRIVER"
                            tabStyle={{ backgroundColor: '#2bb267' }}
                            textStyle={{ color: '#fff' }}
                            activeTabStyle={{ backgroundColor: '#2bb267' }}
                            activeTextStyle={{ color: '#fff' }}>
                            <ProfileComponent {...this.props} user={this.state.user} onFabTapped={this._fabClickHandle} fabIcon="message" />
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const mapStateToProps = (state: AppState) => ({
    user: UserSelectors.getUserConnected(state),
    accessToken: AuthSelector.getAccessToken(state),
    trip: TripSelectors.getTripSelected(state),
    driver: UserSelectors.getDriver(state),
    vehicle: VehicleSelectors.getVehicle(state),
    nbSeats: TripSelectors.getNbSeatsSearch(state)
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    back: () => dispatch(StackActions.pop({ immediate: true, n: 1 }))
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailsTripTabScreen)