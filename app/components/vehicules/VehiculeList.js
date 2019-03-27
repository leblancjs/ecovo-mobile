import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, ScrollView } from 'react-native'
import VehiculeListItem from './VehiculeListItem'

class VehiculeList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { vehicules, onDeleteVehicle } = this.props
        let doMap = vehicules != undefined && vehicules.length > 0
        return (
            <ScrollView styles={styles.container}>
                {doMap &&
                    vehicules.map((v, i) => {
                        return (
                            <VehiculeListItem key={i} vehicule={v} onDeleteVehicle={onDeleteVehicle}/>
                        )
                    })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

VehiculeList.propTypes = {
    vehicules: PropTypes.array,
    onDeleteVehicle: PropTypes.func
}

export default VehiculeList
