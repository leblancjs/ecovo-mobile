import React, { Component } from 'react'
import { StyleSheet, View, Slider, ScrollView, TouchableOpacity } from 'react-native'
import { Container, Text, Icon, Button, Form, Item, Radio } from 'native-base'
import PropTypes from 'prop-types'
import DatePicker from 'react-native-datepicker'
import PlacesSearchField from '../astuvu-native/form/PlacesSearchField'
import { Dropdown } from 'react-native-material-dropdown'

class SearchTripComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            searchParam: {
                leaveAt: "0001-01-01T00:00:00Z",
                arriveBy: "0001-01-01T00:00:00Z",
                source: null,
                destination: null,
                radiusThresh: 5000,
                seats: 1,
                details: {
                    animals: 1,
                    luggages: 1,
                }


            },
            minDate: new Date(),
            isLeaveAt: true,
            isArriveBy: false
        }
    }
    _onClosePressed = () => {
        if (this.props.onCloseComponent) {
            this.props.onCloseComponent()
        }
    }

    _updateDepartureDate = (date) => {
        this.setState({
            ...this.state,
            searchParam: {
                ...this.state.searchParam,
                leaveAt: date
            }
        })
    }

    _updateArrivalDate = (date) => {
        this.setState({
            ...this.state,
            searchParam: {
                ...this.state.searchParam,
                arriveBy: date
            }
        })
    }

    _updateFrom = (from, details) => {
        this.setState({
            ...this.state,
            searchParam: {
                ...this.state.searchParam,
                source: {
                    ...this.state.searchParam.source,
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
            searchParam: {
                ...this.state.searchParam,
                destination: {
                    ...this.state.searchParam.destination,
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    name: to.description
                }
            }
        })
    }

    _updateRange = (value) => {
        this.setState({
            ...this.state,
            searchParam: {
                ...this.state.searchParam,
                radiusThresh: value
            }
        })
    }

    _updatePassenger = (value) => {
        this.setState({
            ...this.state,
            searchParam: {
                ...this.state.searchParam,
                seats: value,
            }
        })
    }
    

    _updateLuggages = (value) => {
        this.setState({
            ...this.state,
            searchParam: {
                ...this.state.searchParam,
                details: {
                    ...this.state.searchParam.details,
                    luggages: value
                }
            }
        })
    }

    _updateAnimals = (value) => {
        this.setState({
            ...this.state,
            searchParam: {
                ...this.state.searchParam,
                details: {
                    ...this.state.searchParam.details,
                    animals: value
                }
            }
        })
    }

    _searchTrips = () => {
        if (this.state.isArriveBy) {
            this.state.searchParam.leaveAt = "0001-01-01T00:00:00Z"
        } else {
            this.state.searchParam.arriveBy = "0001-01-01T00:00:00Z"
        }

        if (this.props.onSearchTrips) {
            this.props.onSearchTrips(this.state.searchParam)
        }
    }

    _isAdvancedSearchButtonEnabled = () => {
        return this.state.searchParam.source != ""
            && this.state.searchParam.destination != ""
            && (this.state.searchParam.leaveAt || this.state.searchParam.arriveBy)

    }

    render() {
        return (
            <Container>
                <View style={styles.header}>
                    <Item style={styles.headerTitle}>
                        <Button transparent onPress={this._onClosePressed}>
                            <Icon style={styles.headerTitleCloseButton} type="MaterialIcons" name="close" />
                        </Button>
                        <Text style={styles.headerTitleText}>Find a Trip</Text>
                    </Item>
                    <Form style={styles.form}>
                        <Item style={styles.item}>
                            <PlacesSearchField placeholder='From' onSearchResult={this._updateFrom} />
                        </Item>
                        <Item style={styles.item}>
                            <PlacesSearchField placeholder='To' onSearchResult={this._updateTo} />
                        </Item>
                    </Form>
                </View>
                <ScrollView style={{flex: 1 }}>
                    <View style={styles.timeRadioButton}>
                        <TouchableOpacity
                            style={styles.radioButtonItem}
                            onPress={() => this.setState({isLeaveAt: true, isArriveBy: false})}
                        >
                            <Radio
                                color={"#2BB267"}
                                selectedColor={"#2BB267"}
                                selected={this.state.isLeaveAt}
                            />
                            <Text style={styles.radioButtonText}>Leave At</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.radioButtonItem}
                            onPress={() => this.setState({isLeaveAt: false, isArriveBy: true})}
                        >
                            <Radio
                                color={"#2BB267"}
                                selectedColor={"#2BB267"}
                                selected={this.state.isArriveBy}
                            />
                            <Text style={styles.radioButtonText}>Arrive By</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Item>
                            { this.state.isLeaveAt && 
                                <DatePicker
                                    style={{ width: '100%', padding: 20 }}
                                    mode="datetime"
                                    placeholder="select date"
                                    date={this.state.searchParam.leaveAt}
                                    format="YYYY-MM-DDThh:mm:ss.sZ"
                                    minDate={this.state.minDate}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={false}
                                    is24Hour={true}
                                    placeholder="Leave At"
                                    onDateChange={this._updateDepartureDate}
                                    customStyles={{
                                        dateInput: styles.dateInput
                                    }}
                                />
                            }
                            { this.state.isArriveBy && 
                                <DatePicker
                                    style={{ width: '100%', padding: 20 }}
                                    mode="datetime"
                                    placeholder="select date"
                                    date={this.state.searchParam.arriveBy}
                                    format="YYYY-MM-DDThh:mm:ss.sZ"
                                    minDate={this.state.minDate}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={false}
                                    is24Hour={true}
                                    placeholder="Arrive By"
                                    onDateChange={this._updateArrivalDate}
                                    customStyles={{
                                        dateInput: styles.dateInput
                                    }}
                                />
                            }
                        </Item>
                        <View style={styles.containerFilter}>
                            <Text style={styles.filterDescription}>Pickup range ({this.state.searchParam.radiusThresh} m)</Text>
                            <Slider
                                style={{ width: '80%', alignSelf: 'center' }}
                                value={this.state.searchParam.radiusThresh}
                                onValueChange={value => this._updateRange(value)}
                                step={10}
                                minimumValue={0}
                                minimumTrackTintColor={'#2BB267'}
                                maximumValue={50000} />
                        </View>
                        <View style={styles.containerFilter}>
                            <Dropdown
                                label='Number of passengers'
                                data={numberOfPassenger}
                                value={this.state.searchParam.seats}
                                onChangeText={this._updatePassenger}
                            />
                        </View>
                        <Item style={styles.selectItem}>
                        {/* style={[styles.bigIcon, this.state.searchParam.detailsAnimals == 0 ? styles.iconSelected : {}]} */}
                            <Button large transparent onPress={() => this._updateAnimals(0)}>
                                <Icon type="Foundation" style={[styles.mediumIcon, this.state.searchParam.details.animals == 0 ? styles.iconSelected : '']} name='no-dogs'/>
                            </Button>
                            <Button large transparent onPress={() => this._updateAnimals(1)}>
                                <Icon type="Foundation" style={[styles.mediumIcon, this.state.searchParam.details.animals == 1 ? styles.iconSelected : '']} name='guide-dog'/>
                            </Button>
                        </Item>
                        <Item style={styles.selectItem}>
                            <Button large transparent onPress={() => this._updateLuggages(0)}>
                                <Icon type="Foundation" style={[styles.smallIcon, this.state.searchParam.details.luggages == 0 ? styles.iconSelected : '']} name='shopping-bag'/>
                            </Button>
                            <Button large transparent onPress={() => this._updateLuggages(1)}>
                                <Icon type="Foundation" style={[styles.mediumIcon, this.state.searchParam.details.luggages == 1 ? styles.iconSelected : '']} name='shopping-bag'/>
                            </Button>
                            <Button large transparent onPress={() => this._updateLuggages(2)}>
                                <Icon type="Foundation" style={[styles.bigIcon, this.state.searchParam.details.luggages == 2 ? styles.iconSelected : '']} name='shopping-bag' />
                            </Button>
                        </Item>
                    </View>
                </ScrollView>
                <View style={styles.updateBtnWrapper}>
                    <Button transparent
                        disabled={!this._isAdvancedSearchButtonEnabled()}
                        onPress={this._searchTrips} style={styles.updatebutton}>
                        <Text style={this._isAdvancedSearchButtonEnabled() ? { color: '#fff' } : { color: '#ddd' }}>Search</Text>
                    </Button>
                </View>
            </Container>
        )
    }
}
const numberOfPassenger = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4, }]
const luggages = [
    { value: 0, label: 'None' },
    { value: 1, label: 'Small luggage' },
    { value: 2, label: 'Big luggage' }]
const animals = [
    { value: 0, label: 'No animal' },
    { value: 1, label: 'One animal' }]
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
const submitForm = {
    color: '#fff',
    alignSelf: 'flex-end',
    fontSize: 18,
}
const styles = StyleSheet.create({
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
        ...submitForm
    },

    submitFormDisabled: {
        ...submitForm,
        color: '#ddd',
    },
    dateInput: {
        ...inputStyle,
        flex: 1,
        borderColor: '#fff',
        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
        textAlign: 'left',
        alignSelf: 'flex-start',
    },
    containerFilter: {
        padding: 20,
        height: 90,
    },
    filterDescription: {
        fontSize: 18,
        color: '#666',
        marginBottom: 10,
    },
    updateBtnWrapper: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        bottom: 40,
        justifyContent: 'flex-end',
        padding: 20,
        paddingBottom: 0,
    },
    updatebutton: {
        justifyContent: 'center',
        backgroundColor: "#2BB267",
        alignSelf: 'stretch',
        textAlign: 'center',
        padding: 10,
        marginBottom: 20,
    },
    timeRadioButton: {
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        alignContent: 'center'
    },
    radioButtonItem: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'flex-end',
        borderBottomWidth: 0
    },
    radioButtonText: {
        textAlign: 'left',
        marginLeft: 20
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
        alignSelf: 'center',
        padding: 8
    },
    iconSelected: {
        color: "#2BB267"
    },
})

SearchTripComponent.propTypes = {
    onCloseComponent: PropTypes.func.isRequired,
    onSearchTrips: PropTypes.func.isRequired,
}

export default SearchTripComponent