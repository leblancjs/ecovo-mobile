import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
// Well... no types for this one.
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GoogleMapsConfig } from '../../../config'

export interface PlacesSearchFieldProps {
    placeholder: string
    onSearchResult?: (data: any, details: any) => void
}

export const PlacesSearchFieldDefaultProps = {
    placeholder: '',
    onSearchResult: undefined,
}

class PlacesSearchField extends Component<PlacesSearchFieldProps> {
    static defaultProps = PlacesSearchFieldDefaultProps

    constructor(props: PlacesSearchFieldProps) {
        super(props)
    }

    private onSearchResults = (data: any, details: any): void => {
        if (this.props.onSearchResult) {
            this.props.onSearchResult(data, details)
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
                onPress={this.onSearchResults}
                query={{
                    key: GoogleMapsConfig.apiKey,
                    language: 'en', // language of the results
                }}
                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="My current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                styles={styles}
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
        )
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
    height: 58,
}

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
    },
})

export default PlacesSearchField