import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Thumbnail } from 'native-base';
import PropTypes from 'prop-types';

class ProfileHeaderComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { photo, firstName, lastName } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Image style={styles.logo} source={{ uri: photo }} />
                </View>
                <View style={styles.nameHolder}>
                    <Text style={styles.name}>
                        {firstName} {lastName}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 8
    },

    logo: {
        width: 100,
        height: 100,
        margin: 40,
        marginTop: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#eee"

    },

    row: {
        borderWidth: 0,
        backgroundColor: '#2BB267',
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
    },

    name: {
        fontSize: 24,
    },

    nameHolder: {
        marginTop: 64,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

ProfileHeaderComponent.propTypes = {
    photo: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
}
export default ProfileHeaderComponent