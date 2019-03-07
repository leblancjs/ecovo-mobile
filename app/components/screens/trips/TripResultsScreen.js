import React, { Component } from 'react'
import { StyleSheet, View, Image, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { withStatusBar } from '../../hoc';
import { Container, Header, Content, Item, Input, Icon, Text } from 'native-base';


class TripResultsScreen extends Component {
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
                <Text>Loading Results</Text>

                <ActivityIndicator size="large" color="#2bb267" />
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