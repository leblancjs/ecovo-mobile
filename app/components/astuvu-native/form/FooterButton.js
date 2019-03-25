import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, StyleProvider, Spinner, Footer } from 'native-base'
import PropTypes from 'prop-types'
import getTheme from '../native-base-theme/components'
import commonColors from '../native-base-theme/variables/commonColor'
import SubmitButton from './SubmitButton'
class FooterButton extends Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        return (
            <StyleProvider style={getTheme(commonColors)}>
                <Footer>
                    <SubmitButton onPress={this.props.onPress} transparent={false} formError={this.props.formError} text={this.props.text} loading={this.props.loading} disabled={this.props.disabled} style={{ borderRadius:0, ...this.props.style }}></SubmitButton>
                </Footer>
            </StyleProvider>
        )
    }
}

export const FieldPropTypes = {
    style: PropTypes.object,
    text: PropTypes.string,
    disabled: PropTypes.boolean,
    loading: PropTypes.boolean,
    formError: PropTypes.boolean,
    onPress: PropTypes.func.isRequired
}

export const FieldDefaultProps = {
    style: {},
    text: "Submit",
    disabled: false,
    loading: false,
    formError: false,
}

export default FooterButton