import React, { Component } from 'react'
import { StyleProvider, Footer } from 'native-base'
import PropTypes from 'prop-types'
import SubmitButton from './SubmitButton'

class FooterButton extends Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        return (
            <Footer>
                <SubmitButton onPress={this.props.onPress} transparent={false} formError={this.props.formError} text={this.props.text} loading={this.props.loading} disabled={this.props.disabled} style={{ borderRadius: 0, ...this.props.style }}></SubmitButton>
            </Footer>
        )
    }
}

FooterButton.propTypes = {
    style: PropTypes.object,
    text: PropTypes.string,
    disabled: PropTypes.boolean,
    loading: PropTypes.boolean,
    formError: PropTypes.boolean,
    onPress: PropTypes.func.isRequired
}

FooterButton.defaultProps = {
    style: {},
    text: "Submit",
    disabled: false,
    loading: false,
    formError: false,
}

export default FooterButton