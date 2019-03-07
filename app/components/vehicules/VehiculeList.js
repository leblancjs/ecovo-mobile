import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView } from 'react-native'
import VehiculeItemList from './VehiculeItemList'

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
                                <VehiculeItemList key={i} vehicule={v} />
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
