import React, { Component } from 'react'
import { StyleSheet, Image } from 'react-native'
import PropTypes from 'prop-types'

class Photo extends Component {
    constructor(props) {
        super(props)
    }

    _parsePhotoSource = (photo) => {
        if (!photo) {
            return null
        }

        if (photo.startsWith('http')) {
            return { uri: photo }
        } else {
            return { uri: `data:image/png;base64,${photo}` }
        }
    }

    render = () => {
        let source = this._parsePhotoSource(this.props.source)
        if (!source) {
            source = require('../../../assets/profile_pic.png')
        }

        return (
            <Image
                style={{ ...this.props.style }}
                source={source}
            />
        )
    }
}

const styles = StyleSheet.create({
    // Add styles if necessary
})

Photo.propTypes = {
    style: PropTypes.object,
    source: PropTypes.string.isRequired,
}

Photo.defaultProps = {
    style: {},
    source: '',
}

export default Photo