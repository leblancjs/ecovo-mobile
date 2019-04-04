import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Picker, Icon, Right } from 'native-base'
import Field, { FieldProps, FieldDefaultProps, FieldStyles, FieldLabelTypes } from './Field'

export interface PickerFieldItem {
    label: string
    value: any
}

export interface PickerFieldProps extends FieldProps {
    initialValue?: any
    required?: boolean
    items: PickerFieldItem[]
    onValueChange?: (value: any, error: string | null) => void
    onValidate?: (value: any) => string | null
}

export interface PickerFieldState {
    value: any,
    error: string | null,
}

export const PickerFieldDefaultProps = {
    ...FieldDefaultProps,
    initialValue: '',
    required: false,
    items: [],
    onValueChange: undefined,
    onValidate: undefined,
}

class PickerField extends Component<PickerFieldProps, PickerFieldState> {
    static defaultProps = PickerFieldDefaultProps

    constructor(props: PickerFieldProps) {
        super(props)
        
        /*
         * It's intentional that we don't validate the initial value.
         *
         * We don't want to tell the user they've done something wrong before
         * they've even started to write in the text field!
         *
         * However, we can preset an error if we want.
         */
        this.state = {
            value: this.props.initialValue,
            error: this.props.error || null,
        }
    }

    private onValueChange = (value: any): void => {
        let error: string | null = null
        if (this.props.required) {
            error = this.validate(value)
        }

        if (this.props.onValueChange) {
            this.props.onValueChange(value, error)
        }

        this.setState({ value, error })
    }

    private validate = (value: any): string | null => {
        if (this.props.onValidate) {
            return this.props.onValidate(value)
        }

        if (!value) {
            return `${this.props.label} can't be empty.`
        }

        return null
    }

    render = () => {
        return (
            <Field
                style={this.props.style}
                bottomBorder={this.props.bottomBorder}
                labelType={FieldLabelTypes.STACKED}
                label={this.props.label}
                error={this.state.error}
            >
                <View style={styles.inputContainer}>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            mode="dropdown"
                            iosHeader={this.props.label}
                            iosIcon={<Icon name="arrow-down"/>}
                            selectedValue={this.state.value}
                            onValueChange={this.onValueChange}
                        >
                            {
                                this.props.items.map(item =>
                                    <Picker.Item label={item.label} value={item.value} key={item.label}/>
                                )
                            }
                        </Picker>
                    </View>
                    {
                        this.state.error &&
                            <Right style={styles.errorIconContainer}>
                                <Icon
                                    style={styles.errorIcon}
                                    name="close-circle"
                                />
                            </Right>
                    }
                </View>
            </Field>
        )
    }
}

const styles = StyleSheet.create({
    ...FieldStyles,
    pickerContainer: {
        flex: 1,
    },
    picker: {
        width: '100%',
    },
})

export default PickerField