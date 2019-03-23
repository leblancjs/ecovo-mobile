import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, StyleProvider, Spinner } from 'native-base'
import PropTypes from 'prop-types'
import getTheme from '../native-base-theme/components'
import commonColors from '../native-base-theme/variables/commonColor'

class SubmitButton extends Component {
    constructor(props) {
        super(props)
    }
    _renderText = () => {
        if (this.props.loading) {
            return <Spinner color='white'/>

        } else {
            return <Text>{this.props.text}</Text>
        }
    }

    render = () => {
        return (
            <StyleProvider style={getTheme(commonColors)}>
                <Button style={{ ...this.props.style }} transparent={this.props.transparent} disabled={this.props.disabled || this.props.formError} danger={this.props.formError}>
                    {this._renderText()}
                </Button>
            </StyleProvider>
        )
    }
}

export const FieldStyles = StyleSheet.create({
})

export const FieldPropTypes = {
    style: PropTypes.object,
    text: PropTypes.string,
    transparent: PropTypes.boolean,
    disabled: PropTypes.boolean,
    loading: PropTypes.boolean,
    formError: PropTypes.boolean,
}

export const FieldDefaultProps = {
    style: {},
    text: 'Submit',
    transparent: false,
    disabled: false,
    loading: false,
    formError: false,
}

export default SubmitButton