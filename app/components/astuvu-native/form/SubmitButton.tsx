import React, { Component } from 'react'
import { Button, Text, Spinner } from 'native-base'

export interface SubmitButtonProps {
    style?: object
    text: string
    transparent?: boolean
    disabled?: boolean
    loading?: boolean
    formError?: boolean
    onPress: () => void
}

export const SubmitButtonDefaultProps = {
    style: {},
    text: 'Submit',
    transparent: false,
    disabled: false,
    loading: false,
    formError: false,
    onPress: undefined,
}

class SubmitButton extends Component<SubmitButtonProps> {
    static defaultProps = SubmitButtonDefaultProps

    constructor(props: SubmitButtonProps) {
        super(props)
    }

    _renderText = () => {
        const textStyle: any = {}
        if (this.props.transparent) {
            textStyle.color = 'white'
        }

        if (this.props.loading) {
            return <Spinner color='white' />
        } else {
            return <Text style={textStyle}>{this.props.text}</Text>
        }
    }

    render = () => {
        return (
            <Button full
                onPress={this.props.onPress}
                transparent={this.props.transparent}
                disabled={this.props.disabled || this.props.formError || this.props.loading}
                danger={this.props.formError}
            >
                {this._renderText()}
            </Button>
        )
    }
}

export default SubmitButton