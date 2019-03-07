import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import { Card, CardItem, Body, H1, H2, H3 } from 'native-base'
import { connect } from 'react-redux'
import { deleteVehicule } from '../../actions/vehicules'

class VehiculeListItem extends Component {
    constructor(props) {
        super(props)
    }

    _deleteVehicule = (vehiculeId) => {
        const { credentials, user } = this.props.auth;

        Alert.alert(
            'Vehocile delete',
            'Are you sure to delete this vehicule?',
            [
                { text: 'Yes', onPress: () => this.props.deleteVehicule(credentials.accessToken, user.id, vehiculeId) },
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
                            <Button title='DELETE' color='#2bb267' onPress={() => this._deleteVehicule(vehicule.id)} />
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
    vehicule: PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    deleteVehicule: (accessToken, userId, vehiculeId) => dispatch(deleteVehicule(accessToken, userId, vehiculeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(VehiculeListItem)
