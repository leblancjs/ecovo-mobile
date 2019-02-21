import React, { Component } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { Input, Icon, Container, Form, Button, Item, Content, DatePicker, Picker, Right } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { createUser } from '../../actions/user'
import PhotoUpload from 'react-native-photo-upload'

class AddPersonnalInfoScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            user: {
                photo: '',
                firstName: '',
                lastName: '',
                dateOfBirth: undefined,
                gender: 'Male',
            }
        };
    }

    _setPhoto = (photo) => {
        this.setState(state => ({ 
            ...state,
            user: {
              ...state.user,
              photo,
            },
          }));
    }

    _setFirstName = (firstName) => {
        this.setState(state => ({ 
            ...state,
            user: {
              ...state.user,
              firstName,
            },
          }));
    }

    _setLastName = (lastName) => {
        this.setState(state => ({ 
            ...state,
            user: {
              ...state.user,
              lastName,
            },
          }));
    }

    _setDateOfBirth = (dateOfBirth) => {
        this.setState(state => ({ 
            ...state,
            user: {
              ...state.user,
              dateOfBirth,
            },
          }));
    }

    _setGender = (gender) => {
        this.setState(state => ({ 
            ...state,
            user: {
              ...state.user,
              gender,
            },
          }));
    }

    _createUser = () => {
        this.props.createUser(this.props.auth.credentials.accessToken, this.state.user);
    }

    render() {
        let picStyle;

        if(this.state.user.photo == '') {
            picStyle = styles.defaultImagePicker;
        } else {
            picStyle = styles.imagePicker;
        }

        return (
            <Container style={styles.container}>
                <Text style={styles.title}>Personnal Info</Text>
                <Content>
                    <PhotoUpload
                        onPhotoSelect={photo => {
                            if (photo) {
                                this._setPhoto(photo);
                            }
                        }}
                        >
                        <Image
                            style={picStyle}
                            resizeMode='cover'
                            source={require('../../../assets/profile_pic.png')}
                        />
                    </PhotoUpload>
                    <Form>
                        <Item style={styles.item}>
                            <Input style={styles.text} 
                                onChangeText={(firstName) => this._setFirstName(firstName)}
                                placeholder="First Name"/>
                        </Item>
                        <Item style={styles.item}>
                            <Input style={styles.text}
                                onChangeText={(lastName) => this._setLastName(lastName)}
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
                                placeHolderText="Date of birth"
                                onDateChange={(dateOfBirth) => this._setDateOfBirth(dateOfBirth)}
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
                                placeholder="Gender..."
                                selectedValue={this.state.user.gender}
                                onValueChange={(gender) => this._setGender(gender)}
                                >
                                <Picker.Item label="Male" value="male" />
                                <Picker.Item label="Female" value="female" />
                            </Picker>
                        </Item>
                    </Form>
                </Content>
                <View style={styles.nextBtn}>
                    { this.state.user.firstName != ''
                        && this.state.user.lastName != ''
                        && this.state.user.dateOfBirth != undefined 
                        && 
                            <Button transparent
                                onPress={this._createUser}>
                                <Text style={styles.textGreen}>Next</Text>
                                <Icon style={styles.textGreen} name="ios-arrow-forward"/>
                            </Button>
                    }
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      margin: 15
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
        margin: 15
    }, 
    nextBtn: {
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
    },
    imagePicker: {
        marginTop: 20,
        paddingVertical: 30,
        width: 100,
        height: 100,
        borderRadius: 75
    },
    defaultImagePicker: {
        marginTop: 20,
        paddingVertical: 30,
        width: 100,
        height: 100
    }
});

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    createUser: (accessToken, user) => dispatch(createUser(accessToken, user))
        .then(() => dispatch(NavigationActions.navigate({ routeName: 'AddPreferences' })))
});


export default connect(mapStateToProps, mapDispatchToProps)(AddPersonnalInfoScreen);
