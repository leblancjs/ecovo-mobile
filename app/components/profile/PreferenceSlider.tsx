import React, { Component } from 'react'
import { View, Text, Left, Right } from 'native-base'
import { StyleSheet, Slider } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export interface PreferenceSliderProps {
    preference?: number
    minIcon: string
    minIconType?: 'community'
    maxIcon: string
    maxIconType?: 'community'
    description?: string
    color?: string
    style?: object
    disabled?: boolean
    onValueChange: (value: number) => void
}

export interface PreferenceSliderState {
    preference: number
}

export const PreferenceSliderDefaultProps = {
    preference: 0,
    minIcon: '',
    minIconType: 'community',
    maxIcon: '',
    maxIconType: 'community',
    description: '',
    color: '#2bb267',
    style: {},
    disabled: false,
    onValueChange: undefined,
}

class PreferenceSlider extends Component<PreferenceSliderProps, PreferenceSliderState> {
    static defaultProps = PreferenceSliderDefaultProps

    constructor(props: PreferenceSliderProps) {
        super(props)

        this.state = {
            preference: props.preference ? props.preference : 0
        }
    }

    private onValueChange = (value: number) => {
        this.setState({
            preference: value
        })

        if (this.props.onValueChange) {
            this.props.onValueChange(value)
        }
    }

    render() {
        return (
            <View style={{...styles.container, ...this.props.style}}>
                {this.props.description &&
                    <Text style={styles.description}>{this.props.description}</Text>}
                
                <View style={styles.sliderContainer}>
                    {this.props.minIconType === 'community' ?
                        <MaterialCommunityIcons style={styles.icon} name={this.props.minIcon} /> :
                        <MaterialIcons style={styles.icon} name={this.props.minIcon} />}

                    <Slider style={styles.slider}
                        value={this.state.preference}
                        onValueChange={value => this.onValueChange(value)}
                        step={1}
                        minimumValue={0}
                        minimumTrackTintColor={this.props.color}
                        disabled={this.props.disabled}
                        maximumValue={2} />

                    {this.props.maxIconType === 'community' ?
                        <MaterialCommunityIcons style={styles.icon} name={this.props.maxIcon} /> :
                        <MaterialIcons style={styles.icon} name={this.props.maxIcon} />}
                </View>

                <View style={styles.labelContainer}>
                    <Left>
                        <Text style={styles.label}>Never</Text>
                    </Left>
                    <Text style={styles.label}>Occasionally</Text>
                    <Right>
                        <Text style={styles.label}>Frequently</Text>
                    </Right>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    description: {
        marginBottom: 8,
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    slider: {
        flex: 1,
    },
    icon: {
        fontSize: 20,
        padding: 16,
    },
    labelContainer: {
        flexDirection: 'row',
    },
    label: {
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.8)',
    },
})

export default PreferenceSlider