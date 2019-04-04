import React, { Component } from 'react'
import { Input } from 'native-base'
import Field, { FieldProps, FieldDefaultProps, FieldLabelTypes } from './Field'

export interface TextFieldProps extends FieldProps {
    lines?: number
    initialValue?: string
    required?: boolean
    onValueChange?: (value: string, error: string | null) => void
    onValidate?: (value: string) => string | null
}

export interface TextFieldState {
    value: string
    error: string | null
}

export const TextFieldDefaultProps: TextFieldProps = {
    ...FieldDefaultProps,
    lines: 1,
    initialValue: '',
    required: false,
    onValueChange: undefined,
    onValidate: undefined,
}

class TextField extends Component<TextFieldProps, TextFieldState> {
    static defaultProps = TextFieldDefaultProps

    constructor(props: TextFieldProps) {
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
            value: this.props.initialValue || '',
            error: this.props.error || null,
        }
    }

    private onValueChange = (value: string): void => {
        let error: string | null = null
        if (this.props.required) {
            error = this.validate(value)
        }

        if (this.props.onValueChange) {
            this.props.onValueChange(value, error)
        }

        this.setState({ value, error })
    }

    private validate = (value: string): string | null => {
        if (this.props.onValidate) {
            return this.props.onValidate(value)
        }

        let trimmedValue = value.trim()
        if (trimmedValue === '') {
            return `${this.props.label} can't be empty.`
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
                    multiline={this.props.lines ? this.props.lines > 1 : false}
                    numberOfLines={this.props.lines}
                    value={this.state.value}
                    onChangeText={this.onValueChange}
                />
            </Field>
        )
    }
}

export default TextField