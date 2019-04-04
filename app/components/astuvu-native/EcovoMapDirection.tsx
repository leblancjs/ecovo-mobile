import React, { Component } from 'react'
// Well... no types for this one :'(.
import MapViewDirections from 'react-native-maps-directions'
import { GoogleMapsConfig } from '../../config'
import { Point } from '../../entities'

export interface EcovoMapDirectionProps {
    stops: Point[]
}

export const EcovoMapDirectionDefaultProps = {
    stops: [],
}

class EcovoMapDirection extends Component<EcovoMapDirectionProps> {
    static defaultProps = EcovoMapDirectionDefaultProps

    constructor(props: EcovoMapDirectionProps) {
        super(props)
    }

    render() {
        const { stops } = this.props
        const source = stops[0]
        const destination = stops[stops.length - 1]
        
        return (
            <MapViewDirections
                origin={source}
                waypoints={stops}
                destination={destination}
                apikey={GoogleMapsConfig.apiKey}
                strokeWidth={2}
                strokeColor='#007aff'
            />
        )
    }
}

export default EcovoMapDirection