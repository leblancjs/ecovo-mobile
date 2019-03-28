import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'native-base'
import { PhotoPickerField } from '../astuvu-native/form'
import PropTypes from 'prop-types'

class ProfileHeaderComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { photo, firstName, lastName } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <PhotoPickerField
                        style={{ container: styles.logo }}
                        initialPhoto={this.props.photo}
                        editable={false}
                    />
                </View>
                <View style={styles.nameHolder}>
                    <Text style={styles.name}>
                        {firstName} {lastName}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
    },
    logo: {
        margin: 40,
        marginTop: 100,
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
})

ProfileHeaderComponent.propTypes = {
    photo: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
}

export default ProfileHeaderComponent