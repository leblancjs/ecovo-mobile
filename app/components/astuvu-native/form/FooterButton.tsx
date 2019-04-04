import React, { Component } from 'react'
import SubmitButton, { SubmitButtonProps, SubmitButtonDefaultProps } from './SubmitButton'

export interface FooterButtonProps extends SubmitButtonProps {}

export const FooterButtonDefaultProps = {
    ...SubmitButtonDefaultProps,
}

class FooterButton extends Component<FooterButtonProps> {
    static defaultProps = FooterButtonDefaultProps

    constructor(props: FooterButtonProps) {
        super(props)
    }

    render = () => {
        return (
            <SubmitButton
                onPress={this.props.onPress}
                transparent={true}
                formError={this.props.formError}
                text={this.props.text}
                loading={this.props.loading}
                disabled={this.props.disabled}
            />
        )
    }
}

export default FooterButton