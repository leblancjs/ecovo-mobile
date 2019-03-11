import React from 'react';
import {
    Alert,
    Platform,
    StyleSheet
} from 'react-native';
import MapView from 'react-native-maps'
import PropTypes from 'prop-types'

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const initialRegion = {
    latitude: -37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

class EcovoMapView extends React.Component {

    map = null;

    state = {
        region: {
            latitude: -37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        ready: true,
        filteredMarkers: []
    };

    setRegion(region) {
        if (this.state.ready) {
            setTimeout(() => this.map.animateToRegion(region), 10);
        }
    }

    componentDidMount() {
        console.log('Component did mount');
        this.getCurrentPosition();
    }

    getCurrentPosition() {
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
                        this.setRegion(region);
                    }
                },
                (error) => {
                }
            );
        } catch (e) {
            alert(e.message || "");
        }
    };

    onMapReady = (e) => {
        if (!this.state.ready) {
            this.setState({ ready: true });
        }
    };

    onRegionChange = (region) => {
        if (this.props.onRegionChange) {
            this.props.onRegionChange(region);
        }
    };

    onRegionChangeComplete = (region) => {
        if (this.props.onRegionChangeComplete) {
            this.props.onRegionChangeComplete(region);
        }
    };

    render() {

        const { children, renderMarker, markers } = this.props;

        return (
            <MapView
                showsUserLocation
                ref={map => { this.map = map }}
                data={markers}
                initialRegion={initialRegion}
                renderMarker={renderMarker}
                onMapReady={this.onMapReady}
                showsMyLocationButton={false}
                onRegionChange={this.onRegionChange}
                onRegionChangeComplete={this.onRegionChangeComplete}
                style={StyleSheet.absoluteFill}
                textStyle={{ color: '#bc8b00' }}
                containerStyle={{ backgroundColor: 'white', borderColor: '#BC8B00', zIndex: -1 }}>

                {children && children || null}

            </MapView>
        );
    }
}

EcovoMapView.propTypes = {
    onRegionChange: PropTypes.func,
    onRegionChangeComplete: PropTypes.func,
    markers: PropTypes.object,
}

export default EcovoMapView;