import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StackActions } from 'react-navigation'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Container, Header, Footer, Left, Right, Body, Title, Text, Item, Icon, Button, Form, Content } from 'native-base'
import { TripService, VehicleService } from '../../services'
import { UISelectors, UserSelectors, VehicleSelectors } from '../../selectors'
import { AnimalPickerField, LuggagePickerField, DateTimePickerField, FooterButton, PickerField, PlacesSearchField, PickerFieldItem } from '../../components'
import { Vehicle, Stop, User } from '../../entities'
import { Dispatch, AnyAction } from 'redux'
import { AppState } from '../../store'
import moment, { Moment } from 'moment'

export interface AddTripScreenProps {
    user: User
    vehicles: Vehicle[]
    fetching: boolean
    closeAddTripScreen: () => void
}

interface VehicleScreenScreenState {
    trip: any
    seats: number
    vehicles: Vehicle[]
    selectedVehicule?: Vehicle
    source?: any
    destination?: any
    stopsItem: any
    minDate: Date
    error: string | null
}

class AddTripScreen extends Component<AddTripScreenProps, VehicleScreenScreenState> {
    constructor(props : AddTripScreenProps) {
        super(props)

        this.state = {
            trip: {
                leaveAt: "0001-01-01T00:00:00Z",
                arriveBy: "0001-01-01T00:00:00Z",
                driverId: props.user.id || '',
                vehicleId: '',
                full: false,               
                seats: 1,
                stops: [],
                details: {
                    animals: 0,
                    luggages: 0,
                },
            },
            seats: 1,
            vehicles: props.vehicles ? props.vehicles : [],
            selectedVehicule: props.vehicles ? props.vehicles[0] : undefined,
            source: undefined,
            destination: undefined,
            stopsItem: [],
            minDate: new Date(),
            error: ""
        }
    }

    componentDidMount() {
        VehicleService.getVehiclesByUserId(this.props.user.id || '')
            .then(() => {
                this.setState({
                    ...this.state,
                    selectedVehicule: this.props.vehicles ? this.props.vehicles[0] : undefined
                })
            })
            .catch(error => {
                console.log(`Failed to the user's vehicles.`, error)
            })
    }

    private closeAddTripScreen = () => {
        this.props.closeAddTripScreen()
    }

    private validateDepartureTime = (selectedDate: Moment): string | null => {
        var currentDate = moment(new Date())
        if (!selectedDate.isAfter(currentDate)) {
            return `Please select a date that is in the future.`
        }

        return null
    }

    private updateDepartureTime = (departureTime: Moment, error: string | null): void => {
        this.onFieldChange('leaveAt', departureTime.format('YYYY-MM-DDTHH:mm:ss.sZ'), error)
    }

    private onFieldChange = (field: string, value: string, error: string | null) => {
        this.setState({
            ...this.state,
            trip: {
                ...this.state.trip,
                [field]: value
            },
            error,
        })
    }

    private onDetailChange = (detail : string, value: number) => {
        this.setState({
            ...this.state,
            trip: {
                ...this.state.trip,
                details: {
                    ...this.state.trip.details,
                    [detail]: value
                }
            }
        })
    }

    private addStop = (stop: any, details: any) => {
        let newStop = {
            point: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                name: stop.description
            }
        }

        this.setState({
            ...this.state,
            trip: {
                ...this.state.trip,
                stops: [ ...this.state.trip.stops, newStop ],
            },
        })
    }

    private onVehicleChange = (selectedVehicule: Vehicle) => {
        this.setState({
            ...this.state,
            trip: {
                ...this.state.trip,
                vehicle: {
                    id: selectedVehicule.id || '',
                    year: selectedVehicule.year,
                    make: selectedVehicule.make,
                    model: selectedVehicule.model,
                }
            },
            seats: 1,
            selectedVehicule,
        })
    }

    private addStopInput = () => {
        let stopsItem = this.state.stopsItem

        let key = stopsItem.length

        stopsItem.push(
            <Item key={key} style={styles.item}>
                <PlacesSearchField placeholder='Pass by' onSearchResult={this.addStop} />
                <Icon style={styles.removeStopBtnIcon} type="MaterialIcons" name="close" onPress={() => this.removeStopInput(key)} />
            </Item>)
        this.setState({ stopsItem })
    }

    private removeStopInput = (key: number) => {
        this.setState({
            ...this.state,
            stopsItem: this.state.stopsItem.filter((stop: any, i: number) => i !== key)
        })
    }

    private updateFrom = (from : any, details: any) => {
        this.setState({
            ...this.state,
            source: {
                point: {
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    name: from.description
                }
            }
        })
    }

    private updateTo = (to: any, details: any) => {
        this.setState({
            ...this.state,
            destination: {
                point: {
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    name: to.description
                }
            }
        })
    }

    private createTrip = () => {
        if (this.props.user.id) {
            if (!this.props.fetching) {
                let stops: Stop[] = []
                stops.push(this.state.source)
                stops = stops.concat([ ...this.state.trip.stops ])
                stops.push(this.state.destination)

                TripService.create({
                    ...this.state.trip,
                    vehicle: {
                        ...this.state.trip.vehicle,
                    },
                    stops,
                })
                    .then(() => this.props.closeAddTripScreen())
                    .catch(error => {
                        console.log(`Failed to create trip.`, error)
                    })
            }
        }
    }

    render() {
        let addButtonDisabled = 
            !this.state.source ||
            !this.state.destination ||
            !this.state.trip.leaveAt ||
            !this.state.trip.vehicle ||
            !this.state.trip.driverId ||
            this.state.trip.seats <= 0
        
        const vehiclesItems: PickerFieldItem[] = this.props.vehicles.map(v => ({
            label: `${v.make} ${v.model} ${v.year}`,
            value: v
        }))

        const seatsItems: PickerFieldItem[] = []
        const maxSeats = this.state.selectedVehicule ? this.state.selectedVehicule.seats : 1
        for (let seats = 1; seats <= maxSeats; seats++) {
            seatsItems.push({
                label: `${seats}`,
                value: seats,
            })
        }

        return (
            <Container style={styles.container}>
                <Header noShadow>
                    <Left>
                        <Button transparent onPress={this.closeAddTripScreen}>
                            <Icon name="close" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Add a Trip</Title>
                    </Body>
                    <Right />
                </Header>
                <Content
                    scrollEnabled={false}
                    contentContainerStyle={styles.container}
                >
                    <View style={styles.header}>
                        <Form style={styles.form}>
                            <Item style={styles.item}>
                                <PlacesSearchField
                                    placeholder='Pick Up Point (Please Be Precise)'
                                    onSearchResult={this.updateFrom}
                                />
                            </Item>
                            {this.state.stopsItem.map((value, index) => {
                                return value
                            })}
                            <View style={styles.addStopItem}>
                                <Button transparent iconLeft onPress={() => this.addStopInput()}>
                                    <Icon style={{ color: 'white' }} name="add" />
                                    <Text style={{ color: 'white' }}>Add Stop</Text>
                                </Button>
                            </View>
                            <Item style={styles.item}>
                                <PlacesSearchField
                                    placeholder='Drop Off Point (Please Be Precise)'
                                    onSearchResult={this.updateTo}
                                />
                            </Item>
                        </Form>
                    </View>
                    <ScrollView style={styles.formContainer}>
                        <DateTimePickerField
                            placeholder='Please select a date and time'
                            label="Departure Time"
                            required={true}
                            onValueChange={this.updateDepartureTime}
                            onValidate={this.validateDepartureTime}
                            bottomBorder={true}
                        />
                        <PickerField
                            label="Vehicle"
                            initialValue={this.state.selectedVehicule}
                            items={vehiclesItems}
                            required={true}
                            onValueChange={this.onVehicleChange}
                        />
                        <PickerField
                            label="Passengers"
                            initialValue={this.state.seats}
                            items={seatsItems}
                            required={true}
                            onValueChange={(value, error) => this.onFieldChange('seats', value, error)}
                        />
                        <AnimalPickerField
                            label="Pets"
                            initialValue={this.state.trip.details.animals}
                            onValueChange={(value) => this.onDetailChange('animals', value)}
                        />
                        <LuggagePickerField
                            label="Luggage"
                            initialValue={this.state.trip.details.luggages}
                            onValueChange={(value) => this.onDetailChange('luggages', value)}
                        />
                    </ScrollView>
                </Content>
                <Footer>
                    <Body>
                        <FooterButton
                            loading={this.props.fetching}
                            disabled={this.props.fetching || addButtonDisabled}
                            formError={!!this.state.error}
                            onPress={this.createTrip}
                            text="Add a new trip"
                        />
                    </Body>
                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
    },
    header: {
        backgroundColor: '#2BB267',
    },
    removeStopBtnIcon: {
        color: '#FFF',
        marginRight: 0,
        marginLeft: 0
    },  
    form: {
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 16
    },
    item: {
        borderBottomWidth: 0,
        marginBottom: 16
    },

    addStopItem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    formContainer: {
        margin: 10,
        flex: 1
    }
})

const mapStateToProps = (state: AppState) =>  ({
    user: UserSelectors.getUserConnected(state),
    vehicles: VehicleSelectors.getVehiclesByUser(state),
    fetching: UISelectors.isFetching(state)
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>  ({
    closeAddTripScreen: () => dispatch(StackActions.pop({n: 1})),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTripScreen)