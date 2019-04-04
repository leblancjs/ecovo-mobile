import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Spinner } from 'native-base'
import { Photo, PhotoViewer } from '../../astuvu-native'
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'
import RNFS from 'react-native-fs'

export interface PhotoPickerFieldStyle {
    container?: {}
    thumbnail?: {}
    button?: {}
}

export interface PhotoPickerFieldProps {
    style?: PhotoPickerFieldStyle
    initialPhoto?: string
    editable?: boolean
    viewerEnabled?: boolean
    viewerTitle?: string
    onPhotoChange?: (photo: string) => void
}

export interface PhotoPickerFieldState {
    photo: string
    resizing: boolean
    viewerOpen: boolean
}

export const PhotoPickerFieldDefaultProps = {
    style: {
        container: {},
        thumbnail: {},
        button: {},
    },
    initialPhoto: '',
    editable: true,
    viewerEnabled: true,
    viewerTitle: '',
    onPhotoChange: undefined,
}

class PhotoPickerField extends Component<PhotoPickerFieldProps, PhotoPickerFieldState> {
    static defaultProps = PhotoPickerFieldDefaultProps

    constructor(props: PhotoPickerFieldProps) {
        super(props)

        this.state = {
            photo: props.initialPhoto || '',
            resizing: false,
            viewerOpen: false,
        }
    }

    private openPicker = (): void => {
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

                this.resize(resp.uri)
                    .then(photo => {
                        this.onPhotoChange(photo)
                        this.closePicker()
                    })
                    .catch(error => {
                        this.closePicker()
                        console.log(error)
                    })
            }
        })
    }

    private closePicker = (): void => {
        this.setState({
            ...this.state,
            resizing: false
        })
    }

    private resize = (uri: string) => {
        this.setState({
            ...this.state,
            resizing: true,
        })

        return ImageResizer.createResizedImage(uri, 600, 600, 'PNG', 100)
            .then(resp => this.loadResizedImage(resp.uri))
            .catch(error => error)
    }

    private loadResizedImage = (uri: string) => {
        return RNFS.readFile(uri, 'base64')
            .then(photo => photo)
            .catch(error => error)
    }

    private onPhotoChange = (photo: string): void => {
        if (!photo) {
            return
        }

        if (this.props.onPhotoChange) {
            this.props.onPhotoChange(photo)
        }

        this.setState({
            ...this.state,
            photo,
            resizing: false,
        })
    }

    private onOpenViewer = (): void => {
        this.setState({
            ...this.state,
            viewerOpen: true,
        })
    }

    private onCloseViewer = (): void => {
        this.setState({
            ...this.state,
            viewerOpen: false,
        })
    }

    private onPress = (): void => {
        if (this.props.viewerEnabled) {
            this.onOpenViewer()
        } else {
            this.openPicker()
        }
    }

    private renderOverlay = () => {
        const thumbnailStyle = this.props.style && this.props.style.thumbnail ?
            this.props.style.thumbnail : {}
        
        return (
            <View style={[styles.thumbnail, thumbnailStyle, styles.overlay]}>
                <Spinner color='#fff' />
            </View>
        )
    }

    render() {
        const containerStyle = this.props.style && this.props.style.container ?
            this.props.style.container : {}

        const buttonStyle = this.props.style && this.props.style.button ?
            this.props.style.button : {}

        const thumbnailStyle = this.props.style && this.props.style.thumbnail ?
            this.props.style.thumbnail : {}
            
        return (
            <View style={[styles.container, containerStyle]}>
                <TouchableOpacity
                    style={[styles.button, buttonStyle]}
                    onPress={this.onPress}
                >
                    <Photo
                        style={{ ...styles.thumbnail, ...thumbnailStyle }}
                        source={this.state.photo}
                    />
                    { this.state.resizing && this.renderOverlay()}
                </TouchableOpacity>
                <PhotoViewer
                    title={this.props.viewerTitle}
                    photo={this.state.photo}
                    open={this.state.viewerOpen}
                    editable={this.props.editable}
                    onClose={this.onCloseViewer}
                    onEdit={this.openPicker}
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

export default PhotoPickerField