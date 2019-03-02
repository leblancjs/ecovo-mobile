import React, { Component } from 'react';
import { Text } from 'native-base';
import { StyleSheet } from 'react-native';

class NavigationHeader extends Component {

    render() {
        return (
            <Text style={styles.headerTitle}>
                Ecovo
            </Text>
        );
    }
}

var NavigationOptions = {
    headerTintColor: "#fff",
    headerStyle: {
        backgroundColor: '#2BB267',
        borderBottomWidth: 0,
    },
    headerTitle: <NavigationHeader />,
};

const styles = StyleSheet.create({
    headerTitle: {
        color: "#fff",
    },
});
export { NavigationOptions };