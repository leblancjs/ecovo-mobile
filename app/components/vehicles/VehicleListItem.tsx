import React, { Component } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { Text, Button, Card, CardItem, Body, H1, H2, H3 } from 'native-base'
import { Vehicle } from '../../entities'

export interface VehicleListItemProps {
    vehicle: Vehicle
    onDeleteVehicle: (vehicleId: string) => void
}

class VehicleListItem extends Component<VehicleListItemProps> {
    constructor(props: VehicleListItemProps) {
        super(props)
    }

    private deleteVehicle = (vehiculeId: string): void => {
        Alert.alert(
            'Vehicle delete',
            'Are you sure to delete this vehicle?',
            [
                { text: 'Yes', onPress: () => this.props.onDeleteVehicle(vehiculeId) },
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                }
            ],
            { cancelable: false },
        );
    }

    render() {
        const { vehicle } = this.props

        return (
            <Card>
                <CardItem>
                    <Body>
                        <View style={styles.titleCard}>
                            <H1>{`${vehicle.make} ${vehicle.model} ${vehicle.year}`}</H1>
                        </View>
                        <Text>{vehicle.color.toUpperCase()}</Text>
                        <View style={styles.deletebtn}>
                            <Button transparent onPress={() => this.deleteVehicle(vehicle.id || '')}>
                                <Text>DELETE</Text>
                            </Button>
                        </View>
                    </Body>
                </CardItem>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    titleCard: {
        flex: 1,
        flexDirection: 'row',
    },
    deletebtn: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
})

export default VehicleListItem
