import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import EcovoMapDirection from './EcovoMapDirection'
import EcovoMarkersMap from './EcovoMarkersMap'
import { Point } from '../../entities'

const LATITUDE_DELTA = 0.01
const LONGITUDE_DELTA = 0.01

export interface EcovoMapViewRegion {
    latitude: number
    latitudeDelta: number
    longitude: number
    longitudeDelta: number
}

export interface EcovoMapViewProps {
    stops: Point[],
    onRegionChange?: (region: EcovoMapViewRegion) => void,
    onRegionChangeComplete?: (region: EcovoMapViewRegion) => void,
}

export interface EcovoMapViewState {
    region: EcovoMapViewRegion
    ready: boolean
}

export const EcovoMapViewDefaultProps = {
    stops: [],
    onRegionChange: undefined,
    onRegionChangeComplete: undefined,
}

class EcovoMapView extends Component<EcovoMapViewProps, EcovoMapViewState> {
    static defaultProps = EcovoMapViewDefaultProps

    private map: any = null

    constructor(props: EcovoMapViewProps) {
        super(props)

        let latitude = 46.189945
        let longitude = -72.431703
        let latitudeDelta = 5.0
        let longitudeDelta = 5.0

        const source = props.stops[0]
        const destination = props.stops[props.stops.length - 1]

        if (source && destination) {
            latitude = (source.latitude + destination.latitude) / 2
            longitude = (source.longitude + destination.longitude) / 2

            const minLat = Math.min(source.latitude, destination.latitude)
            const maxLat = Math.max(source.latitude, destination.latitude)
            const minLong = Math.min(source.longitude, destination.longitude)
            const maxLong = Math.max(source.longitude, destination.longitude)

            latitudeDelta = maxLat - minLat + 1
            longitudeDelta = maxLong - minLong + 1
        }

        this.state = {
            region: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
            },
            ready: true,
        }
    }

    componentDidMount() {
        // TODO: Fix this
        // this.getCurrentPosition()
    }

    private setRegion(region: EcovoMapViewRegion): void {
        if (this.state.ready) {
            setTimeout(() => this.map.animateToRegion(region), 10)
        }
    }

    private getCurrentPosition(): void {
        try {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const region = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }

                    if (this.map !== undefined) {
                        this.setRegion(region)
                    }
                },
                (error) => {
                }
            )
        } catch (e) {
            alert(e.message || "")
        }
    }

    private onMapReady = (): void => {
        if (!this.state.ready) {
            this.setState({ ready: true })
        }
    }

    private onRegionChange = (region: EcovoMapViewRegion): void => {
        if (this.props.onRegionChange) {
            this.props.onRegionChange(region)
        }
    }

    private onRegionChangeComplete = (region: EcovoMapViewRegion): void => {
        if (this.props.onRegionChangeComplete) {
            this.props.onRegionChangeComplete(region)
        }
    }

    render = () => {
        const { children, stops } = this.props
        const { region } = this.state

        const source = stops[0]
        const destination = stops[stops.length - 1]

        return (
            <MapView
                showsUserLocation
                ref={map => { this.map = map }}
                initialRegion={region}
                onMapReady={this.onMapReady}
                showsMyLocationButton={false}
                onRegionChange={this.onRegionChange}
                onRegionChangeComplete={this.onRegionChangeComplete}
                style={StyleSheet.absoluteFill}
            >
                {children && children || null}

                {
                    source && destination && stops &&
                        <EcovoMapDirection stops={stops}/>
                }

                {
                    stops &&
                        <EcovoMarkersMap stops={stops} />
                }
            </MapView>
        )
    }
}

export default EcovoMapView