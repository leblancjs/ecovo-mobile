import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Card } from 'native-base'
import EcovoMapView from '../astuvu-native/EcovoMapView'
import TripCarDetails from './TripCarDetails'
import TripStopDetails from './TripStopDetails'
import { Trip, Vehicle, Point } from '../../entities'

export interface TripDetailsProps {
    trip: Trip
    vehicle: Vehicle
}

class TripDetails extends Component<TripDetailsProps> {
    constructor(props: TripDetailsProps) {
        super(props)
    }

    render() {
        const { trip } = this.props

        const markers: Point[] = trip.stops.map(stop => stop.point)
        
        return (
            <Container style={styles.container}>
                <EcovoMapView markers={markers} source={markers[0]} destination={markers[markers.length - 1]} stops={markers} />

                <View style={styles.bottom}>
                    <Card style={styles.cardStyle}>
                        <TripCarDetails vehicle={this.props.vehicle} />
                        <TripStopDetails stops={this.props.trip.stops} />
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
        paddingBottom: 8,
        height: '30%',
    },
    cardStyle: {
        paddingBottom: 60,
    },
})

export default TripDetails