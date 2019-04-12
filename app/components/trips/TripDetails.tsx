import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Card } from 'native-base'
import EcovoMapView from '../astuvu-native/EcovoMapView'
import TripCarDetails from './TripCarDetails'
import TripStopDetails from './TripStopDetails'
import { Trip, Vehicle, Point } from '../../entities'
import Fab from '../astuvu-native/Fab';

export interface TripDetailsProps {
    trip: Trip
    vehicle: Vehicle
    isReservable?: boolean
    onFabTapped?: Function
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
                <EcovoMapView stops={markers} />
                <View style={styles.bottom}>
                    <Card style={styles.cardStyle}>
                        <TripCarDetails vehicle={this.props.vehicle} />
                        <TripStopDetails stops={this.props.trip.stops} />
                    </Card>
                </View>
                {
                    this.props.isReservable &&
                    <Fab icon="add-shopping-cart" iconStyle="MaterialIcons" onPress={this.props.onFabTapped}></Fab>
                }
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