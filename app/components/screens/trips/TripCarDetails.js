import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, CardItem, Icon } from 'native-base'
import PropTypes from 'prop-types'


class TripCarDetails extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
    }

    render() {
        const { carMake, carModel, carYear, carColor} = this.props
        return (
            <CardItem header>
                <Icon type="MaterialIcons" name="directions-car" />
                <View style={styles.viewStyle}>
                    <View style={styles.textSameLine}>
                        <Text>{carMake} {carModel}</Text>
                        <Text style={styles.textLight}> {carYear}</Text>
                    </View>
                    <Text style={styles.textLight}>{carColor}</Text>
                </View>
            </CardItem>
        )
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1
    },
    textSameLine: {
        flexDirection: 'row'
    },
    textLight: {
        fontWeight: 'normal'
    }
})

TripCarDetails.propTypes = {
    carMake: PropTypes.string,
    carModel: PropTypes.string,
    carYear: PropTypes.number,
    carColor: PropTypes.string
}

export default TripCarDetails;