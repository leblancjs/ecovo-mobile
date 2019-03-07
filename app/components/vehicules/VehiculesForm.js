import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, Input, Icon, Form, Item, Picker } from 'native-base'
import moment from 'moment'

class VehiculesForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            make: props.vehicule ? props.vehicule.make : '',
            model: props.vehicule ? props.vehicule.model : '',
            year: props.vehicule ? props.vehicule.year : '',
            color: props.vehicule ? props.vehicule.color : ''
        }
    }

    _onFieldChange = (field, value) => {
        this.setState({
            ...this.state,
            [field]: value
        })

        if (this.props.onFieldChange) {
            this.props.onFieldChange(field, value)
        }
    }

    render() {

        let yearItem = [];

        for (let i = moment().year(); i >= 1950; i--) {
            yearItem.push(<Picker.Item key={i} label={i} value={i} />)
        }

        return (
            <Form style={styles.form}>
                <Item style={styles.item}>
                    <Input style={styles.input}
                        value={this.state.make}
                        onChangeText={value => this._onFieldChange('make', value)}
                        placeholder="Make" />
                </Item>
                <Item style={styles.item}>
                    <Input style={styles.input}
                        value={this.state.model}
                        onChangeText={value => this._onFieldChange('model', value)}
                        placeholder="Model" />
                </Item>
                <Item style={styles.item} picker>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            textStyle={styles.pickerText}
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="Year"
                            selectedValue={this.state.year}
                            onValueChange={value => this._onFieldChange('year', value)}>
                            {yearItem}
                        </Picker>
                    </View>
                </Item>
                <Item style={styles.lastItem} picker>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            textStyle={styles.pickerText}
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="Color"
                            selectedValue={this.state.color}
                            onValueChange={value => this._onFieldChange('color', value)}>
                            <Picker.Item label="Black" value="Black" />
                            <Picker.Item label="Blue" value="Blue" />
                            <Picker.Item label="Brown" value="Brown" />
                            <Picker.Item label="Gray" value="Gray" />
                            <Picker.Item label="Green" value="Green" />
                            <Picker.Item label="Orange" value="Orange" />
                            <Picker.Item label="Red" value="Red" />
                            <Picker.Item label="Silver" value="Silver" />
                            <Picker.Item label="White" value="White" />
                            <Picker.Item label="Yellow" value="Yellow" />
                        </Picker>
                    </View>
                </Item>
            </Form>
        )
    }
}

const inputStyle = {
    backgroundColor: '#E8E8E8',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
    paddingLeft: 16,
    height: 58
}

const styles = StyleSheet.create({
    form: {
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 16
    },
    item: {
        borderBottomWidth: 0,
        marginBottom: 16
    },
    lastItem: {
        borderBottomWidth: 0,
        marginBottom: 0
    },
    input: {
        ...inputStyle,
    },
    pickerContainer: {
        ...inputStyle,
        flex: 1,
        justifyContent: 'center',
        marginBottom: 0,
        marginLeft: 14,
        paddingLeft: 0,
    },
    picker: {
        width: '100%'
    },
    pickerText: {
        color: 'rgba(0, 0, 0, 0.6)'
    }
})

VehiculesForm.propTypes = {
    vehicule: PropTypes.object,
    onFieldChange: PropTypes.func.isRequired
}

export default VehiculesForm
