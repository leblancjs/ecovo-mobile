import React, { Component } from 'react'
import { StyleSheet, View} from 'react-native'
import { connect } from 'react-redux'
import { Dispatch, AnyAction } from 'redux'
import { StackActions, NavigationActions } from 'react-navigation'
import { VehicleService } from '../../services'
import { UserSelectors, VehicleSelectors } from '../../selectors'
import { ScreenNames } from '../'
import { VehicleList, Fab } from '../../components'
import { AppState } from '../../store'
import { User, Vehicle } from '../../entities'

export interface VehicleScreenProps {
    user: User
    vehicles: Vehicle[]
    goToCreateVehicle: () => void
}

interface VehicleScreenScreenState {
    user: User
    vehicles: Vehicle[]
    error: string | null
}

class VehicleScreen extends Component<VehicleScreenProps,VehicleScreenScreenState> {
    constructor(props: VehicleScreenProps) {
        super(props)
    }

    componentDidMount() {
        this.getVehicles()
    }

    private getVehicles = () => {
        VehicleService.getVehiclesByUserId(this.props.user.id || '')
            .catch(error => {
                console.log(`Failed to get the user's vehicles.`, error)
            })
    }

    private deleteVehicle = (vehicleId: string) => {
        VehicleService.delete(this.props.user.id || '', vehicleId)
            .catch(error => {
                console.log(`Failed to delete vehicle.`, error)
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <VehicleList vehicles={this.props.vehicles} onDeleteVehicle={this.deleteVehicle}/>
                </View>
                <Fab onPress={this.props.goToCreateVehicle} icon="md-add"></Fab>
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

const mapStateToProps = (state: AppState) => ({
    user: UserSelectors.getUserConnected(state),
    vehicles: VehicleSelectors.getVehiclesByUser(state),
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    goToCreateVehicle: () => dispatch(StackActions.push({ routeName: ScreenNames.Vehicules.CREATE })),
})

export default connect(mapStateToProps, mapDispatchToProps)(VehicleScreen)
