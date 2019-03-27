import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Alert } from 'react-native'
import { Text, Button, Card, CardItem, Body, H1, H2, H3 } from 'native-base'

class VehiculeListItem extends Component {
    constructor(props) {
        super(props)
    }

    _deleteVehicule = (vehiculeId) => {
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
        const { vehicule } = this.props
        return (
            <Card>
                <CardItem>
                    <Body>
                        <View style={styles.titleCard}>
                            <H1>{vehicule.make.toUpperCase()}</H1>
                            <H2> - {vehicule.model}</H2>
                        </View>
                        <H3>{vehicule.year}</H3>
                        <Text>{vehicule.color.toUpperCase()}</Text>
                        <View style={styles.deletebtn}>
                            <Button transparent onPress={() => this._deleteVehicule(vehicule.id)}>
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
        flexDirection: 'row'
    },
    deletebtn: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    }
})

VehiculeListItem.propTypes = {
    vehicule: PropTypes.object,
    onDeleteVehicle: PropTypes.func
}

export default VehiculeListItem
