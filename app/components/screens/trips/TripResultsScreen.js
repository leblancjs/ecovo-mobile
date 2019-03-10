import React, { Component } from 'react'
import { StyleSheet, View, Image, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { withStatusBar } from '../../hoc';
import TripCardCarousel from '../../astuvu-native/TripCardCarousel';

class TripResultsScreen extends Component {
    items = [{ title: 'test' }, { title: "HGello" }];

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
            <View style={styles.container}>
                <TripCardCarousel items={this.items}></TripCardCarousel>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})


const mapStateToProps = state => ({
    auth: state.auth
});
const mapDispatchToProps = dispatch => ({
    goToMap: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Trips.HOME }))
})

export default withStatusBar(connect(mapStateToProps, mapDispatchToProps)(TripResultsScreen));