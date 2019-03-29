import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Item, Icon, Button, Label, Text } from 'native-base'
import { FieldPropTypes, FieldDefaultProps, FieldStyles } from './Field'

class LuggagePickerField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.initialValue,
        }
    }

    onValueChange = (value) => {
        this.setState({ value: value });
        if (this.props.onValueChange) {
            this.props.onValueChange(value)
        }

    }
    render = () => {
        return (
            <Item style={styles.selectItem} stackedLabel={true}>
                <Label style={styles.label}>{this.props.label}</Label>
                <View style={styles.row}>
                    <Button transparent style={styles.button} onPress={() => this.onValueChange(0)}>
                        <Icon type="MaterialIcons" style={[styles.mediumIcon, this.state.value == 0 ? styles.iconSelected : '']} name='do-not-disturb' />
                        <Text style={this.state.value == 0 ? styles.iconSelected: styles.text}>None</Text>
                    </Button>
                    <Button transparent style={styles.button} onPress={() => this.onValueChange(1)}>
                        <Icon type="FontAwesome5" style={[styles.mediumIcon, this.state.value == 1 ? styles.iconSelected : '']} name='suitcase' />
                        <Text style={this.state.value == 1 ? styles.iconSelected: styles.text}>Small</Text>
                    </Button>
                    <Button transparent style={styles.button} onPress={() => this.onValueChange(2)}>
                        <Icon type="FontAwesome5" style={[styles.mediumIcon, this.state.value == 2 ? styles.iconSelected : '']} name='suitcase-rolling' />
                        <Text style={this.state.value == 2 ? styles.iconSelected: styles.text}>Large</Text>
                    </Button>
                </View>
            </Item>

        )
    }
}

const styles = StyleSheet.create({
    ...FieldStyles,
    iconSelected: {
        color: "#2BB267"
    },
    label: {
        marginBottom: 10,
    },
    mediumIcon: {
        fontSize: 30,
        color: 'black'
    },
    selectItem: {
        borderBottomWidth: 0,
        alignSelf: 'center',
        flex: 1,
        width:'100%',
    },
    row: {
        flexDirection: 'row'
    },
    button: {
        width: '33%',
        flexDirection: 'column'

    },
    text: {
        color: "#000"
    }
})

LuggagePickerField.propTypes = {
    ...FieldPropTypes,
    initialValue: PropTypes.number,
    onValueChange: PropTypes.func,
}

LuggagePickerField.defaultProps = {
    ...FieldDefaultProps,
    initialValue: 0,
    onValueChange: null,
}


export default LuggagePickerField