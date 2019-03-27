import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Container, Card } from 'native-base'
import moment from 'moment'
import EcovoMapView from '../astuvu-native/EcovoMapView'
import TripCarDetails from './TripCarDetails'
import TripStopDetails from './TripStopDetails'

class TripDetails extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)
    }

    renderLoadingMap() {
        const { trip } = this.props;
        if (!trip) {
            return <ActivityIndicator size="large" color="#2bb267" />
        } else {
            let marker = [];
            marker.push(trip.source)
            marker = marker.concat(trip.stops)
            marker.push(trip.destination)

            return <EcovoMapView markers={marker} source={trip.source} destination={trip.destination} steps={marker} />
        }
    }

    renderStopDetail() {
        const { trip } = this.props;
        if (!trip || !trip.source || !trip.destination) {
            return <ActivityIndicator size="large" color="#2bb267" />
        } else {
            let marker = [];
            trip.source.name = 'Origin'
            trip.source.hour = moment(trip.leaveAt).format('LT')
            marker.push(trip.source)
            marker = marker.concat(trip.stops)
            trip.destination.name = 'Destination'
            trip.destination.hour = moment(trip.arriveBy).format('LT')
            marker.push(trip.destination)

            return <TripStopDetails stops={marker} />
        }
    }

    render() {
        const { vehicule } = this.props;
        return (
            <Container style={styles.container}>
                {this.renderLoadingMap()}
                <View style={styles.bottom}>
                    <Card style={styles.cardStyle}>
                        <TripCarDetails carMake={vehicule.make} carModel={vehicule.model} carYear={vehicule.year} carColor={vehicule.color} />
                        {this.renderStopDetail()}
                    </Card>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    bottom: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        justifyContent: 'flex-end',
        padding: 5,
        paddingBottom: 8,
        height: '30%',
    },
    cardStyle: {
        paddingBottom: 60
    }
})

TripDetails.propTypes = {
    trip: PropTypes.object,
    vehicule: PropTypes.object
}

export default TripDetails;