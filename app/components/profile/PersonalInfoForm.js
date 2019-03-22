import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Form, TextField, PickerField, DatePickerField } from '../astuvu-native/form'

class PersonalInfoForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: props.user ? props.user.firstName : '',
            lastName: props.user ? props.user.lastName : '',
            dateOfBirth: props.user ? this._parseDate(props.user.dateOfBirth) : null,
            gender: props.user ? props.user.gender : '',
            phoneNumber: props.user ? props.user.phoneNumber : '',
        }
    }

    _parseDate = (date) => {
        if (date) {
            return new Date(Date.parse(date))
        }

        return null
    }

    _onFieldChange = (field, value, error) => {
        if (this.props.onFieldChange) {
            this.props.onFieldChange(field, value, error)
        }

        this.setState({
            ...this.state,
            [field]: value
        })
    }

    _onValidateField = (field, value) => {
        switch (field) {
            case FieldNames.DATE_OF_BIRTH:
                return this._validateAge(value)
            case FieldNames.FIRST_NAME:
            case FieldNames.LAST_NAME:
            case FieldNames.GENDER:
                return this._validateString(field, value)
            case FieldNames.PHONE_NUMBER:
                // Phone number is optional, so we won't do anything.
            default:
                return null
        }
    }

    _validateString = (field, value) => {
        const error = `Please enter your ${FieldLabels[field].toLowerCase()}.`

        if (typeof value !== 'string') {
            return error
        }

        let trimmedValue = value.trim()
        if (trimmedValue === '') {
            return error
        }

        return null
    }

    _validateAge(value) {
        const minimumAge = 18

        if (!value) {
            return `Please enter your ${FieldLabels[FieldNames.DATE_OF_BIRTH].toLowerCase()}.`
        }

        let today = new Date()
        let birthDate = new Date(value)

        let age = today.getFullYear() - birthDate.getFullYear()

        let month = today.getMonth() - birthDate.getMonth()
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }

        if (age < minimumAge) {
            return `You must be ${minimumAge} years or older.`
        }

        return null
    }

    _renderTextField = (field, style = styles.field) => (
        <TextField
            style={style}
            label={FieldLabels[field]}
            initialValue={this.state[[field]]}
            required={true}
            onValueChange={(v, err) => this._onFieldChange(field, v, err)}
            onValidate={v => this._onValidateField(field, v)}
        />
    )

    render() {
        const genderItems = [{
            label: 'Male',
            value: 'Male',
        }, {
            label: 'Female',
            value: 'Female',
        }, {
            label: 'Other',
            value: 'Other',
        }]

        return (
            <Form style={{ ...styles.form, ...this.props.style }}>
                {this._renderTextField(FieldNames.FIRST_NAME)}
                {this._renderTextField(FieldNames.LAST_NAME)}
                <DatePickerField
                    style={styles.field}
                    label='Date of Birth'
                    placeholder='Please select a date'
                    initialValue={this.state[FieldNames.DATE_OF_BIRTH]}
                    required={true}
                    onValueChange={(v, err) => this._onFieldChange(FieldNames.DATE_OF_BIRTH, v, err)}
                    onValidate={v => this._onValidateField(FieldNames.DATE_OF_BIRTH, v)}
                />
                <PickerField
                    style={styles.field}
                    label="Gender"
                    initialValue={genderItems[0].value}
                    items={genderItems}
                    required={true}
                    onValueChange={(v, err) => this._onFieldChange(FieldNames.GENDER, v, err)}
                    onValidate={v => this._onValidateField(FieldNames.GENDER, v)}
                />
                {this._renderTextField(FieldNames.PHONE_NUMBER, styles.lastField)}
            </Form>
        )
    }
}

const FieldNames = {
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    DATE_OF_BIRTH: 'dateOfBirth',
    GENDER: 'gender',
    PHONE_NUMBER: 'phoneNumber',
}

const FieldLabels = {
    [FieldNames.FIRST_NAME]: 'First Name',
    [FieldNames.LAST_NAME]: 'Last Name',
    [FieldNames.DATE_OF_BIRTH]: 'Date of Birth',
    [FieldNames.GENDER]: 'Gender',
    [FieldNames.PHONE_NUMBER]: 'Phone Number',
}

const styles = StyleSheet.create({
    form: {
        // If needed, we can add default style for the form.
    },
    field: {
        marginBottom: 16,
    },
    lastField: {
        // Don't really need anything special here...
    },
})

PersonalInfoForm.propTypes = {
    style: PropTypes.object,
    user: PropTypes.object,
    onFieldChange: PropTypes.func.isRequired,
}

PersonalInfoForm.defaultProps = {
    style: {},
    user: null,
    onFieldChange: null,
}

export default PersonalInfoForm
