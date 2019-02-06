import React, { Component } from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    _getStarted = () => {
        // TODO: Navigate to next screen
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to Ecovo</Text>
                <Button
                    onPress={this._getStarted}
                    title='Get Started'
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    }
});

export default WelcomeScreen;
