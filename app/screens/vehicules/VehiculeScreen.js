import React, { Component } from 'react'
import { StyleSheet, View} from 'react-native'
import { connect } from 'react-redux'
import { StackActions } from 'react-navigation'
import VehiculeList from '../../components/vehicules/VehiculeList'
import { VehicleService } from '../../service'
import { UsersSelector, VehiclesSelector, AuthSelector } from '../../selectors'
import { ScreenNames } from '../'
import Fab from '../../components/astuvu-native/Fab';

class VehiculeScreen extends Component {
    constructor(props) {
        super(props)
        this._getVehiculeList();
    }

    _getVehiculeList = () => {
        const { accessToken, user } = this.props;

        VehicleService.getVehiclesByUserId(accessToken, user.id).then(v => {
            console.log("Vehicule Screen")
            console.log(v)
        }).catch(error => {
            console.log(error)
        })
    }

    _deleteVehicule = (vehiculeId) => {
        const { accessToken, user } = this.props;

        VehicleService.remove(accessToken, user.id, vehiculeId).then(v => {

        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        const { vehicles } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <VehiculeList vehicules={vehicles} onDeleteVehicle={this._deleteVehicule}/>
                </View>
                <Fab onPress={this.props.goToCreateVehicule} icon="md-add"></Fab>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        margin: 8
    }
})

const mapStateToProps = state => ({
    accessToken: AuthSelector.getAccessToken(state),
    user: UsersSelector.getUserConnected(state),
    vehicles: VehiclesSelector.getVehiclesByUser(state)
})

const mapDispatchToProps = dispatch => ({
    goToCreateVehicule: () => dispatch(StackActions.push({ routeName: ScreenNames.Vehicules.CREATE })),
})

export default connect(mapStateToProps, mapDispatchToProps)(VehiculeScreen)
