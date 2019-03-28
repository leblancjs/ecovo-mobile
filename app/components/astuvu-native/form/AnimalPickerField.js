import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Item, Icon, Button, Label, Text } from 'native-base'
import Field, { FieldPropTypes, FieldDefaultProps, FieldStyles, FieldLabelTypes } from './Field'

class AnimalPickerField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.initialValue,
        }
    }

    onValueChange = (value) => {
        this.setState({ value: value });
        if (this.props.onValueChange()) {
            this.props.onValueChange(value)
        }

    }
    render = () => {
        return (
            <Item style={styles.selectItem} stackedLabel={true}>
                <Label style={styles.label} >{this.props.label}</Label>
                <View style={styles.row}>
                    <Button transparent style={styles.button} onPress={() => this.onValueChange(0)}>
                        <Icon type="Foundation" style={[styles.mediumIcon, this.state.value == 0 ? styles.iconSelected : '']} name='no-dogs' />
                        <Text style={this.state.value == 0 ? styles.iconSelected: styles.text}>No</Text>
                    </Button>
                    <Button transparent style={styles.button} onPress={() => this.onValueChange(1)}>
                        <Icon type="Foundation" style={[styles.mediumIcon, this.state.value == 1 ? styles.iconSelected : '']} name='guide-dog' />
                        <Text style={this.state.value == 1 ? styles.iconSelected: styles.text}>Yes</Text>
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
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        width: '50%',
        flexDirection: 'column',
    },
    text: {
        color: "#000"
    },

})

AnimalPickerField.propTypes = {
    ...FieldPropTypes,
    initialValue: PropTypes.number,
    onValueChange: PropTypes.func,
}

AnimalPickerField.defaultProps = {
    ...FieldDefaultProps,

    initialValue: 0,
    onValueChange: null,
}


export default AnimalPickerField