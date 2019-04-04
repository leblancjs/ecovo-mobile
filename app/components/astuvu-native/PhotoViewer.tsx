import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, Left, Body, Right, Button, Title, Text, Icon } from 'native-base'
import { Photo } from '../astuvu-native'
import Modal from 'react-native-modal'

export interface PhotoViewerProps {
    style?: object
    title?: string
    photo?: string
    editable?: boolean
    open?: boolean
    onClose?: () => void
    onEdit?: () => void
}

export const PhotoViewerDefaultProps = {
    style: {},
    title: '',
    photo: '',
    editable: false,
    open: false,
    onClose: undefined,
    onEdit: undefined,
}

class PhotoViewer extends Component<PhotoViewerProps> {
    static defaultProps = PhotoViewerDefaultProps

    constructor(props: PhotoViewerProps) {
        super(props)
    }

    private onClose = (): void => {
        if (this.props.onClose) {
            this.props.onClose()
        }
    }

    private onEdit = (): void => {
        if (this.props.onEdit) {
            this.props.onEdit()
        }
    }

    render = () => {
        return (
            <Modal
                style={{ padding: 0, margin: 0 }}
                isVisible={!!this.props.open}
                backdropOpacity={1}
                onDismiss={this.onClose}
            >
                <Container style={styles.container}>
                    <Header transparent>
                        <Left>
                            <Button
                                transparent
                                onPress={this.onClose}
                                style={{ marginLeft: 8 }}
                            >
                                <Icon name='close' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>{this.props.title}</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content
                        scrollEnabled={false}
                        contentContainerStyle={styles.content}
                    >
                        <View style={styles.photoContainer}>
                            <Photo
                                style={styles.photo}
                                source={this.props.photo}
                            />
                        </View>
                        {
                            this.props.editable &&
                                <Button
                                    transparent
                                    full
                                    iconLeft
                                    onPress={this.onEdit}
                                >
                                    <Icon style={{ color: 'white' }} type="FontAwesome" name='edit' />
                                    <Text style={{ color: 'white' }}>Edit</Text>
                                </Button>
                        }
                    </Content>
                </Container>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoContainer: {
        width: '100%',
        height: 240,
        padding: 16,
    },
    photo: {
        flex: 1,
        alignSelf: 'stretch',
    },
})

export default PhotoViewer