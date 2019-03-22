import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text, Spinner } from 'native-base'
import PropTypes from 'prop-types'

class SubmitButton extends Component {
    constructor(props) {
        super(props)
    }
    _renderText = () => {
        if (this.props.isLoading) {
            return <Spinner/>

        } else { 
            return <Text>{this.props.text}</Text>
        }
     }

    render = () => {
        return (
            <Button style={{ ...this.props.style }} transparent={this.props.isTransparent} disabled={this.props.isDisabled}>
                {this._renderText()}
            </Button>
        )
    }
}

export const FieldStyles = StyleSheet.create({
})

export const FieldPropTypes = {
    style: PropTypes.object,
    text: PropTypes.string,
    isTransparent: PropTypes.boolean,
    isDisabled: PropTypes.boolean,
    isLoading: PropTypes.boolean,
}

export const FieldDefaultProps = {
    style: {},
    text: 'Submit',
    isTransparent: false,
    isDisabled: false,
    isLoading: false,
}

export default SubmitButton