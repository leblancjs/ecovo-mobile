import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Container, Header, Left, Right, Body, Title, Text, Item, Icon, Button, Form, Picker, Content } from 'native-base'
import DatePicker from 'react-native-datepicker'
import { astuvu } from '../../components/hoc'
import PlacesSearchField from '../../components/astuvu-native/form/PlacesSearchField'
import { TripService, VehicleService } from '../../service'
import { isFetching, UsersSelector, AuthSelector } from '../../selectors'
import { ScreenNames } from '..'

class AddTripScreen extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)
        this.state = {
            trip: {
                source: undefined,
                destination: undefined,
                leaveAt: '',
                driverId: '',
                vehicleId: '',
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
            stopsItem: [],
            minDate: new Date(),
            leaveAtError: null
        }
    }

    componentDidMount() {
        if(this.state.trip.driverId == '') {
            this._updateDriver()
        }

        if(this.state.trip.vehicules === undefined || this.state.trip.vehicules.length == 0) {
            this._getVehiculeList()
        } 
    }

    _closeAddTripScreen = () => {
        this.props.closeAddTripScreen()
    }

    _updateLeaveAt = (selectedDate) => {
        var currentDate = new Date()
        var newDate = new Date(selectedDate)

        if (currentDate > newDate) {
            this.setState({leaveAtError: "Selected date must be in the future."});
        } else {
            this.setState({
                ...this.state,
                leaveAtError: null,
                trip: {
                    ...this.state.trip,
                    leaveAt: selectedDate
                }
            })
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
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            name: stop.description
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
        for(let i = 1; i <= selectedVehicule.seats; i++) {
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
        this.setState({stopsItem})
    }
    
    _addStopInput = (key) => {
        let stopsItem = this.state.stopsItem
        stopsItem.push(
                <Item key={key} style={styles.item}>
                    <PlacesSearchField style={styles.stopsInput} placeholder='Pass by' onSearchResult={this._addStop} />
                    <Icon style={styles.removeStopBtnIcon} type="MaterialIcons" name="close" onPress={this._removeSearchInput} />
                </Item>)
        this.setState({stopsItem})
    }

    _updateVehicules = (vehicules) => {
        this.setState(prevState => ({
            vehicules: [
                ...prevState.vehicules, 
                ...vehicules
            ]
          }))
    }

    _updateDriver = () => {
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

        this.props.getVehiculeList(accessToken, user.id).then(v => {
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
            trip: {
                ...this.state.trip,
                source: {
                    ...this.state.trip.source,
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    name: from.description
                }
            }
        })
    }

    _updateTo= (to, details) => {
        this.setState({
            ...this.state,
            trip: {
                ...this.state.trip,
                destination: {
                    ...this.state.trip.destination,
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    name: to.description
                }
            }
        })
    }

    _createTrip = () => {
        if (this.props.user.id) {
            if (!this.props.isFetching) {
                this.props.createTrip(
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
            <Picker.Item color="grey" value="" label="No vehicle on your profile" /> :
            this.state.vehicules.map( (vehicule, i) => {
                return <Picker.Item key={i} value={vehicule} label={vehicule.make + " " + vehicule.model} />
            })

        let seats = (this.state.seats === undefined || this.state.seats.length == 0) ?
            <Picker.Item color="grey" value="" label="Seats available" /> :
            this.state.seats.map( (seat, i) => {
                return <Picker.Item key={i} value={seat} label={String(seat)} />
            })

        return (
            <Container styles={styles.container}>
                <Header noShadow>
                    <Left>
                        <Button transparent onPress={this._closeAddTripScreen}>
                            <Icon name="close"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Add a Trip</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content
                    scrollEnabled={false}
                    contentContainerStyle={styles.container}
                >
                    <View style={styles.header}>
                        <Form style={styles.form}>
                            <Item style={styles.item}>
                                <PlacesSearchField placeholder='From (Pick Up Point)' onSearchResult={this._updateFrom}/>
                            </Item>
                            {this.state.stopsItem.map((value, index) => {
                                return value
                            })}
                            <View style={styles.addStopItem}>
                                <Button iconLeft onPress={this._addStopInput}>
                                    <Icon style={{color: 'white'}} name="add"/>
                                    <Text style={{color: 'white'}}>Add Stop</Text>
                                </Button>
                            </View>
                            <Item style={styles.item}>
                                <PlacesSearchField placeholder='To (Drop Off Point)' onSearchResult={this._updateTo} />
                            </Item>
                        </Form>
                    </View>
                    <ScrollView style={styles.formContainer}>
                        <Item style={styles.pickerItem}>
                            <DatePicker
                                style={styles.datePicker}
                                mode="datetime"
                                placeholder="Leave At"
                                date={this.state.trip.leaveAt}
                                format="YYYY-MM-DDThh:mm:ss.sZ"
                                minDate={this.state.minDate}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                is24Hour={true}
                                placeholder="Leave At"
                                onDateChange={value => this._updateLeaveAt(value)}
                                customStyles={{
                                    dateInput: styles.dateInput
                                }}
                            />
                        </Item>
                        {!!this.state.leaveAtError && (
                            <Item style={styles.errorMsgItem}>
                                <Text style={styles.errorMsg}>{this.state.leaveAtError}</Text>
                            </Item>
                        )}
                        <Item style={styles.pickerItem} picker>
                            <View style={styles.pickerContainer}>
                                <Picker style={styles.picker}
                                    placeholder='Car'
                                    placeholderStyle={styles.pickerText}
                                    selectedValue={this.state.selectedVehicule}
                                    textStyle={styles.pickerText}
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    onValueChange={vehicle => this._updateSelectedVehicule(vehicle)}>
                                    {vehicules}
                                </Picker>
                            </View>
                        </Item>
                        <Item style={styles.pickerItem} picker>
                            <View style={styles.pickerContainer}>
                                <Picker style={styles.picker}
                                    placeholder='Free Places'
                                    placeholderStyle={styles.pickerText}
                                    selectedValue={this.state.trip.seats}
                                    textStyle={styles.pickerText}
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    onValueChange={value => this._onFieldChange('seats', value)}>
                                {seats}
                                </Picker>
                            </View>
                        </Item>
                        <Item style={styles.selectItem}>
                            <Button large transparent onPress={() => this._setDetail('animals', 0)}>
                                <Icon type="Foundation" style={[styles.mediumIcon, this.state.trip.details.animals == 0 ? styles.iconSelected : '']} name='no-dogs'/>
                            </Button>
                            <Button large transparent onPress={() => this._setDetail('animals', 1)}>
                                <Icon type="Foundation" style={[styles.mediumIcon, this.state.trip.details.animals == 1 ? styles.iconSelected : '']} name='guide-dog'/>
                            </Button>
                        </Item>
                        <Item style={styles.selectItem}>
                            <Button large transparent onPress={() => this._setDetail('luggages', 0)}>
                                <Icon type="Foundation" style={[styles.smallIcon, this.state.trip.details.luggages == 0 ? styles.iconSelected : '']} name='shopping-bag'/>
                            </Button>
                            <Button large transparent onPress={() => this._setDetail('luggages', 1)}>
                                <Icon type="Foundation" style={[styles.mediumIcon, this.state.trip.details.luggages == 1 ? styles.iconSelected : '']} name='shopping-bag'/>
                            </Button>
                            <Button large transparent onPress={() => this._setDetail('luggages', 2)}>
                                <Icon type="Foundation" style={[styles.bigIcon, this.state.trip.details.luggages == 2 ? styles.iconSelected : '']} name='shopping-bag' />
                            </Button>
                        </Item>
                    </ScrollView>
                    <View>
                        {
                            addBtnVisible &&
                            <Item style={styles.addBtnContainer}>
                                <Button style={styles.addBtn} onPress={this._createTrip}>
                                    <Text style={styles.submitForm}>Add</Text>
                                </Button>
                            </Item>
                        }
                    </View>
                </Content>
            </Container>
        )
    }
}

const inputStyle = {
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
    paddingLeft: 16,
    height: 58
}
const headerTitle = {
    color: '#fff',
    fontSize: 24
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
    },
    header: {
        backgroundColor: '#2BB267',
    },
    headerTitle: {
        borderBottomWidth: 0,
    },
    headerTitleText: {
        ...headerTitle
    },
    headerTitleCloseButton: {
        ...headerTitle
    },
    addStopBtn: {
        ...headerTitle,
        width: '35%'
    },
    addStopBtnTxt: {
        color: '#FFF',
        padding: 0
    },
    addStopIcon: {
        color: '#FFF',
        marginRight: 0,
        marginLeft: 0
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
    input: {
        ...inputStyle,
    },
    submitForm: {
        color: '#fff',
        fontSize: 18,
    },
    dateInput: {
        ...inputStyle,
        borderColor: '#fff',
        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
        textAlign: 'left',
    },
    addBtnContainer: {
        width: 300,
        alignSelf: 'center',
    },
    addBtn: {
        width: '100%',
        marginTop: 80,
        marginBottom: 20,
        justifyContent: 'center',
        backgroundColor: "#2BB267",
    },
    pickerContainer: {
        ...inputStyle,
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    pickerItem: {
        alignSelf: 'center',
        width: '80%'
    },
    picker: {
        width: '100%'
    },
    pickerText: {
        color: 'rgba(0, 0, 0, 0.6)'
    },
    datePicker: { 
        width: '80%', 
        alignSelf: 'center', 
        padding: 20 
    },
    addStopItem: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    smallIcon: {
        fontSize: 20,
        color: 'black'
    },
    mediumIcon: {
        fontSize: 30,
        color: 'black'
    },
    bigIcon: {
        fontSize: 50,
        color: 'black'
    },
    selectItem: {
        alignSelf: 'center'
    },
    iconSelected: {
        color: "#2BB267"
    },
    errorMsg: {
        color: '#FF0000'
    },
    errorMsgItem: {
        marginLeft: 40,
        borderBottomWidth: 0
    },
    formContainer: {
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
    createTrip: (accessToken, trip) => dispatch(TripService.create(accessToken, trip)),
    getVehiculeList: (accessToken, userId) => dispatch(VehicleService.getVehiclesByUserId(accessToken, userId)),
    goToError: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Errors.HOME }))
})

export default astuvu(connect(mapStateToProps, mapDispatchToProps)(AddTripScreen))