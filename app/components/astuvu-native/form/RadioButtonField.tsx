import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text, Radio } from 'native-base'

export interface RadioButtonFieldItem {
    name: string
    value: any
}

export interface RadioButtonFieldProps {
    items: RadioButtonFieldItem[]
    onChange?: (value: any) => void
}

export interface RadioButtonFieldState {
    value: any
}

export const RadioButtonFieldDefaultProps = {
    items: []
}

class RadioButtonField extends Component<RadioButtonFieldProps, RadioButtonFieldState> {
    static defaultProps = RadioButtonFieldDefaultProps

    constructor(props: RadioButtonFieldProps) {
        super(props)

        this.state = {
            value: props.items.length > 0 ? props.items[0].value : null
        }
    }

    private onChangeRadioButton = (value: any): void => {
        if (this.props.onChange) {
            this.props.onChange(value)
        }

        this.setState({
            value
        })
    }

    render() {
        const { items } = this.props

        return (
            <View style={styles.timeRadioButton}>
                {items.map((item, i) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            style={styles.radioButtonItem}
                            onPress={() => this.onChangeRadioButton(item.value)}
                        >
                            <Radio
                                selectedColor='#2BB267'
                                selected={this.state.value === item.value}
                            />
                            <Text style={styles.radioButtonText}>{item.name}</Text>
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
        alignContent: 'center',
    },
    radioButtonItem: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'flex-end',
        borderBottomWidth: 0,
    },
    radioButtonText: {
        textAlign: 'left',
        marginLeft: 20,
    },
})

export default RadioButtonField