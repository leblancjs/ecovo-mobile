import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, Right } from 'native-base'
import Field, { FieldPropTypes, FieldDefaultProps, FieldStyles, FieldLabelTypes } from './Field'
import PropTypes from 'prop-types'
import DatePicker from 'react-native-datepicker'

class DateTimePickerField extends Component {
    constructor(props) {
        super(props)
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
                            onDateChange={this._onValueChange}
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
        marginLeft: 10
    },
    dateInputText: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        color: "#000",
        fontSize: 16,
    }
})

DateTimePickerField.propTypes = {
    ...FieldPropTypes,
    placeholder: PropTypes.string,
    initialValue: PropTypes.instanceOf(Date),
    required: PropTypes.bool,
    error: PropTypes.string,
    onValueChange: PropTypes.func,
    onValidate: PropTypes.func,
    dateFormat: PropTypes.string,
}

DateTimePickerField.defaultProps = {
    ...FieldDefaultProps,
    placeholder: 'Select a date',
    initialValue: new Date(),
    required: false,
    error: null,
    onValueChange: null,
    onValidate: null,
    dateFormat: "DD/MM/YYYY hh:mm:ss"
}

export default DateTimePickerField