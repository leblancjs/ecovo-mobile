import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text, Radio } from 'native-base'
import PropTypes from 'prop-types'

class RadioButtonField extends Component {

    _onChangeRadioButton = (type) => {
        this.props.onChange(type)
    }

    render() {
        const { radioButtonNameValue } = this.props;
        return (
            <View style={styles.timeRadioButton}>
                {radioButtonNameValue.map((radioButton, i) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            style={styles.radioButtonItem}
                            onPress={() => this._onChangeRadioButton(radioButton.type)}
                        >
                            <Radio
                                color={"#2BB267"}
                                selectedColor={"#2BB267"}
                                selected={radioButton.value}
                            />
                            <Text style={styles.radioButtonText}>{radioButton.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    timeRadioButton: {
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        alignContent: 'center'
    },
    radioButtonItem: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'flex-end',
        borderBottomWidth: 0
    },
    radioButtonText: {
        textAlign: 'left',
        marginLeft: 20
    }
})

RadioButtonField.propTypes = {
    radioButtonNameValue: PropTypes.array,
    onChange: PropTypes.func.isRequired
}

RadioButtonFielddefaultProps = {
    radioButtonNameValue: []
}

export default RadioButtonField