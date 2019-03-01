import React, { Component } from 'react'
import { StyleSheet, Text, Image, View, Button as ReactButton } from 'react-native'
import { Input, Icon, Container, Form, Button, Item, Content, DatePicker, Picker, Right } from 'native-base'
import PhotoUpload from 'react-native-photo-upload'
import { NavigationActions, StackActions } from 'react-navigation'
import { connect } from 'react-redux'
import { withStatusBar } from '../../hoc'
import { createUser, updateUser } from '../../../actions/user'
import { logout } from '../../../actions/auth'
import { ScreenNames } from '../'

class AddPersonalInfoScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <ReactButton
                    title='Logout'
                    onPress={navigation.getParam('logout')}
                    color='#fff'
                />
            )
        }
    }
    
    constructor(props) {
        super(props)

        this.state = {
            user: {
                photo: this.props.auth.user.photo || '',
                firstName: this.props.auth.user.firstName || '',
                lastName: this.props.auth.user.lastName || '',
                dateOfBirth: this.props.auth.user.dateOfBirth || new Date(),
                gender: this.props.auth.user.gender || 'Male',
            }
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ logout: this._logout })
    }

    _setPhoto = (photo) => {
        this.setState(state => ({
            ...state,
            user: {
                ...state.user,
                photo,
            },
        }))
    }

    _setFirstName = (firstName) => {
        this.setState(state => ({
            ...state,
            user: {
                ...state.user,
                firstName,
            },
        }))
    }

    _setLastName = (lastName) => {
        this.setState(state => ({
            ...state,
            user: {
                ...state.user,
                lastName,
            },
        }))
    }

    _setDateOfBirth = (dateOfBirth) => {
        this.setState(state => ({
            ...state,
            user: {
                ...state.user,
                dateOfBirth,
            },
        }))
    }

    _setGender = (gender) => {
        this.setState(state => ({
            ...state,
            user: {
                ...state.user,
                gender,
            },
        }))
    }

    _createUser = () => {
        if (this.props.auth.user.id) {
            if (!this.props.auth.isSumitting) {
                this.props.updateUser(
                    this.props.auth.credentials.accessToken,
                    {
                        ...this.state.user,
                        id: this.props.auth.user.id
                    }
                )
                    .then(() => this.props.goToPreferences())
                    .catch(error => {
                        console.log(error)
                        this.props.goToError()
                    })
            }
        } else {
            if (!this.props.auth.isSumitting) {
                this.props.createUser(
                    this.props.auth.credentials.accessToken,
                    this.state.user
                )
                    .then(() => this.props.goToPreferences())
                    .catch(error => {
                        console.log(error)
                        this.props.goToError()
                    })
            }
        }
    }

    _logout = () => {
        this.props.logout()
            .then(() => this.props.goToWelcome())
            .catch(error => {
                console.log(error)
                this.props.goToError()
            })
    }

    render() {
        let picStyle

        if (this.state.user.photo == '') {
            picStyle = styles.defaultImagePicker
        } else {
            picStyle = styles.imagePicker
        }

        let buttonVisible = 
            this.state.user.firstName != '' &&
            this.state.user.lastName != '' &&
            this.state.user.dateOfBirth

        return (
            <Container style={styles.container}>
                <Text style={styles.title}>Personal Info</Text>
                <Content>
                    <PhotoUpload
                        onPhotoSelect={photo => {
                            if (photo) {
                                this._setPhoto(photo)
                            }
                        }}
                    >
                        {this.state.user.photo == '' &&
                            <Image
                                style={picStyle}
                                resizeMode='cover'
                                source={require('../../../../assets/profile_pic.png')}
                            />
                        }

                        {this.state.user.photo != '' &&
                            <Image
                                style={picStyle}
                                resizeMode='cover'
                                source={{ uri: this.state.user.photo }}
                            />
                        }
                    </PhotoUpload>
                    <Form>
                        <Item style={styles.item}>
                            <Input style={styles.text}
                                value={this.state.user.firstName}
                                onChangeText={(firstName) => this._setFirstName(firstName)}
                                placeholder="First Name" />
                        </Item>
                        <Item style={styles.item}>
                            <Input style={styles.text}
                                value={this.state.user.lastName}
                                onChangeText={(lastName) => this._setLastName(lastName)}
                                placeholder="Last Name" />
                        </Item>
                        <Item style={styles.item}>
                            <DatePicker
                                defaultDate={this.state.user.dateOfBirth}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Date of birth"
                                onDateChange={(dateOfBirth) => this._setDateOfBirth(dateOfBirth)}
                                disabled={false}
                                style={styles.text} />
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
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </Item>
                    </Form>
                </Content>
                <View style={styles.nextBtn}>
                    {
                        buttonVisible &&
                        <Button transparent
                            onPress={this._createUser}
                        >
                            <Text style={styles.textGreen}>Next</Text>
                            <Icon style={styles.textGreen} name="ios-arrow-forward" />
                        </Button>
                    }
                </View>
            </Container>
        )
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
})

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    createUser: (accessToken, user) => dispatch(createUser(accessToken, user)),
    updateUser: (accessToken, user) => dispatch(updateUser(accessToken, user)),
    logout: () => dispatch(logout()),
    goToWelcome: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.SignIn.HOME })),
    goToPreferences: () => dispatch(StackActions.push({ routeName: ScreenNames.SignUp.PREFERENCES })),
    goToError: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Errors.HOME }))
})


export default withStatusBar(connect(mapStateToProps, mapDispatchToProps)(AddPersonalInfoScreen))
