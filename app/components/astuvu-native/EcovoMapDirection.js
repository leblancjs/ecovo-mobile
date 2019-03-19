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
        const { source, destination, steps } = this.props;
        return (
            <MapViewDirections
                origin={source}
                waypoints={steps}
                destination={destination}
                apikey={googleMapsApiKey}
            />
        )
    }
}

EcovoMapDirection.propTypes = {
    source: PropTypes.object,
    destination: PropTypes.object,
    steps: PropTypes.array
}


export default EcovoMapDirection;