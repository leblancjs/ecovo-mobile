import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, Right } from 'native-base'
import Field, { FieldProps, FieldDefaultProps, FieldStyles, FieldLabelTypes } from './Field'
import DatePicker from 'react-native-datepicker'
import moment, { Moment } from 'moment'

export interface DateTimePickerFieldProps extends FieldProps {
    placeholder?: string
    initialValue?: Moment
    required?: boolean
    dateFormat?: string
    onValueChange?: (value: Moment, error: string | null) => void
    onValidate?: (value: Moment) => string | null
}

export interface DateTimePickerFieldState {
    value?: string
    error: string | null
}

export const DateTimePickerFieldDefaultProps = {
    ...FieldDefaultProps,
    placeholder: 'Select a date',
    initialValue: undefined,
    required: false,
    dateFormat: 'dddd, MMMM Do YYYY, [at] h:mm A',
    onValueChange: undefined,
    onValidate: undefined,
}

class DateTimePickerField extends Component<DateTimePickerFieldProps, DateTimePickerFieldState> {
    static defaultProps = DateTimePickerFieldDefaultProps

    constructor(props: DateTimePickerFieldProps) {
        super(props)

        this.state = {
            value: this.props.initialValue ? moment(this.props.initialValue).format("YYYY-MM-DDTHH:mm:ss.sZ") : '',
            error: this.props.error || null,
        }
    }

    private onValueChange = (value: string): void => {
        const date = moment(value, this.props.dateFormat)

        let error: string | null = null
        if (this.props.required) {
            error = this.validate(date)
        }

        if (this.props.onValueChange) {
            this.props.onValueChange(date, error)
        }

        this.setState({
            ...this.state,
            value,
            error,
        })
    }

    private validate = (value: Moment): string | null => {
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
                            style={{ width: '100%', padding: 0 }}
                            mode="datetime"
                            placeholder={this.props.placeholder}
                            date={this.state.value}
                            format={this.props.dateFormat}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            is24Hour={true}
                            onDateChange={this.onValueChange}
                            customStyles={{
                                dateInput: styles.dateInput,
                                dateText: styles.dateInputText
                            }}
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
    dateInput: {
        flex: 1,
        borderColor: '#fff',
        borderBottomWidth: 0,
        marginLeft: 10,
    },
    dateInputText: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        color: "#000",
        fontSize: 16,
    },
})

export default DateTimePickerField