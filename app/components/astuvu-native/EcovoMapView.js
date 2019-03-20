import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps'
import PropTypes from 'prop-types'
import EcovoMapDirection from './EcovoMapDirection'
import EcovoMarkersMap from './EcovoMarkersMap'

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

class EcovoMapView extends React.Component {

    map = null;

    constructor(props) {
        super(props)

        let latitude = 46.189945;
        let longitude = -72.431703;
        let latitudeDelta = 5.0
        let longitudeDelta = 5.0

        if (props.source && props.destination) {
            latitude = (props.source.latitude + props.destination.latitude) / 2
            longitude = (props.source.longitude + props.destination.longitude) / 2
            minLat = Math.min(props.source.latitude, props.destination.latitude)
            maxLat = Math.max(props.source.latitude, props.destination.latitude)
            minLong = Math.min(props.source.longitude, props.destination.longitude)
            maxLong = Math.max(props.source.longitude, props.destination.longitude)

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
            ready: true
        }
    }

    componentDidMount() {
        //this._getCurrentPosition();
    }

    _setRegion(region) {
        if (this.state.ready) {
            setTimeout(() => this.map.animateToRegion(region), 10);
        }
    }

    _getCurrentPosition() {
        try {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const region = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    };
                    if (this.map !== undefined) {

                        this._setRegion(region);
                    }
                },
                (error) => {
                }
            );
        } catch (e) {
            alert(e.message || "");
        }
    };

    _onMapReady = (e) => {
        if (!this.state.ready) {
            this.setState({ ready: true });
        }
    };

    _onRegionChange = (region) => {
        if (this.props.onRegionChange) {
            this.props.onRegionChange(region);
        }
    };

    _onRegionChangeComplete = (region) => {
        if (this.props.onRegionChangeComplete) {
            this.props.onRegionChangeComplete(region);
        }
    };

    render() {

        const { children, renderMarker, markers, steps, source, destination } = this.props;
        const { region } = this.state

        return (
            <MapView
                showsUserLocation
                ref={map => { this.map = map }}
                initialRegion={region}
                renderMarker={renderMarker}
                onMapReady={this._onMapReady}
                showsMyLocationButton={false}
                onRegionChange={this._onRegionChange}
                onRegionChangeComplete={this._onRegionChangeComplete}
                style={StyleSheet.absoluteFill}
                textStyle={{ color: '#bc8b00' }}
                containerStyle={{ backgroundColor: 'white', borderColor: '#BC8B00', zIndex: -1 }}>

                {children && children || null}

                {source && destination && steps &&
                    <EcovoMapDirection steps={steps} source={source} destination={destination}/>
                }

                {markers &&
                    <EcovoMarkersMap markers={markers} />
                }

            </MapView>
        );
    }
}

EcovoMapView.propTypes = {
    onRegionChange: PropTypes.func,
    onRegionChangeComplete: PropTypes.func,
    markers: PropTypes.array,
    source: PropTypes.object,
    destination: PropTypes.object,
    steps: PropTypes.array
}

export default EcovoMapView;