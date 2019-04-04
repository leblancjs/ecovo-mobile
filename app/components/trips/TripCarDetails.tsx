import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, CardItem, Icon } from 'native-base'
import { Vehicle } from '../../entities'

export interface TripCarDetailsProps {
    vehicle: Partial<Vehicle>
}

class TripCarDetails extends Component<TripCarDetailsProps> {
    constructor(props: TripCarDetailsProps) {
        super(props)
    }

    render() {
        const { make, model, year, color} = this.props.vehicle

        return (
            <CardItem header>
                <Icon type="MaterialIcons" name="directions-car" />
                <View style={styles.viewStyle}>
                    <View style={styles.textSameLine}>
                        <Text>{make} {model}</Text>
                        <Text style={styles.textLight}> {year}</Text>
                    </View>
                    <Text style={styles.textLight}>{color}</Text>
                </View>
            </CardItem>
        )
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
    },
    textSameLine: {
        flexDirection: 'row',
    },
    textLight: {
        fontWeight: 'normal',
    },
})

export default TripCarDetails