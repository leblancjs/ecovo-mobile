import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, Left, Right, Body, Title, Text, Button, Thumbnail, H1 } from 'native-base'
import PhotoUpload from 'react-native-photo-upload'
import { NavigationActions, StackActions } from 'react-navigation'
import { connect } from 'react-redux'
import { astuvu } from '../../components/hoc'
import { createUser, updateUser } from '../../actions/user'
import { logout } from '../../actions/auth'
import { ScreenNames } from '../'
import PersonalInfoForm from '../../components/profile/PersonalInfoForm'

class AddPersonalInfoScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            photo: this.props.auth.user.photo || '',
            firstName: this.props.auth.user.firstName || '',
            lastName: this.props.auth.user.lastName || '',
            dateOfBirth: this.props.auth.user.dateOfBirth,
            gender: this.props.auth.user.gender || 'Male',
            phoneNumber: this.props.auth.user.phoneNumber || '',
            error: null,
        }
    }

    _setPhoto = (photo) => {
        this.setState({
            ...this.state,
            photo: photo
        })
    }

    _onFieldChange = (field, value, error) => {
        this.setState({
            ...this.state,
            [field]: value,
            error
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
        let buttonVisible = 
            this.state.firstName != '' &&
            this.state.lastName != '' &&
            this.state.dateOfBirth &&
            this.state.gender != '' &&
            !this.state.error

        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Title>Sign Up</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this._logout}>
                            <Text>Logout</Text>
                        </Button>
                    </Right>
                </Header>
                <Content
                    scrollEnabled={false}
                    contentContainerStyle={styles.container}
                >
                    <H1>Personal Info</H1>
                    <View style={styles.photoContainer}>
                        <PhotoUpload
                            onPhotoSelect={photo => {
                                if (photo) {
                                    this._setPhoto(photo)
                                }
                            }}
                        >
                            {this.state.photo === '' ?
                                <Thumbnail large
                                    style={styles.imagePicker}
                                    source={require('../../../assets/profile_pic.png')}
                                /> :
                                <Thumbnail large
                                    style={styles.imagePicker}
                                    source={{ uri: this.state.photo }}
                                />
                            }
                        </PhotoUpload>
                    </View>
                    <View style={styles.form}>
                        <PersonalInfoForm
                            user={this.props.auth.user}
                            onFieldChange={this._onFieldChange}
                        />
                    </View>
                    {
                        buttonVisible &&
                        <Button block
                            disabled={this.props.auth.isSumitting}
                            onPress={this._createUser}
                        >
                            <Text>Next</Text>
                        </Button>
                    }
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16
    },
    form: {
        flex: 1
    },
    photoContainer: {
        height: 80,
        margin: 16
    },
    imagePicker: {
        marginTop: 20,
        paddingVertical: 30
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


export default astuvu(connect(mapStateToProps, mapDispatchToProps)(AddPersonalInfoScreen))
