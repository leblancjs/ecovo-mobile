import React, { Component } from 'react'
import { Image } from 'react-native'

export interface PhotoProps {
    style?: object
    source: string
}

export const PhotoDefaultProps = {
    style: {},
    source: '',
}

class Photo extends Component<PhotoProps> {
    static defaultProps = PhotoDefaultProps
    
    constructor(props: PhotoProps) {
        super(props)
    }

    private parsePhotoSource = (photo: string): any => {
        if (!photo) {
            return require('../../../assets/profile_pic.png')
        }

        if (photo.startsWith('http')) {
            return { uri: photo }
        } else {
            return { uri: `data:image/png;base64,${photo}` }
        }
    }

    render = () => {
        return (
            <Image
                style={{ ...this.props.style }}
                source={this.parsePhotoSource(this.props.source)}
            />
        )
    }
}

export default Photo