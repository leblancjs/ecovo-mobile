import React, { Component } from 'react';
import { StyleSheet, View, Slider, ScrollView } from 'react-native';
import { Container, Text, Icon, Button, Form, Item, Radio } from 'native-base';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
import GooglePlacesInput from '../../astuvu-native/GooglePlacesAutocomplete';
import { Dropdown } from 'react-native-material-dropdown';
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

class SearchTripComponent extends Component {

    constructor(props) {
        super(props);

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
            this.props.onCloseComponent();
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
            this.props.onSearchTrips(this.state.searchParam);
        }
    }

    _isAdvancedSearchButtonEnabled = () => {
        return this.state.searchParam.source != ""
            && this.state.searchParam.destination != ""
            && (this.state.searchParam.leaveAt != null || this.state.searchParam.arriveBy);

    }

    _isSearchButtonEnabled = () => {
        return this.state.searchParam.source != ""
            && this.state.searchParam.destination != "";
    }

    render() {
        return (
            <Container>
                <View style={styles.header}>
                    <Item style={styles.headerTitle}>
                        <Button transparent onPress={this._onClosePressed}>
                            <Icon style={styles.headerTitleCloseButton} type="MaterialIcons" name="close" />
                        </Button>
                        <Text style={styles.headerTitleText}>Search a trip</Text>
                    </Item>
                    <Form style={styles.form}>
                        <Item style={styles.item}>
                            <GooglePlacesInput placeholder='From' onSearchResult={this._updateFrom} />
                        </Item>
                        <Item style={styles.item}>
                            <GooglePlacesInput placeholder='To' onSearchResult={this._updateTo} />
                        </Item>
                        <View style={{ flexDirection: 'row' }}>
                            <Button
                                transparent
                                disabled={!this._isSearchButtonEnabled()}
                                style={{ marginLeft: 'auto' }}
                                onPress={this._searchTrips}>
                                <Text style={this._isSearchButtonEnabled() ? styles.submitForm : styles.submitFormDisabled}>Search</Text>
                            </Button>
                        </View>

                    </Form>
                </View>
                <ScrollView >
                    <View style={styles.timeRadioButton}>
                        <Item style={styles.radioButtonItem}>
                            <Radio
                                color={"#2BB267"}
                                selectedColor={"#2BB267"}
                                selected={this.state.isLeaveAt}
                                onPress={() => this.setState({isLeaveAt: true, isArriveBy: false})}
                            />
                            <Text style={styles.radioButtonText}>Leave At</Text>
                        </Item>
                        <Item style={styles.radioButtonItem}>
                            <Radio
                                color={"#2BB267"}
                                selectedColor={"#2BB267"}
                                selected={this.state.isArriveBy}
                                onPress={() => this.setState({isLeaveAt: false, isArriveBy: true})}
                            />
                            <Text style={styles.radioButtonText}>Arrive By</Text>
                        </Item>
                    </View>
                    
                    <View style={{height: 700}}>
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
                            <Button transparent onPress={() => this._updateAnimals(0)}>
                                <Foundation style={[styles.bigIcon, this.state.searchParam.detailsAnimals == 0 ? styles.iconSelected : '']} name='no-dogs' solid />
                            </Button>
                            <Button transparent onPress={() => this._updateAnimals(1)}>
                                <Foundation style={[styles.mediumIcon, this.state.searchParam.detailsAnimals == 1 ? styles.iconSelected : '']} name='guide-dog' solid />
                            </Button>
                        </Item>
                        <Item style={styles.selectItem}>
                            <Button transparent onPress={() => this._updateLuggages(0)}>
                                <FontAwesome5 style={[styles.smallIcon, this.state.searchParam.detailsLuggages == 0 ? styles.iconSelected : '']} name='suitcase' solid />
                            </Button>
                            <Button transparent onPress={() => this._updateLuggages(1)}>
                                <FontAwesome5 style={[styles.mediumIcon, this.state.searchParam.detailsLuggages == 1 ? styles.iconSelected : '']} name='suitcase' solid />
                            </Button>
                            <Button transparent onPress={() => this._updateLuggages(2)}>
                                <FontAwesome5 style={[styles.bigIcon, this.state.searchParam.detailsLuggages == 2 ? styles.iconSelected : '']} name='suitcase' solid />
                            </Button>
                        </Item>
                    </View>
        

                </ScrollView>

                <View style={styles.updateBtnWrapper}>
                    <Button transparent
                        disabled={!this._isAdvancedSearchButtonEnabled()}
                        onPress={this._searchTrips} style={styles.updatebutton}>
                        <Text style={this._isAdvancedSearchButtonEnabled() ? { color: '#fff' } : { color: '#ddd' }}>Advanced Search</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}
const numberOfPassenger = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4, }];
const luggages = [
    { value: 0, label: 'None' },
    { value: 1, label: 'Small luggage' },
    { value: 2, label: 'Big luggage' }];
const animals = [
    { value: 0, label: 'No animal' },
    { value: 1, label: 'One animal' }];
const inputStyle = {
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
    paddingLeft: 16,
    height: 58
};
const headerTitle = {
    color: '#fff',
    fontSize: 24
};
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
        backgroundColor: '#2BB267',
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
        flexDirection: 'row',
        margin: 20,
        alignSelf: 'flex-start'
    },
    radioButtonItem: {
        flex: 0.5,
        alignContent: 'flex-start',
        borderBottomWidth: 0
    },
    radioButtonText: {
        textAlign: 'left',
        marginLeft: 20
    },
    smallIcon: {
        fontSize: 20,
        margin: 30
    },
    mediumIcon: {
        fontSize: 30,
        margin: 30
    },
    bigIcon: {
        fontSize: 50,
        margin: 30
    },
    selectItem: {
        alignSelf: 'center',
        marginTop: 30,
        borderBottomWidth: 0
    },
    iconSelected: {
        color: "#2BB267",
        borderRadius: 50,
    },
});
SearchTripComponent.propTypes = {
    onCloseComponent: PropTypes.func.isRequired,
    onSearchTrips: PropTypes.func.isRequired,
}
export default SearchTripComponent