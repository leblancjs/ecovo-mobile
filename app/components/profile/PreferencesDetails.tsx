import React, { Component } from 'react'
import { View } from 'native-base'
import { StyleSheet } from 'react-native'
import PreferenceSlider from './PreferenceSlider'
import { Preferences, Preference } from '../../entities'

export interface PreferencesDetailsProps {
    preferences?: Preferences
}

export const PreferencesDetailsDefaultProps : Partial<PreferencesDetailsProps> = {
    preferences: {
        smoking: Preference.Never,
        music: Preference.Never,
        conversation: Preference.Never,
    },
}

class PreferencesDetails extends Component<PreferencesDetailsProps> {
    static defaultProps = PreferencesDetailsDefaultProps
    
    constructor(props: PreferencesDetailsProps) {
        super(props)
    }

    render() {
        const preferences = this.props.preferences ?
            this.props.preferences :
            {
                smoking: Preference.Never,
                music: Preference.Never,
                conversation: Preference.Never,
            }
        
        return (
            <View style={styles.form}>
                <PreferenceSlider
                    style={styles.slider}
                    preference={preferences.music}
                    minIcon='music-note-off'
                    minIconType='community'
                    maxIcon='music-note'
                    disabled={true}
                    description='I like to listen to music in the car' />

                <PreferenceSlider
                    style={styles.slider}
                    preference={preferences.smoking}
                    minIcon='smoking-off'
                    minIconType='community'
                    maxIcon='smoking'
                    maxIconType='community'
                    disabled={true}
                    description='I like to smoke in the car' />

                <PreferenceSlider
                    preference={preferences.conversation}
                    minIcon='comment-remove-outline'
                    minIconType='community'
                    maxIcon='comment-text-outline'
                    maxIconType='community'
                    disabled={true}
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

export default PreferencesDetails