import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, ScrollView } from 'react-native'
import VehiculeListItem from './VehiculeListItem'

class VehiculeList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { vehicules } = this.props
        let doMap = vehicules != undefined && vehicules.length > 0
        return (
            <ScrollView styles={styles.container}>
                {doMap &&
                    vehicules.map((v, i) => {
                        return (
                            <VehiculeListItem key={i} vehicule={v} />
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
    vehicules: PropTypes.array
}

export default VehiculeList
