import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'native-base'
import { StyleSheet } from 'react-native'
import PreferenceSlider from '../astuvu-native/PrerefenceSlider'

class PreferencesForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            music: props.preferences ? props.preferences.music : 0,
            smoking: props.preferences ? props.preferences.smoking : 0,
            conversation: props.preferences ? props.preferences.conversation : 0
        }
    }

    _onFieldChange = (field, value) => {
        this.setState({
            ...this.state,
            [field]: value
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
                    preference={this.state.music}
                    onValueChange={value => this._onFieldChange('music', value)}
                    minIcon='music-note-off'
                    minIconType='community'
                    maxIcon='music-note'
                    disabled={this.props.disabled}
                    description='I like to listen to music in the car' />

                <PreferenceSlider
                    style={styles.slider}
                    preference={this.state.smoking}
                    onValueChange={value => this._onFieldChange('smoking', value)}
                    minIcon='smoke-free'
                    maxIcon='smoking-rooms'
                    disabled={this.props.disabled}
                    description='I like to smoke in the car' />

                <PreferenceSlider
                    preference={this.state.conversation}
                    onValueChange={value => this._onFieldChange('conversation', value)}
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

PreferencesForm.propTypes = {
    preferences: PropTypes.object,
    onFieldChange: PropTypes.func
}

export default PreferencesForm