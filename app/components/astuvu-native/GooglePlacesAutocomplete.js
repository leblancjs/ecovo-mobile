import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PropTypes from 'prop-types';
import { googleMapsApiKey } from '../../../app.json'

class GooglePlacesInput extends Component {
    constructor(props) {
        super(props);
    }


    _onSearchResults = (data, details) => {
        if (this.props.onSearchResult) {
            this.props.onSearchResult(data, details);
        }
    }


    render() {

        return (
            <GooglePlacesAutocomplete
                placeholder={this.props.placeholder}
                minLength={2} // minimum length of text to search
                autoFocus={false}
                listViewDisplayed='false'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={this._onSearchResults}
                query={{
                    key: googleMapsApiKey,
                    language: 'en', // language of the results
                }}

                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="My current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                styles={styles}
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
        );
    }
}
const inputStyle = {
    backgroundColor: '#fff',
    borderRadius: 0,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
    paddingLeft: 16,
    height: 58
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent'
    },
    textInputContainer: {

        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        marginBottom: 20
    },
    textInput: {
        ...inputStyle,
        zIndex: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 16,
        paddingRight: 0,
    },
    poweredContainer: {
        display: 'none'
    },
    listView: {
        backgroundColor: '#fff',
        padding: 10,
    }
});
GooglePlacesInput.propTypes = {
    onSearchResult: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
}

export default GooglePlacesInput;