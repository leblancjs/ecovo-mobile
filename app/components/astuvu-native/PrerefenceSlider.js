import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Left, Right } from 'native-base'
import { StyleSheet, Slider } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class PreferenceSlider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            preference: props.preference ? props.preference : 0
        }
    }

    _onValueChange = value => {
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
                        <MaterialCommunityIcons style={styles.icon} name={this.props.minIcon} solid /> :
                        <MaterialIcons style={styles.icon} name={this.props.minIcon} solid />}

                    <Slider style={styles.slider}
                        value={this.state.preference}
                        onValueChange={value => this._onValueChange(value)}
                        step={1}
                        minimumValue={0}
                        minimumTrackTintColor={this.props.color}
                        disabled={this.props.disabled}
                        maximumValue={2} />

                    {this.props.maxIconType === 'community' ?
                        <MaterialCommunityIcons style={styles.icon} name={this.props.maxIcon} solid /> :
                        <MaterialIcons style={styles.icon} name={this.props.maxIcon} solid />}
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
        alignItems: 'center'
    },
    description: {
        marginBottom: 8
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    slider: {
        flex: 1
    },
    icon: {
        fontSize: 20,
        padding: 16
    },
    labelContainer: {
        flexDirection: 'row'
    },
    label: {
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.8)'
    }
})

PreferenceSlider.propTypes = {
    preference: PropTypes.number,
    onValueChange: PropTypes.func.isRequired,
    minIcon: PropTypes.string.isRequired,
    minIconType: PropTypes.oneOf(['community']),
    maxIcon: PropTypes.string.isRequired,
    maxIconType: PropTypes.oneOf(['community']),
    description: PropTypes.string,
    color: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.bool,
}

PreferenceSlider.defaultProps = {
    color: '#2bb267'
}

export default PreferenceSlider