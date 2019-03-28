import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Picker, Icon, Right } from 'native-base'
import Field, { FieldPropTypes, FieldDefaultProps, FieldStyles, FieldLabelTypes } from './Field'
import PropTypes from 'prop-types'

class PickerField extends Component {
    constructor(props) {
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
            error: this.props.error,
        }
    }

    _onValueChange = (value) => {
        let error = null
        if (this.props.required) {
            error = this._validate(value)
        }

        if (this.props.onValueChange) {
            this.props.onValueChange(value, error)
        }

        this.setState({ value, error })
    }

    _validate = (value) => {
        if (this.props.onValidate) {
            return this.props.onValidate(value)
        }

        const error = `${this.props.label} can't be empty.`

        if (!value) {
            return error
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
                            onValueChange={this._onValueChange}
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

const valuePropType = PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
})

PickerField.propTypes = {
    ...FieldPropTypes,
    initialValue: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.string,
    onValueChange: PropTypes.func,
    onValidate: PropTypes.func,
    items: PropTypes.arrayOf(valuePropType).isRequired,
}

PickerField.defaultProps = {
    ...FieldDefaultProps,
    initialValue: '',
    required: false,
    error: null,
    onValueChange: null,
    onValidate: null,
    items: [],
}

export default PickerField