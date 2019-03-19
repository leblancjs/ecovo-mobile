import React, { Component } from 'react'
import MapViewDirections from 'react-native-maps-directions';
import PropTypes from 'prop-types'
import { googleMapsApiKey } from '../../../app.json'

class EcovoMapDirection extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
    }

    render() {
        const { origin, destination, steps } = this.props;
        return (
            <MapViewDirections
                origin={origin}
                waypoints={steps}
                destination={destination}
                apikey={googleMapsApiKey}
            />
        )
    }
}

EcovoMapDirection.propTypes = {
    origin: PropTypes.object,
    destination: PropTypes.object,
    steps: PropTypes.array
}


export default EcovoMapDirection;