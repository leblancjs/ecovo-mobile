import React, { Component } from 'react'
import { StyleSheet, View} from 'react-native'
import { Icon, Fab } from 'native-base'
import { connect } from 'react-redux'
import { StackActions } from 'react-navigation'
import VehiculeList from '../../components/vehicules/VehiculeList'
import { VehicleService } from '../../service'
import { UsersSelector, VehiclesSelector, AuthSelector } from '../../selectors'
import { ScreenNames } from '../'

class VehiculeScreen extends Component {
    constructor(props) {
        super(props)
        this._getVehiculeList();
    }

    _getVehiculeList = () => {
        const { accessToken, user } = this.props;

        this.props.getVehiculeList(accessToken, user.id).then(v => {
            console.log("Vehicule Screen")
            console.log(v)
        }).catch(error => {
            console.log(error)
        })
    }

    _deleteVehicule = (vehiculeId) => {
        const { accessToken, user } = this.props;

        this.props.deleteVehicule(accessToken, user.id, vehiculeId).then(v => {

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
                <View style={styles.fabView}>
                    <Fab
                        active={true}
                        direction="up"
                        containerStyle={{}}
                        style={styles.fab}
                        position="bottomRight"
                        onPress={this.props.goToCreateVehicule}>
                        <Icon name="md-add" />
                    </Fab>
                </View>
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
    },
    fabView: {
    },
    fab: {
        backgroundColor: '#2BB267'
    }
})

const mapStateToProps = state => ({
    accessToken: AuthSelector.getAccessToken(state),
    user: UsersSelector.getUserConnected(state),
    vehicles: VehiclesSelector.getVehiclesByUser(state)
})

const mapDispatchToProps = dispatch => ({
    getVehiculeList: (accessToken, userId) => dispatch(VehicleService.getVehiclesByUserId(accessToken, userId)),
    goToCreateVehicule: () => dispatch(StackActions.push({ routeName: ScreenNames.Vehicules.CREATE })),
    deleteVehicule: (accessToken, userId, vehiculeId) => dispatch(VehicleService.remove(accessToken, userId, vehiculeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(VehiculeScreen)
