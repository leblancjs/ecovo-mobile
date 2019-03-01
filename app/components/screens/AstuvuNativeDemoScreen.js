import React, { Component } from 'react'
import { Container, Content, Header, Text } from 'native-base'
import PersonalInfoForm from '../profile/PersonalInfoForm'
import PreferencesForm from '../profile/PreferencesForm'

class AstuvuNativeDemoScreen extends Component {
    constructor(props) {
        super(props)

        this.user = {
            firstName: 'Harold',
            lastName: 'The Great',
            dateOfBirth: new Date(),
            gender: 'Male',
            preferences: {
                music: 0,
                smoking: 1,
                conversation: 2
            }
        }

        this.state = {
            ...this.user
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

    render() {
        return (
            <Container>
                <Header />
                <Content>
                    <PersonalInfoForm user={this.user} onFieldChange={this._onPersonalInfoChange} />
                    <PreferencesForm preferences={this.user.preferences} onFieldChange={this._onPreferencesChange} />
                    <Text>{JSON.stringify(this.state)}</Text>
                </Content>
            </Container>
        )
    }
}

export default AstuvuNativeDemoScreen