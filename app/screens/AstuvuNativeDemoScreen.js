import React, { Component } from 'react'
import { Container, Content, Header, Text } from 'native-base'
import { Form, TextField, PickerField, DatePickerField } from '../components/astuvu-native/form'

class AstuvuNativeDemoScreen extends Component {
    constructor(props) {
        super(props)

        this.user = {
            firstName: 'Harold',
            lastName: 'The Great',
            dateOfBirth: null,
            gender: 'Male',
            preferences: {
                music: 0,
                smoking: 1,
                conversation: 2,
            },
        }

        this.state = {
            ...this.user,
            text: 'Initial Value',
            pickerItems: [{
                label: 'The First Value',
                value: 'Hide'
            }, {
                label: 'The Second Value',
                value: 'The'
            }, {
                label: 'The Third Value',
                value: 'Pain'
            }],
            date: new Date(),
        }
    }

    _onPersonalInfoChange = (field, value) => {
        this.setState({
            ...this.state,
            [field]: value
        })
    }

    _onPreferencesChange = (field, value) => {
        this.setState({
            ...this.state,
            preferences: {
                ...this.state.preferences,
                [field]: value
            }
        })
    }

    _onTextChange = (value) => {
        this.setState({
            ...this.state,
            text: value
        })
    }

    _onPickerChange = (value) => {
        this.setState({
            ...this.state,
            picker: value
        })
    }

    _onDatePickerChange = (value) => {
        this.setState({
            ...this.state,
            date: value
        })
    }

    _validateAge = (value) => {
        return `This is a custom validator error.`
    }

    render() {
        return (
            <Container>
                <Header />
                <Content>
                    {/* <PersonalInfoForm user={this.user} onFieldChange={this._onPersonalInfoChange} />
                    <PreferencesForm preferences={this.user.preferences} onFieldChange={this._onPreferencesChange} /> */}
                    <Text>{JSON.stringify(this.state)}</Text>
                    <Form>
                        <TextField label="Text" initialValue={this.state.text} required={true} onValueChange={this._onTextChange} />
                        <PickerField label="Picker" initialValue={this.state.pickerItems[0].value} items={this.state.pickerItems} required={true} error={`I'm not happy with the value.`} onValueChange={this._onPickerChange} />
                        <DatePickerField label="Date Picker" initialValue={this.state.date} required={true} onValueChange={this._onDatePickerChange} onValidate={this._validateAge} bottomBorder={false} />
                    </Form>
                </Content>
            </Container>
        )
    }
}

export default AstuvuNativeDemoScreen