import React, { Component } from 'react'
import { StyleSheet, Text, Image, View, Button as ReactButton } from 'react-native'
import { Icon, Container, Button, Content } from 'native-base'
import PhotoUpload from 'react-native-photo-upload'
import { NavigationActions, StackActions } from 'react-navigation'
import { connect } from 'react-redux'
import { withStatusBar } from '../../hoc'
import { createUser, updateUser } from '../../../actions/user'
import { logout } from '../../../actions/auth'
import { ScreenNames } from '../'
import PersonalInfoForm from '../../profile/PersonalInfoForm'

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
            photo: this.props.auth.user.photo || '',
            firstName: this.props.auth.user.firstName || '',
            lastName: this.props.auth.user.lastName || '',
            dateOfBirth: this.props.auth.user.dateOfBirth,
            gender: this.props.auth.user.gender || ''
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ logout: this._logout })
    }

    _setPhoto = (photo) => {
        this.setState({
            ...this.state,
            photo: photo
        })
    }

    _onFieldChange = (field, value) => {
        this.setState({
            ...this.state,
            [field]: value
        })
    }

    _createUser = () => {
        if (this.props.auth.user.id) {
            if (!this.props.auth.isSumitting) {
                this.props.updateUser(
                    this.props.auth.credentials.accessToken,
                    {
                        ...this.state,
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
                    this.state
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

        if (this.state.photo == '') {
            picStyle = styles.defaultImagePicker
        } else {
            picStyle = styles.imagePicker
        }

        let buttonVisible = 
            this.state.firstName != '' &&
            this.state.lastName != '' &&
            this.state.dateOfBirth &&
            this.state.gender != ''

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
                        {this.state.photo == '' &&
                            <Image
                                style={picStyle}
                                resizeMode='cover'
                                source={require('../../../../assets/profile_pic.png')}
                            />
                        }

                        {this.state.photo != '' &&
                            <Image
                                style={picStyle}
                                resizeMode='cover'
                                source={{ uri: this.state.photo }}
                            />
                        }
                    </PhotoUpload>
                    <PersonalInfoForm user={this.props.auth.user} onFieldChange={this._onFieldChange} />
                </Content>
                <View style={styles.nextBtn}>
                    {
                        buttonVisible &&
                        <Button transparent disabled={this.props.auth.isSumitting}
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
