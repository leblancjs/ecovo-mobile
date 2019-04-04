import React, { Component } from 'react'
import { View } from 'native-base'
import { StyleSheet } from 'react-native'
import PreferenceSlider from './PreferenceSlider'
import { Preferences, Preference } from '../../entities'

export interface PreferencesFormProps {
    preferences?: Preferences
    disabled?: boolean
    onFieldChange: (field: string, value: number) => void
}

export interface PreferencesFormState {
    preferences: Preferences
}

export const PreferencesFormDefaultProps : Partial<PreferencesFormProps> = {
    disabled: false,
    preferences: {
        smoking: Preference.Never,
        music: Preference.Never,
        conversation: Preference.Never,
    },
}

class PreferencesForm extends Component<PreferencesFormProps, PreferencesFormState> {
    static defaultProps = PreferencesFormDefaultProps
    
    constructor(props: PreferencesFormProps) {
        super(props)

        this.state = {
            preferences: props.preferences ?
                {
                    ...props.preferences,
                } :
                {
                    smoking: Preference.Never,
                    music: Preference.Never,
                    conversation: Preference.Never,
                }
        }
    }

    private onFieldChange = (field: string, value: number): void => {
        this.setState({
            preferences: {
                ...this.state.preferences,
                [field]: value,
            }
        })

        if (this.props.onFieldChange) {
            this.props.onFieldChange(field, value)
        }
    }

    render() {
        return (
            <View style={styles.form}>
                <PreferenceSlider
                    style={styles.slider}
                    preference={this.state.preferences.music}
                    onValueChange={value => this.onFieldChange('music', value)}
                    minIcon='music-note-off'
                    minIconType='community'
                    maxIcon='music-note'
                    disabled={this.props.disabled}
                    description='I like to listen to music in the car' />

                <PreferenceSlider
                    style={styles.slider}
                    preference={this.state.preferences.smoking}
                    onValueChange={value => this.onFieldChange('smoking', value)}
                    minIcon='smoking-off'
                    minIconType='community'
                    maxIcon='smoking'
                    maxIconType='community'
                    disabled={this.props.disabled}
                    description='I like to smoke in the car' />

                <PreferenceSlider
                    preference={this.state.preferences.conversation}
                    onValueChange={value => this.onFieldChange('conversation', value)}
                    minIcon='comment-remove-outline'
                    minIconType='community'
                    maxIcon='comment-text-outline'
                    maxIconType='community'
                    disabled={this.props.disabled}
                    description='I like to talk in the car' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        padding: 16
    },
    slider: {
        marginBottom: 32
    },
})

export default PreferencesForm