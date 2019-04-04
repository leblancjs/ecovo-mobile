import React, { Component } from 'react'
import { Marker } from 'react-native-maps'
import { View } from 'react-native'
import { Point } from '../../entities'

export interface EcovoMarkersMapProps {
    stops: Point[]
}

export const EcovoMarkersMapDefaultProps = {
    stops: [],
}

class EcovoMarkersMap extends Component<EcovoMarkersMapProps> {
    static defaultProps = EcovoMarkersMapDefaultProps

    constructor(props: EcovoMarkersMapProps) {
        super(props)
    }

    render = () => {
        const { stops } = this.props

        return (
            <View>
                {stops.map((m, i) => {
                    if (m !== null && (m.latitude !== null || m.latitude !== 0) && (m.longitude !== null || m.longitude !== 0)) {
                        return <Marker
                            key={i}
                            coordinate={{
                                latitude: m.latitude,
                                longitude: m.longitude
                            }}
                            title={m.name || ''}
                        />
                    }
                })}
            </View>
        )
    }
}

export default EcovoMarkersMap