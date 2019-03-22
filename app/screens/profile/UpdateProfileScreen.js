import React, { Component } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Container, Header, Content, Left, Right, Body, Title, Text, Button, Icon, Thumbnail } from 'native-base'
import { TextField } from '../../astuvu-native/form'
import { NavigationActions, StackActions } from 'react-navigation'
import { connect } from 'react-redux'
import { astuvu } from '../../components/hoc'
import { updateUser } from '../../actions/user'
import PhotoUpload from 'react-native-photo-upload'
import PersonalInfoForm from '../../components/profile/PersonalInfoForm'
import PreferencesForm from '../../components/profile/PreferencesForm'
import { ScreenNames } from '../'

class UpdateProfileScreen extends Component {
    constructor(props) {
        super(props)

        this.state = { user: { ...props.auth.user } }
    }

    _setPhoto = (photo) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                photo,
            }
        })
    }

    _updateUser = () => {
        this.props.updateUser(this.props.auth.credentials.accessToken, this.state.user)
            .then(() => this.props.goToProfile(this.state.user))
            .catch(error => {
                console.log(error)
                this.props.goToError()
            })
    }

    _onPersonalInfoFieldChange = (field, value, error) => {
        console.log(field, value, error)
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [field]: value
            },
            error
        })
    }

    _onPreferencesFieldChange = (field, value, error = null) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                preferences: {
                    ...this.state.user.preferences,
                    [field]: value
                }
            },
            error
        })
    }

    render() {
        let disableButton =
            this.state.user.firstName == '' ||
            this.state.user.lastName == '' ||
            this.state.user.dateOfBirth == undefined ||
            this.state.user.gender == '' ||
            this.state.error

        return (
            <Container>
                <Header noShadow>
                    <Left>
                        <Button transparent onPress={this.props.goToProfile}>
                            <Icon name="close"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Edit Profile</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content
                    scrollEnabled={false}
                    contentContainerStyle={styles.container}
                >
                    <ScrollView style={styles.formContainer}>
                        <View style={styles.photoContainer}>
                            <PhotoUpload
                                onPhotoSelect={photo => {
                                    if (photo) {
                                        this._setPhoto(photo)
                                    }
                                }}
                            >
                                {this.state.user.photo === '' ?
                                    <Thumbnail large
                                        style={styles.imagePicker}
                                        source={require('../../../assets/profile_pic.png')}
                                    /> :
                                    <Thumbnail large
                                        style={styles.imagePicker}
                                        source={{ uri: this.state.user.photo }}
                                    />
                                }
                            </PhotoUpload>
                        </View>
                        <PersonalInfoForm
                            style={styles.form}
                            user={this.state.user}
                            onFieldChange={this._onPersonalInfoFieldChange}
                        />
                        <PreferencesForm
                            style={styles.form}
                            preferences={this.state.user.preferences}
                            onFieldChange={this._onPreferencesFieldChange}
                        />
                        <TextField
                            style={styles.form}
                            label="Biography"
                            rows={10}
                            initialValue={this.state.user.description}
                            onValueChange={(v, err) => this._onPersonalInfoFieldChange('description', v, err)}
                        />
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <Button block
                            disabled={disableButton || this.props.auth.isSubmitting}
                            onPress={this._updateUser}
                        >
                            <Text>Update</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        flex: 1,
    },
    form: {
        padding: 16,
    },
    photoContainer: {
        height: 80,
        margin: 16,
    },
    imagePicker: {
        marginTop: 20,
        paddingVertical: 30,
    },
    buttonContainer: {
        padding: 16,
    },
})

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    updateUser: (accessToken, user) => dispatch(updateUser(accessToken, user)),
    goToProfile: () => dispatch(StackActions.pop()),
    goToError: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Errors.HOME }))
})

export default astuvu(connect(mapStateToProps, mapDispatchToProps)(UpdateProfileScreen))
