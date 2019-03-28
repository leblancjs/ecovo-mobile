import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Thumbnail, Spinner } from 'native-base'
import { Photo, PhotoViewer } from '../../astuvu-native'
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'
import RNFS from 'react-native-fs'
import PropTypes from 'prop-types'

class PhotoPickerField extends Component {
    constructor(props) {
        super(props)

        this.state = {
            photo: props.initialPhoto,
            resizing: false,
            viewerOpen: false,
        }
    }

    _onOpenPicker = () => {
        const options = {
            title: 'Select a profile photo',
            noData: true,
        }

        ImagePicker.showImagePicker(options, (resp) => {
            if (resp.didCancel || resp.error) {
                // Do nothing... it's intentional.
            } else {
                this.setState({
                    ...this.state,
                    resizing: true,
                })

                this._resize(resp.uri)
                    .then(photo => {
                        this._onPhotoChange(photo)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => {
                        this.setState({
                            ...this.state,
                            resizing: false
                        })
                    })
            }
        })
    }

    _resize = (uri) => {
        this.setState({
            ...this.state,
            resizing: true,
        })

        return ImageResizer.createResizedImage(uri, 600, 600, 'PNG', 100)
            .then(resp => this._loadResizedImage(resp.uri))
            .catch(error => error)
    }

    _loadResizedImage = (uri) => {
        return RNFS.readFile(uri, 'base64')
            .then(photo => photo)
            .catch(error => error)
    }

    _onPhotoChange = (photo) => {
        if (!photo) {
            return
        }

        if (this.props.onPhotoChange) {
            this.props.onPhotoChange(photo)
        }

        this.setState({
            ...this.state,
            photo,
            processing: false,
        })
    }

    _onOpenViewer = () => {
        this.setState({
            ...this.state,
            viewerOpen: true,
        })
    }

    _onCloseViewer = () => {
        this.setState({
            ...this.state,
            viewerOpen: false,
        })
    }

    _onPress = () => {
        if (this.props.viewerEnabled) {
            this._onOpenViewer()
        } else {
            this._onOpenPicker()
        }
    }

    _renderOverlay = () => {
        return (
            <View style={[styles.thumbnail, this.props.style.thumbnail, styles.overlay]}>
                <Spinner color='#fff' />
            </View>
        )
    }

    render() {
        return (
            <View style={[styles.container, this.props.style.container]}>
                <TouchableOpacity
                    style={[styles.button, this.props.style.button]}
                    onPress={this._onPress}
                >
                    <Photo
                        style={{ ...styles.thumbnail, ...this.props.style.thumbnail }}
                        source={this.state.photo}
                    />
                    { this.state.resizing && this._renderOverlay()}
                </TouchableOpacity>
                <PhotoViewer
                    title={this.props.viewerTitle}
                    photo={this.state.photo}
                    open={this.state.viewerOpen}
                    editable={this.props.editable}
                    onClose={this._onCloseViewer}
                    onEdit={this._onOpenPicker}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // Fill out any default styles
    },
    thumbnail: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#eee",
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0.93, 0.93, 0.93, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

PhotoPickerField.propTypes = {
    style: PropTypes.shape({
        container: PropTypes.object,
        thumbnail: PropTypes.object,
        button: PropTypes.object,
    }),
    initialPhoto: PropTypes.string,
    editable: PropTypes.bool,
    viewerEnabled: PropTypes.bool,
    viewerTitle: PropTypes.string,
    onPhotoChange: PropTypes.func,
}

PhotoPickerField.defaultProps = {
    style: {
        container: {},
        thumbnail: {},
        button: {},
    },
    initialPhoto: null,
    editable: true,
    viewerEnabled: true,
    viewerTitle: '',
    onPhotoChange: null,
}

export default PhotoPickerField