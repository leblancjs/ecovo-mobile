import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView } from 'react-native'
import VehiculeListItem from './VehiculeListItem'

class VehiculeList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { vehicules } = this.props
        let doMap = vehicules != undefined && vehicules.length > 0
        return (
            <View>
                <ScrollView>
                    {doMap &&
                        vehicules.map((v, i) => {
                            return (
                                <VehiculeListItem key={i} vehicule={v} />
                            )
                        })}
                </ScrollView>
            </View>
        )
    }
}

VehiculeList.propTypes = {
    vehicules: PropTypes.array
}

export default VehiculeList
