import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

export interface FormProps {
    style?: object
}

class Form extends Component<FormProps> {
    static defaultProps: FormProps = {
        style: {}
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

export default Form