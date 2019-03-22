import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

class Form extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ ...styles.form, ...this.props.style }}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        padding: 8,
    }
})

Form.propTypes = {
    style: PropTypes.object,
}

Form.defaultProps = {
    style: {},
}

export default Form