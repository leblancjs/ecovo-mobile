import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Container, Header, Left, Right, Body, Title, Text, Item, Icon, Button, Form, Picker, Content } from 'native-base'
import { astuvu } from '../../components/hoc'
import PlacesSearchField from '../../components/astuvu-native/form/PlacesSearchField'
import { TripService, VehicleService } from '../../service'
import { isFetching, UsersSelector, AuthSelector } from '../../selectors'
import { ScreenNames } from '..'
import { AnimalPickerField, LuggagePickerField, DateTimePickerField, FooterButton, PickerField } from '../../components/astuvu-native/form';

class AddTripScreen extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)
        this.state = {
            trip: {
                leaveAt: "0001-01-01T00:00:00Z",
                arriveBy: "0001-01-01T00:00:00Z",
                driverId: '',
                vehicleId: '',
                full: false,
                seats: 1,
                stops: [],
                details: {
                    animals: 0,
                    luggages: 0,
                },
            },
            vehicules: [],
            seats: [],
            selectedVehicule: undefined,
            source: undefined,
            destination: undefined,
            stopsItem: [],
            minDate: new Date(),
            error: ""
        }
    }

    componentDidMount() {
        if (this.state.trip.driverId == '') {
            this._updateDriver()
        }

        if (this.state.trip.vehicules === undefined || this.state.trip.vehicules.length == 0) {
            this._getVehiculeList()
        }
    }

    _closeAddTripScreen = () => {
        this.props.closeAddTripScreen()
    }

    _updateLeaveAt = (selectedDate, err) => {
        var currentDate = new Date()
        var newDate = new Date(selectedDate)

        if (currentDate > newDate) {
            this.setState({ ...this.state, error: err });
        } else {
            this.setState({
                ...this.state,
                error: null,
                trip: {
                    ...this.state.trip,
                    leaveAt: selectedDate
                }
            })
        }
    }
    _validateDeparture = (selectedDate) => {
        var currentDate = new Date()
        var newDate = new Date(selectedDate)
        if (currentDate > newDate) {
            return "Selected date must be in the future."
        }
    }

    _onFieldChange = (field, value) => {
        this.setState({
            ...this.state,
            trip: {
                ...this.state.trip,
                [field]: value
            }
        })
    }

    _setDetail = (detail, value) => {
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

    _addStop = (stop, details) => {
        newStop = {
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
                stops: this.state.trip.stops.concat(newStop)
            }
        })
    }

    _updateSelectedVehicule = (selectedVehicule) => {
        let seats = []
        for (let i = 1; i <= selectedVehicule.seats; i++) {
            seats.push(i)
        }

        this.setState({
            ...this.state,
            trip: {
                ...this.state.trip,
                vehicleId: selectedVehicule.id
            },
            seats: seats,
            selectedVehicule: `${selectedVehicule.make} ${selectedVehicule.model} ${selectedVehicule.year}`
        })
    }

    _removeSearchInput = (key) => {
        let stopsItem = this.state.stopsItem
        stopsItem.pop(key)
        this.setState({ stopsItem })
    }

    _addStopInput = (key) => {
        let stopsItem = this.state.stopsItem
        stopsItem.push(
            <Item key={key} style={styles.item}>
                <PlacesSearchField style={styles.stopsInput} placeholder='Pass by' onSearchResult={this._addStop} />
                <Icon style={styles.removeStopBtnIcon} type="MaterialIcons" name="close" onPress={this._removeSearchInput} />
            </Item>)
        this.setState({ stopsItem })
    }

    _updateVehicules = (vehicules) => {
        this.setState(prevState => ({
            vehicules: [
                ...prevState.vehicules,
                ...vehicules
            ]
        }))
    }

    _updateDriver = () => {
        this.setState({
            ...this.state,
            trip: {
                ...this.state.trip,
                driverId: this.props.user.id
            }
        })
    }

    _getVehiculeList = () => {
        const { accessToken, user } = this.props

        VehicleService.getVehiclesByUserId(accessToken, user.id).then(v => {
            if (v != null) {
                this._updateVehicules(v)
                this._updateSelectedVehicule(v[0])
            }
        }).catch(error => {
            console.log(error)
        })
    }

    _updateFrom = (from, details) => {
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

    _updateTo = (to, details) => {
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

    _createTrip = () => {
        var stops = [];
        stops[0] = this.state.source;
        stops.concat(this.state.trip.stops);
        stops[stops.length] = this.state.destination;
        this.state = {
            ...this.state,
            trip: {
                ...this.state.trip,
                stops: stops
            }
        }
        if (this.props.user.id) {
            if (!this.props.isFetching) {
                TripService.create(
                    this.props.accessToken,
                    {
                        ...this.state.trip
                    }
                )
                    .then(() => this.props.closeAddTripScreen())
                    .catch(error => {
                        console.log(error)
                        this.props.goToError()
                    })
            }
        } else {
            if (!this.props.isFetching) {
                this.props.createTrip(
                    this.props.accessToken,
                    ...this.state.trip
                )
                    .then(() => this.props.closeAddTripScreen())
                    .catch(error => {
                        console.log(error)
                        this.props.goToError()
                    })
            }
        }
    }

    render() {
        let addBtnVisible =
            this.state.trip.source != undefined &&
            this.state.trip.destination != undefined &&
            this.state.trip.leaveAt != '' &&
            this.state.trip.vehicleId != '' &&
            this.state.trip.driverId != '' &&
            this.state.trip.seats > 0

        let vehicules = (this.state.vehicules === undefined || this.state.vehicules.length == 0) ?
            [{ value: "", label: "No vehicle on your profile" }] :
            this.state.vehicules.map((vehicule, i) => {
                return { value: vehicule, label: vehicule.make + " " + vehicule.model }
            })

        let seats = (this.state.seats === undefined || this.state.seats.length == 0) ?
            [{ value: "", label: "Seats available" }] :
            this.state.seats.map((seat, i) => {
                return { value: seat, label: seat.toString() }
            })

        return (
            <Container styles={styles.container}>
                <Header noShadow>
                    <Left>
                        <Button transparent onPress={this._closeAddTripScreen}>
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
                                <PlacesSearchField placeholder='From (Pick Up Point)' onSearchResult={this._updateFrom} />
                            </Item>
                            {this.state.stopsItem.map((value, index) => {
                                return value
                            })}
                            <View style={styles.addStopItem}>
                                <Button iconLeft onPress={this._addStopInput}>
                                    <Icon style={{ color: 'white' }} name="add" />
                                    <Text style={{ color: 'white' }}>Add Stop</Text>
                                </Button>
                            </View>
                            <Item style={styles.item}>
                                <PlacesSearchField placeholder='To (Drop Off Point)' onSearchResult={this._updateTo} />
                            </Item>
                        </Form>
                    </View>
                    <ScrollView style={styles.formContainer}>
                        <DateTimePickerField label="Leave At" required={true} onValueChange={this._updateLeaveAt} onValidate={this._validateDeparture} error={'Selected date must be in the future.'} bottomBorder={true}></DateTimePickerField>
                        <PickerField label="Select a car" initialValue={this.state.selectedVehicule} items={vehicules} required={true} error={'Please select a car'} onValueChange={this._updateSelectedVehicule} />
                        <PickerField label="Number of free places (excluding driver)" initialValue={this.state.seats[0] ? this.state.seats[0].toString() : ""} items={seats} required={true} error={'Please select available seats'} onValueChange={value => this._onFieldChange('seats', value)} />
                        <AnimalPickerField label="Accept animal onboard" intialValue={this.state.trip.details.animals} onValueChange={(value) => this._setDetail('animals', value)}></AnimalPickerField>
                        <LuggagePickerField label="Size of accepted luggages" intialValue={this.state.trip.details.luggages} onValueChange={(value) => this._setDetail('luggages', value)}></LuggagePickerField>
                    </ScrollView>
                    <FooterButton formError={this.state.error != null} onPress={this._createTrip} text="Add a new trip"></FooterButton>
                </Content>
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

const mapStateToProps = state => ({
    user: UsersSelector.getUserConnected(state),
    accessToken: AuthSelector.getAccessToken(state),
    isFetching: isFetching(state)
})

const mapDispatchToProps = dispatch => ({
    closeAddTripScreen: () => dispatch(StackActions.pop({n: 1})),
    goToError: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Errors.HOME }))
})

export default astuvu(connect(mapStateToProps, mapDispatchToProps)(AddTripScreen))