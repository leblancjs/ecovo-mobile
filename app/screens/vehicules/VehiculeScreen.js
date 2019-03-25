import React, { Component } from 'react'
import { StyleSheet, View} from 'react-native'
import { Icon, Fab } from 'native-base'
import { connect } from 'react-redux'
import { StackActions } from 'react-navigation'
import VehiculeList from '../../components/vehicules/VehiculeList'
import { getVehiculeList } from '../../actions/vehicules'
import { ScreenNames } from '../'

class VehiculeScreen extends Component {
    constructor(props) {
        super(props)
        this._getVehiculeList();
    }

    _getVehiculeList = () => {
        const { credentials, user } = this.props.auth;

        this.props.getVehiculeList(credentials.accessToken, user.id).then(v => {
            console.log("Vehicule Screen")
            console.log(v)
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        const { vehicules } = this.props.vehicules
        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <VehiculeList vehicules={vehicules} />
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
    auth: state.auth,
    vehicules: state.vehicules
})

const mapDispatchToProps = dispatch => ({
    getVehiculeList: (accessToken, userId) => dispatch(getVehiculeList(accessToken, userId)),
    goToCreateVehicule: () => dispatch(StackActions.push({ routeName: ScreenNames.Vehicules.CREATE }))
})

export default connect(mapStateToProps, mapDispatchToProps)(VehiculeScreen)