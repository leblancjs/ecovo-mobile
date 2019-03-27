import React, { Component } from 'react'
import { Marker } from 'react-native-maps'
import PropTypes from 'prop-types'
import { View } from 'react-native'

class EcovoMarkersMap extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)
    }

    render() {
        const { markers } = this.props
        return (
            <View>
                {markers.map((m, i) => {
                    if (m !== null && (m.latitude !== null || m.latitude !== 0) && (m.longitude !== null || m.longitude !== 0)) {
                        return <Marker
                            key={i}
                            coordinate={{
                                latitude: m.latitude,
                                longitude: m.longitude
                            }}
                            title={m.title}
                            description={m.description}
                        />
                    }
                })}
            </View>
        )
    }
}

EcovoMarkersMap.propTypes = {
    markers: PropTypes.array
}

export default EcovoMarkersMap;