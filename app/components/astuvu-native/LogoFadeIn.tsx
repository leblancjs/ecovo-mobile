import React, { Component } from 'react'
import { StyleSheet, Animated } from 'react-native'

// source : https://snack.expo.io/@spencercarli/fade-in-an-image-with-react-native-with-the-animated-api

export interface Props {
    source: any
}

interface State {}

class LogoFadeIn extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
    }

    state = {
        opacity: new Animated.Value(0),
    }

    onLoad = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start()
    }

    render() {
        return (
            <Animated.Image
                onLoad={this.onLoad}
                {...this.props}
                style={[
                    {
                        opacity: this.state.opacity,
                        transform: [
                            {
                                scale: this.state.opacity.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.85, 1],
                                })
                            },
                        ],
                    },
                    styles.logo,
                ]}
            />
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 192,
        height: 221,
        marginBottom: 16,
    }
})

export default LogoFadeIn