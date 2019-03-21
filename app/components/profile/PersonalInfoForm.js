import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, Form, Item, Input, DatePicker, Picker, Right, Icon, Text } from 'native-base'

class PersonalInfoForm extends Component {
    constructor(props) {
        super(props)

        let dateOfBirth = props.user.dateOfBirth ?
            new Date(Date.parse(props.user.dateOfBirth)) :
            null

        this.state = {
            firstName: props.user ? props.user.firstName : '',
            lastName: props.user ? props.user.lastName : '',
            dateOfBirth: dateOfBirth,
            gender: props.user ? props.user.gender : '',
            firstNameError: null,
            lastNameError: null,
            dateOfBirthError: null,
        }
    }

    _onFieldChange = (field, value) => {
        this.setState({
            ...this.state,
            [field]: value
        })

        var fieldIsValid = false

        switch(field) {
            case 'firstName':
                if (value.trim() === "") {
                    this.setState(() => ({firstNameError: "First name required."}));
                } else {
                    fieldIsValid = true
                    this.setState(() => ({firstNameError: null}));
                }
                break;
            case 'lastName':
                if (value.trim() === "") {
                    this.setState(() => ({lastNameError: "Last name required."}));
                } else {
                    fieldIsValid = true
                    this.setState(() => ({lastNameError: null}));
                }
                break;
            case 'dateOfBirth': {
                if (this._getAge(value) < 18) {
                    this.setState(() => ({dateOfBirthError: "Must be 18 and older.", dateOfBirth: null}));
                } else {
                    fieldIsValid = true
                    this.setState(() => ({dateOfBirthError: null}));
                }
                break;
            }
            default:
                break;
        }

        if (this.props.onFieldChange) {
            this.props.onFieldChange(field, value)
        }
    }

    _getAge(dateOfBirth) {
        var today = new Date();
        var birthDate = new Date(dateOfBirth);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }    
        return age;
    }

    render() {
        return (
            <Form style={styles.form}>
                <Item style={styles.item}>
                    <Input style={styles.input}
                        placeholder='First Name'
                        value={this.state.firstName}
                        onChangeText={value => this._onFieldChange('firstName', value)} />
                </Item>
                {!!this.state.firstNameError && (
                    <Item style={styles.item}>
                        <Text style={styles.errorMsg}>{this.state.firstNameError}</Text>
                    </Item>
                )}
                <Item style={styles.item}>
                    <Input style={styles.input}
                        placeholder='Last Name'
                        value={this.state.lastName}
                        onChangeText={value => this._onFieldChange('lastName', value)} />
                </Item>
                {!!this.state.lastNameError && (
                    <Item style={styles.item}>
                        <Text style={styles.errorMsg}>{this.state.lastNameError}</Text>
                    </Item>
                )}
                <Item style={styles.item} picker stackedLabel>
                    <View style={styles.datePickerContainer}>
                        <DatePicker
                            textStyle={styles.datePickerText}
                            placeHolderText={this.state.dateOfBirth ? null : 'Date of Birth'}
                            placeHolderTextStyle={styles.datePickerText}
                            defaultDate={this.state.dateOfBirth}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            onDateChange={value => this._onFieldChange('dateOfBirth', value)}
                            disabled={false}/>
                        <Right>
                            <Icon name='calendar' style={styles.datePickerIcon} />
                        </Right>
                    </View>
                </Item>
                {!!this.state.dateOfBirthError && (
                    <Item style={styles.item}>
                        <Text style={styles.errorMsg}>{this.state.dateOfBirthError}</Text>
                    </Item>
                )}
                <Item style={styles.lastItem} picker>
                    <View style={styles.genderPickerContainer}>
                        <Picker style={styles.genderPicker}
                            placeholder='Gender'
                            placeholderStyle={styles.genderPickerText}
                            selectedValue={this.state.gender}
                            textStyle={styles.genderPickerText}
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            onValueChange={value => this._onFieldChange('gender', value)}>
                            <Picker.Item label="Male" value="Male"/>
                            <Picker.Item label="Female" value="Female"/>
                            <Picker.Item label="Other" value="Other"/>
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
    genderPickerContainer: {
        ...inputStyle,
        flex: 1,
        justifyContent: 'center',
        marginBottom: 0,
        marginLeft: 14,
        paddingLeft: 0,
    },
    genderPicker: {
        width: '100%'
    },
    genderPickerText: {
        color: 'rgba(0, 0, 0, 0.6)'
    },
    datePickerContainer: {
        ...inputStyle,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingRight: 16
    },
    datePickerText: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.6)',
        marginLeft: -10,
        paddingTop: 22
    },
    datePickerIcon: {
        opacity: 0.8
    },
    errorMsg: {
        color: '#FF0000'
    }
})

PersonalInfoForm.propTypes = {
    user: PropTypes.object,
    onFieldChange: PropTypes.func.isRequired
}

export default PersonalInfoForm