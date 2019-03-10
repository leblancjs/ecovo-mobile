import React, { Component } from 'react';
import { StyleSheet, View, Slider } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Text, Fab, Card, CardItem, Body, Icon, Input, Button, Form, Item } from 'native-base';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
import GooglePlacesInput from '../../astuvu-native/GooglePlacesAutocomplete';
import RartingStars from '../../astuvu-native/RatingStars';

class SearchTripComponent extends Component {
    constructor(props) {
        super(props);
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
                departureDate: date
            }
        })
    }

    _updateArrivalDate = (date) => {
        this.setState({
            ...this.state,
            searchParam: {
                ...this.state.searchParam,
                arrivalDate: date
            }
        })
    }

    _updateFrom = (from, details) => {
        this.setState({
            ...this.state,
            searchParam: {
                ...this.state.searchParam,
                from: from
            }
        })
    }

    _updateTo = (to, details) => {
        this.setState({
            ...this.state,
            searchParam: {
                ...this.state.searchParam,
                to: to
            }
        })
    }

    _updateRange = (value) => {
        this.setState({
            ...this.state,
            searchParam: {
                ...this.state.searchParam,
                pickupRadius: value
            }
        })
    }

    _updateMinimumRating = (value) => {
        this.setState({
            ...this.state,
            searchParam: {
                ...this.state.searchParam,
                driverRating: value
            }
        })
    }

    _searchTrips = () => {
        if (this.props.onSearchTrips) {
            this.props.onSearchTrips(this.state.searchParam);
        }
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
                            <Button transparent style={{ marginLeft: 'auto' }}>
                                <Text style={styles.submitForm}>Search</Text>
                            </Button>
                        </View>

                    </Form>
                </View>
                <DatePicker
                    style={{ width: '100%', padding: 20 }}
                    mode="datetime"
                    placeholder="select date"
                    date={this.state.searchParam.departureDate}
                    format="MMMM Do YYYY, h:mm:ss a"
                    minDate={this.state.minDate}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    is24Hour={true}
                    placeholder="Departure Time"
                    onDateChange={this._updateDepartureDate}
                    customStyles={{
                        dateInput: styles.dateInput
                    }}
                />
                <DatePicker
                    style={{ width: '100%', padding: 20 }}
                    mode="datetime"
                    placeholder="select date"
                    date={this.state.searchParam.arrivalDate}
                    format="MMMM Do YYYY, h:mm:ss a"
                    minDate={this.state.minDate}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    is24Hour={true}
                    placeholder="Arrival Time"
                    onDateChange={this._updateArrivalDate}
                    customStyles={{
                        dateInput: styles.dateInput
                    }}
                />
                <View style={styles.containerFilter}>
                    <Text style={styles.filterDescription}>Pickup range ({this.state.searchParam.pickupRadius} Km)</Text>
                    <Slider
                        style={{width:'80%', alignSelf:'center'}}
                        value={this.state.searchParam.pickupRadius}
                        onValueChange={value => this._updateRange(value)}
                        step={1}
                        minimumValue={0}
                        minimumTrackTintColor={'#2BB267'}
                        maximumValue={500} />
                </View>
                <View style={styles.containerFilter}>
                    <Text style={styles.filterDescription}>Driver's Minimal Rating</Text>
                    <RartingStars onValueChange={this._updateMinimumRating}></RartingStars>
                </View>
                <View style={styles.updateBtnWrapper}>
                        <Button transparent
                            onPress={this._searchTrips} style={styles.updatebutton}>
                        <Text style={{color:'#fff'}}>Advanced Search</Text>
                        </Button>
                </View>
            </Container>
        );
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
};
const headerTitle = {
    color: '#fff',
    fontSize: 24
};

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
        color: '#fff',
        alignSelf: 'flex-end',
        fontSize: 18,
    },
    dateInput: {
        ...inputStyle,
        borderColor: '#fff',
        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
        textAlign: 'left',
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
});
SearchTripComponent.propTypes = {
    onCloseComponent: PropTypes.func.isRequired,
    onSearchTrips: PropTypes.func.isRequired,
}
export default SearchTripComponent