import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, Button } from 'react-native'
import { withStatusBar } from '../../hoc'

class GenericErrorScreen extends Component {
    constructor(props) {
        super(props)
    }

    _reportBug = () => {
        alert('Hide the pain.')
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.gif}
                    source={{uri: 'https://media1.tenor.com/images/4f6832682f5cd2400bc5cabb23523fb3/tenor.gif'}}
                />
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Well that's embarassing...
                    </Text>
                    <View>
                        <Text style={styles.message}>
                            Something went wrong. We're sorry! We'll fix it, we promise!
                            In the mean time, feel free to write us to express your anger or sadness.
                        </Text>
                        <Text style={styles.harold}>
                            Harold feels your pain.
                        </Text>
                    </View>
                    <Button
                        title='Report a Bug'
                        onPress={this._reportBug}
                        color='#2bb267'
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gif: {
        flex: 1,
        alignSelf: 'stretch'
    },
    content: {
        flex: 1,
        margin: 16
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 16
    },
    message: {
        marginBottom: 16
    },
    harold: {
        marginBottom: 8
    }
})

export default withStatusBar(GenericErrorScreen)