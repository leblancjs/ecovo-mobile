import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import VehicleListItem from './VehicleListItem'
import { Vehicle } from '../../entities'

export interface VehicleListProps {
    vehicles: Vehicle[]
    onDeleteVehicle: (vehicleId: string) => void
}

class VehicleList extends Component<VehicleListProps> {
    constructor(props: VehicleListProps) {
        super(props)
    }

    render() {
        const { vehicles, onDeleteVehicle } = this.props

        return (
            <ScrollView style={styles.container}>
                {
                    vehicles.map((v, i) => {
                        return (
                            <VehicleListItem key={i} vehicle={v} onDeleteVehicle={onDeleteVehicle} />
                        )
                    })
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default VehicleList
