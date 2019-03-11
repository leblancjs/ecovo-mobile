import React, { Component } from 'react'
import { StyleSheet, View, Image, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { withStatusBar } from '../../hoc';
import TripCardCarousel from '../../astuvu-native/TripCardCarousel';
import { Container } from 'native-base';
import EcovoMapView from '../../astuvu-native/EcovoMapView';

class TripResultsScreen extends Component {
    items = [{ time: '3h25', price: 23.12, departure: new Date('2018-01-12'), arrival: new Date('2018-01-12'), stops: 1, car: { make: "Toyota", model: "Camry", year: 2016 } },
        { time: '3h25', price: 23.12, departure: new Date('2018-01-12'), arrival: new Date('2018-01-12'), stops: 1, car: { make: "Toyota", model: "Camry", year: 2016 } }
        ,{ time: '3h25', price : 23.12, departure: new Date('2018-01-12'), arrival: new Date('2018-01-12'), stops: 1, car: {make: "Toyota", model: "Camry", year : 2016}}];

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
    render() {
        return (
            <Container style={styles.container}>
                <EcovoMapView></EcovoMapView>

                <View style={styles.bottom}>
                    <TripCardCarousel style={styles.carousel} items={this.items}></TripCardCarousel>
                </View>
            </Container>


        );
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
    auth: state.auth
});
const mapDispatchToProps = dispatch => ({
    goToMap: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Trips.HOME }))
})

export default withStatusBar(connect(mapStateToProps, mapDispatchToProps)(TripResultsScreen));