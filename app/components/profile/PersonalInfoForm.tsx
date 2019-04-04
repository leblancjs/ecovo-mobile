import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Form, TextField, PickerField, DatePickerField } from '../astuvu-native'
import { User } from '../../entities'

export interface PersonalInfoFormProps {
    style?: object
    user: User
    onFieldChange: (field: string, value: any, error: string | null) => void
}

export interface PersonalInfoFormState {
    /*
     * The type 'any' is intentional.
     */
    user: any
}

export const PersonalInfoFormDefaultProps = {
    style: {},
    user: undefined,
    onFieldChange: undefined,
}

enum FieldNames {
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    DATE_OF_BIRTH = 'dateOfBirth',
    GENDER = 'gender',
    PHONE_NUMBER = 'phoneNumber',
}

const FieldLabels: {[key: string]: string} = {
    [FieldNames.FIRST_NAME]: 'First Name',
    [FieldNames.LAST_NAME]: 'Last Name',
    [FieldNames.DATE_OF_BIRTH]: 'Date of Birth',
    [FieldNames.GENDER]: 'Gender',
    [FieldNames.PHONE_NUMBER]: 'Phone Number',
}

class PersonalInfoForm extends Component<PersonalInfoFormProps, PersonalInfoFormState> {
    constructor(props: PersonalInfoFormProps) {
        super(props)

        this.state = {
            user: {
                firstName: props.user.firstName,
                lastName: props.user.lastName,
                dateOfBirth: this.parseDate(props.user.dateOfBirth),
                gender: props.user.gender,
                phoneNumber: props.user.phoneNumber,
            },
        }
    }

    private parseDate = (date: any) => {
        if (date) {
            return new Date(Date.parse(date))
        }

        return undefined
    }

    private onFieldChange = (field: string, value: any, error: string | null) => {
        if (this.props.onFieldChange) {
            this.props.onFieldChange(field, value, error)
        }

        this.setState({
            user: {
                ...this.state.user,
                [field]: value,
            }
        })
    }

    private onValidateField = (field: string, value: any): string | null => {
        switch (field) {
            case FieldNames.DATE_OF_BIRTH:
                return this.validateAge(value)
            case FieldNames.FIRST_NAME:
            case FieldNames.LAST_NAME:
            case FieldNames.GENDER:
                return this.validateString(field, value)
            case FieldNames.PHONE_NUMBER:
                // Phone number is optional, so we won't do anything.
            default:
                return null
        }
    }

    private validateString = (field: string, value: any): string | null => {
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

    private validateAge(value: string): string | null {
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

    private renderTextField = (field: string, style: object = styles.field) => {    
        return (
            <TextField
                style={style}
                label={FieldLabels[field]}
                initialValue={this.state.user[field]}
                required={true}
                onValueChange={(v, err) => this.onFieldChange(field, v, err)}
                onValidate={v => this.onValidateField(field, v)}
            />
        )
    }

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
                {this.renderTextField(FieldNames.FIRST_NAME)}
                {this.renderTextField(FieldNames.LAST_NAME)}
                <DatePickerField
                    style={styles.field}
                    label='Date of Birth'
                    placeholder='Please select a date'
                    initialValue={(this.state.user[FieldNames.DATE_OF_BIRTH])}
                    required={true}
                    onValueChange={(v, err) => this.onFieldChange(FieldNames.DATE_OF_BIRTH, v, err)}
                    onValidate={v => this.onValidateField(FieldNames.DATE_OF_BIRTH, v)}
                />
                <PickerField
                    style={styles.field}
                    label="Gender"
                    initialValue={genderItems[0].value}
                    items={genderItems}
                    required={true}
                    onValueChange={(v, err) => this.onFieldChange(FieldNames.GENDER, v, err)}
                    onValidate={v => this.onValidateField(FieldNames.GENDER, v)}
                />
                {this.renderTextField(FieldNames.PHONE_NUMBER, styles.lastField)}
            </Form>
        )
    }
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

export default PersonalInfoForm
