import React, { Component } from 'react';
import { Animated } from 'react-native';

// source : https://snack.expo.io/@spencercarli/fade-in-an-image-with-react-native-with-the-animated-api

class LogoFadeIn extends Component {
    state = {
        opacity: new Animated.Value(0),
    }

    onLoad = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
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
                    this.props.style,
                ]}
            />
        );
    }
}

export default LogoFadeIn;