import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { DatePicker, Icon, Right } from 'native-base'
import Field, { FieldProps, FieldDefaultProps, FieldStyles, FieldLabelTypes } from './Field'
import Moment from 'moment'

export interface DatePickerFieldProps extends FieldProps {
    placeholder?: string
    initialValue?: Date
    required?: boolean
    onValueChange?: (value: string, error: string | null) => void
    onValidate?: (value: Date) => string | null
}

export interface DatePickerFieldState {
    placeholder: string
    placeholderStyle: object
    value: Date
    error: string | null
}

export const DatePickerFieldDefaultProps = {
    ...FieldDefaultProps,
    placeholder: 'Select a date',
    initialValue: undefined,
    required: false,
    onValueChange: undefined,
    onValidate: undefined,
}

class DatePickerField extends Component<DatePickerFieldProps, DatePickerFieldState> {
    static defaultProps = DatePickerFieldDefaultProps

    constructor(props: DatePickerFieldProps) {
        super(props)

        /*
         * For some reason, NativeBase's date picker doesn't show the default
         * date when it is set. So, we need to trick it by using the
         * placeholder.
         * 
         * No worries, once you select a date, it will behave correctly.
         * 
         * This is what astuvu-native is all about: making sh*tty things work.
         */
        let placeholder = this.props.placeholder || ''
        let placeholderStyle: object = styles.placeholderText

        if (this.props.initialValue) {
            // This line needs to stay as it is for it to format correctly. I know it's long...
            placeholder = Moment(this.props.initialValue).format('YYYY/MM/DD')
            placeholderStyle = {}
        }
        
        /*
         * It's intentional that we don't validate the initial value.
         *
         * We don't want to tell the user they've done something wrong before
         * they've even started to write in the text field!
         *
         * However, we can preset an error if we want.
         */
        this.state = {
            placeholder,
            placeholderStyle,
            value: this.props.initialValue || new Date(),
            error: this.props.error || null,
        }
    }

    private onValueChange = (value: Date) => {
        let error: string | null = null
        if (this.props.required) {
            error = this.validate(value)
        }

        if (this.props.onValueChange) {
            this.props.onValueChange(Moment(value).format('YYYY-MM-DDThh:mm:ss.sZ'), error)
        }

        this.setState({
            ...this.state,
            value,
            error
        })
    }

    private validate = (value: Date): string | null => {
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
                <View style={styles.container}>
                    <View style={styles.pickerContainer}>
                        <DatePicker
                            defaultDate={this.props.initialValue}
                            locale={'en'}
                            modalTransparent={false}
                            animationType={'slide'}
                            androidMode={'spinner'}
                            placeHolderText={this.state.placeholder}
                            placeHolderTextStyle={this.state.placeholderStyle}
                            onDateChange={this.onValueChange}
                        />
                    </View>
                    <Right style={styles.iconContainer}>
                        <Icon
                            style={styles.calendarIcon}
                            name='calendar'
                        />
                        {
                            this.state.error &&
                            <Icon
                                style={styles.errorIcon}
                                name="close-circle"
                            />
                        }
                    </Right>
                </View>
            </Field>
        )
    }
}

const styles = StyleSheet.create({
    ...FieldStyles,
    container: {
        flexDirection: 'row',
    },
    pickerContainer: {
        flex: 0.8,
    },
    iconContainer: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    calendarIcon: {
        marginRight: 8,
    },
    placeholderText: {
        color: '#717171',
    },
})

export default DatePickerField