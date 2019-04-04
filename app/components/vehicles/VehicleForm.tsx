import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Form, TextField, PickerField, PickerFieldItem } from '../astuvu-native'
import moment from 'moment'
import { Vehicle } from '../../entities'

export interface VehicleFormProps {
    vehicle?: Vehicle
    onFieldChange: (field: string, value: any, error: string | null) => void
}

export interface VehicleFormState {
    /*
     * The type 'any' is intentional.
     */
    vehicle: any
}

export const VehicleFormDefaultProps = {
    vehicle: {}
}

enum FieldNames {
    MAKE = 'make',
    MODEL = 'model',
    YEAR = 'year',
    SEATS = 'seats',
    COLOR = 'color',
}

const FieldLabels: {[key: string]: string} = {
    [FieldNames.MAKE]: 'Make',
    [FieldNames.MODEL]: 'Model',
    [FieldNames.YEAR]: 'Year',
    [FieldNames.SEATS]: 'Seats',
    [FieldNames.COLOR]: 'Color',
}

class VehiculesForm extends Component<VehicleFormProps, VehicleFormState> {
    static defaultProps = VehicleFormDefaultProps

    constructor(props: VehicleFormProps) {
        super(props)

        this.state = {
            vehicle: {
                ...props.vehicle,
            },
        }
    }

    private onFieldChange = (field: string, value: any, error: string | null) => {
        if (this.props.onFieldChange) {
            this.props.onFieldChange(field, value, error)
        }

        this.setState({
            vehicle: {
                ...this.state.vehicle,
                [field]: value
            }
        })
    }

    private validateString = (field: string, value: any): string | null => {
        const error = `Please enter your car's ${FieldLabels[field].toLowerCase()}.`

        if (typeof value !== 'string') {
            return error
        }

        let trimmedValue = value.trim()
        if (trimmedValue === '') {
            return error
        }

        return null
    }

    private validateYear = (field: string, value: any): string | null => {
        const error = `Please enter your car's ${FieldLabels[field].toLowerCase()}.`

        if (typeof value !== 'number') {
            return error
        }

        if (value < 1950) {
            return `Your car can't possibly be that old.`
        }

        if (value > (moment().year() + 1)) {
            return `Please come back to the present.`
        }

        return null
    }

    private validateSeats = (field: string, value: any): string | null => {
        const error = `Please enter your car's ${FieldLabels[field].toLowerCase()}.`

        if (typeof value !== 'number') {
            return error
        }

        if (value < 1) {
            return `You can't carpool by yourself.`
        }

        if (value > 8) {
            return `I'd be surprised if you had a license for a mini-bus.`
        }

        return null
    }

    private onValidateField = (field: string, value: any): string | null => {
        switch (field) {
            case FieldNames.MAKE:
            case FieldNames.MODEL:
            case FieldNames.COLOR:
                return this.validateString(field, value)
            case FieldNames.YEAR:
                return this.validateYear(field, value)
            case FieldNames.SEATS:
                return this.validateSeats(field, value)
            default:
                return null
        }
    }

    private renderTextField = (field: string, style: object = styles.field) => {    
        return (
            <TextField
                style={style}
                label={FieldLabels[field]}
                initialValue={this.state.vehicle[field]}
                required={true}
                onValueChange={(v, err) => this.onFieldChange(field, v, err)}
                onValidate={v => this.onValidateField(field, v)}
            />
        )
    }

    render() {
        const yearItems: PickerFieldItem[] = []
        for (let year = moment().year(); year >= 1950; year--) {
            yearItems.push({
                label: `${year}`,
                value: year,
            })
        }

        const seatsItems: PickerFieldItem[] = []
        for (let seats = 1; seats <= 8; seats++){
            seatsItems.push({
                label: `${seats}`,
                value: seats,
            })
        }

        const colorItems = ["Black", "Blue", "Brown", "Gray", "Green", "Orange", "Red", "Silver", "White", "Yellow"]
            .map(color => ({
                label: color,
                value: color
            }))

        return (
            <Form style={styles.form}>
                {this.renderTextField(FieldNames.MAKE)}
                {this.renderTextField(FieldNames.MODEL)}
                <PickerField
                    style={styles.field}
                    label="Year"
                    initialValue={yearItems[0].value}
                    items={yearItems}
                    required={true}
                    onValueChange={(v, err) => this.onFieldChange(FieldNames.YEAR, v, err)}
                    onValidate={v => this.onValidateField(FieldNames.YEAR, v)}
                />
                <PickerField
                    style={styles.field}
                    label="Number of available seats (for passengers)"
                    initialValue={seatsItems[0].value}
                    items={seatsItems}
                    required={true}
                    onValueChange={(v, err) => this.onFieldChange(FieldNames.SEATS, v, err)}
                    onValidate={v => this.onValidateField(FieldNames.SEATS, v)}
                />
                <PickerField
                    style={styles.field}
                    label="Color"
                    initialValue={colorItems[0].value}
                    items={colorItems}
                    required={true}
                    onValueChange={(v, err) => this.onFieldChange(FieldNames.COLOR, v, err)}
                    onValidate={v => this.onValidateField(FieldNames.COLOR, v)}
                />
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

export default VehiculesForm
