import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Input } from 'native-base'
import Field, { FieldPropTypes, FieldDefaultProps, FieldStyles, FieldLabelTypes } from './Field'
import PropTypes from 'prop-types'

class TextField extends Component {
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

        if (typeof value !== 'string') {
            console.error('TextField: value is not a string')
            return error
        }

        let trimmedValue = value.trim()
        if (trimmedValue === '') {
            return error
        }

        return null
    }

    render = () => {
        return (
            <Field
                style={this.props.style}
                bottomBorder={this.props.bottomBorder}
                labelType={FieldLabelTypes.FLOATING}
                label={this.props.label}
                error={this.state.error}
                errorIcon={true}
            >
                <Input
                    multiline={true}
                    numberOfLines={this.props.lines}
                    value={this.state.value}
                    onChangeText={this._onValueChange}
                />
            </Field>
        )
    }
}

const styles = StyleSheet.create({
    ...FieldStyles,
    // TODO: Fill out as needed to apply theme to all text fields
})

TextField.propTypes = {
    ...FieldPropTypes,
    lines: PropTypes.number,
    initialValue: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.string,
    onValueChange: PropTypes.func,
    onValidate: PropTypes.func,
}

TextField.defaultProps = {
    ...FieldDefaultProps,
    lines: 1,
    initialValue: '',
    required: false,
    error: null,
    onValueChange: null,
    onValidate: null,
}

export default TextField