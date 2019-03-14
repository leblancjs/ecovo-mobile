import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { Container, Card } from 'native-base'
import { getTripList } from '../../../actions/trip'
import EcovoMapView from '../../astuvu-native/EcovoMapView'
import TripCarDetails from './TripCarDetails'
import TripStopDetails from './TripStopDetails'

var markers = [
    {
        latitude: 45.5016889,
        longitude: -73.567256,
        title: 'Origin',
        subtitle: 'Montreal',
        hour: "14h00",
        duration: "1h30"
    },
    {
        latitude: 45.404476,
        longitude: -71.888351,
        title: 'Stop 1',
        subtitle: 'Sherbrook',
        hour: "15h30",
        duration: "3h00"
    },
    {
        latitude: 46.3938,
        longitude: -72.6534,
        title: 'Stop 2',
        subtitle: 'Trois-Rivière',
        hour: "18h30",
        duration: "1h00"
    },
    {
        latitude: 46.8138,
        longitude: -71.2079,
        title: 'Destination',
        subtitle: 'Quebec',
        hour: "19h30"
    },
];

const origin = { latitude: 45.5016889, longitude: -73.567256 };
const destination = { latitude: 46.8138, longitude: -71.2079 };
const stopPoint = [{ latitude: 45.404476, longitude: -71.888351 }, { latitude: 46.3938, longitude: -72.6534 }]

class TripDetails extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)
        this.state = {
            user: props.auth.user,
        };
        this._getTripList();
    }

    _getTripList = () => {
        const { credentials, user } = this.props.auth;

        this.props.getTripList(credentials.accessToken, user.id).then(t => {
            console.log("Trip Screen")
            console.log(t)
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <Container style={styles.container}>
                <EcovoMapView markers={markers} origin={origin} destination={destination} stopPoints={stopPoint} />
                <View style={styles.bottom}>
                    <Card style={styles.cardStyle}>
                        <TripCarDetails carMake="Toyota" carModel="Camry" carYear="2016" carColor="Green" />
                        <TripStopDetails stops={markers} />
                    </Card>
                </View>
            </Container>
        )
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
        padding: 5,
        paddingBottom: 0,
        height: '30%'
    },
    cardStyle: {
        paddingBottom: 60
    }
})

const mapStateToProps = state => ({
    auth: state.auth,
    trip: state.trip
});
const mapDispatchToProps = dispatch => ({
    getTripList: (accessToken, userId) => dispatch(getTripList(accessToken, userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TripDetails);