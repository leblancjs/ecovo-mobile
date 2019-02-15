import React, { Component } from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { Input, Icon, Container, Form, Button, Item, Content, DatePicker, Picker, Right } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { updateFirstName, updateLastName, updateDateOfBirth, updateGender, setFormFilled } from '../../actions/ui/signup';
import { createUser } from '../../actions/user'

class AddPersonnalInfoScreen extends Component {
    constructor(props) {
        super(props);
    }

    _updateFirstName = (firstName) => {
        this.props.updateFirstName(firstName);
    }

    _updateLastName = (lastName) => {
        this.props.updateLastName(lastName);
    }

    _updateDateOfBirth = (dateOfBirth) => {
        this.props.updateDateOfBirth(dateOfBirth);
    }

    _updateGender = (gender) => {
        this.props.updateGender(gender);
    }

    _createUser = () => {
        this.props.createUser(this.props.auth.credentials.accessToken, this.props.user);
    }

    componentDidUpdate() {
        if(this.props.user.firstName != ''
            && this.props.user.lastName != ''
            && this.props.user.dateOfBirth != undefined
            && this.props.user.gender != '') {
                this.props.setFormFilled(true);
        } else {
            this.props.setFormFilled(false);
        } 
            
    }

    render() {
        return (
            <Container style={styles.container}>
                <Text style={styles.title}>Personnal Info</Text>
                <Content>
                    <Button style={styles.addPictureBtn} transparent>
                        <Image style={styles.profilePicIcon} source={require('../../../assets/profile_pic.png')}/>
                        <Text style={styles.text}>Choose a picture</Text>
                    </Button>
                    <Form>
                        <Item style={styles.item}>
                            <Input style={styles.text} 
                                onChangeText={(firstName) => this._updateFirstName(firstName)}
                                placeholder="First Name"/>
                        </Item>
                        <Item style={styles.item}>
                            <Input style={styles.text}
                                onChangeText={(lastName) => this._updateLastName(lastName)}
                                placeholder="Last Name"/>
                        </Item>
                        <Item style={styles.item}>
                            <DatePicker
                                defaultDate={new Date(1990, 1, 1)}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Birthdate"
                                onDateChange={(birthdate) => this._updateDateOfBirth(birthdate)}
                                disabled={false}
                                style={styles.text}/>
                            <Right>
                                <Icon name='calendar' />
                            </Right>
                        </Item>
                        <Item style={styles.item}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Gender..."
                                selectedValue={this.props.user.gender}
                                onValueChange={(gender) => this._updateGender(gender)}
                                >
                                <Picker.Item label="Male" value="male" />
                                <Picker.Item label="Female" value="female" />
                            </Picker>
                        </Item>
                    </Form>
                    { this.props.formFilled && 
                        <Button transparent style={styles.nextBtn}
                            onPress={this._createUser}>
                            <Text style={styles.textGreen}>Next</Text>
                            <Icon style={styles.textGreen} name="ios-arrow-forward"/>
                        </Button>
                    }
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      margin: 10
    },
    title: {
      fontSize: 30,
      textAlign: 'left',
      margin: 20,
    },
    text: {
        fontSize: 15,
        opacity: 1
    },
    textGreen: {
        fontSize: 20,
        color: '#2BB267'
    },
    item: {
        margin: 20
    }, 
    nextBtn: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        marginBottom: 2
    },
    profilePicIcon: {
        width: 70,
        height: 70, 
        marginRight: 10
    },
    addPictureBtn: {
        margin: 10,
        height: 70
    }
});

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.ui.signup.user,
    formFilled: state.ui.signup.formFilled 
});

const mapDispatchToProps = dispatch => ({
    updateFirstName: (firstName) => dispatch(updateFirstName(firstName)),
    updateLastName: (lastName) => dispatch(updateLastName(lastName)),
    updateDateOfBirth: (dateOfBirth) => dispatch(updateDateOfBirth(dateOfBirth)),
    updateGender: (gender) => dispatch(updateGender(gender)),
    createUser: (accessToken, user) => dispatch(createUser(accessToken, user))
        .then(() => dispatch(NavigationActions.navigate({ routeName: 'AddPreferences' }))),
    setFormFilled: (formFilled) => dispatch(setFormFilled(formFilled))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPersonnalInfoScreen);
