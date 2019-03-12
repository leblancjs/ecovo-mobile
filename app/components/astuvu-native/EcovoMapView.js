import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps'
import PropTypes from 'prop-types'
import EcovoMapDirection from './EcovoMapDirection'
import EcovoMarkersMap from './EcovoMarkersMap'

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const initialRegion = {
    latitude: 46.189945,
    longitude: -72.431703,
    latitudeDelta: 5.0,
    longitudeDelta: 5.0,
}

class EcovoMapView extends React.Component {

    map = null;

    constructor(props) {
        super(props)

        let latitude = 46.189945;
        let longitude = -72.431703;
        if (props.source && props.destination) {
            latitude = (props.source.latitude - props.destination.latitude) / 2 + props.source.latitude;
            longitude = (props.source.longitude - props.destination.longitude) / 2 + props.source.longitude;
        }

        this.state = {
            region: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 5.0,
                longitudeDelta: 5.0,
            },
            ready: true,
            filteredMarkers: []
        }
    }

    componentDidMount() {
        console.log('Component did mount');
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

        const { children, renderMarker, markers, origin, destination, stopPoints } = this.props;

        return (
            <MapView
                showsUserLocation
                ref={map => { this.map = map }}
                initialRegion={initialRegion}
                renderMarker={renderMarker}
                onMapReady={this._onMapReady}
                showsMyLocationButton={false}
                onRegionChange={this._onRegionChange}
                onRegionChangeComplete={this._onRegionChangeComplete}
                style={StyleSheet.absoluteFill}
                textStyle={{ color: '#bc8b00' }}
                containerStyle={{ backgroundColor: 'white', borderColor: '#BC8B00' }}>

                {children && children || null}

                {origin && destination && stopPoints &&
                    <EcovoMapDirection origin={origin} destination={destination} stopPoints={stopPoints} />
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
    origin: PropTypes.object,
    destination: PropTypes.object,
    stopPoints: PropTypes.array
}

export default EcovoMapView;