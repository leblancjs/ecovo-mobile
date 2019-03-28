import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Container, Header, Content, Left, Right, Body, Title, Button, Icon } from 'native-base'
import { TextField, FooterButton, PhotoPickerField } from '../../components/astuvu-native/form'
import { NavigationActions, StackActions } from 'react-navigation'
import { connect } from 'react-redux'
import { astuvu } from '../../components/hoc'
import PersonalInfoForm from '../../components/profile/PersonalInfoForm'
import PreferencesForm from '../../components/profile/PreferencesForm'
import { UserService } from '../../service'
import { isFetching, UsersSelector, AuthSelector } from '../../selectors'
import { ScreenNames } from '../'

class UpdateProfileScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                ...props.user,
                preferences: { ...props.user.preferences }
            }
        }
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
        UserService.update(this.props.accessToken, this.state.user)
            .then(() => this.props.goToProfile())
            .catch(error => {
                console.log(error)
                this.props.goToError()
            })
    }

    _onPersonalInfoFieldChange = (field, value, error) => {
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
        return (
            <Container>
                <Header noShadow>
                    <Left>
                        <Button transparent onPress={this.props.goToProfile}>
                            <Icon name="close" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Edit Profile</Title>
                    </Body>
                    <Right />
                </Header>
                <Content
                    scrollEnabled={false}
                    contentContainerStyle={styles.container}
                >
                    <ScrollView style={styles.formContainer}>
                        <PhotoPickerField
                            style={{ container: styles.photoContainer }}
                            initialPhoto={this.state.user.photo}
                            viewerEnabled={true}
                            viewerTitle='Profile Photo'
                            onPhotoChange={this._setPhoto}
                        />
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
                    <FooterButton
                        loading={this.props.isFetching}
                        text="Update"
                        formError={this.state.error != null}
                        onPress={this._updateUser}
                    />
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
        height: 120,
        margin: 16,
    },
    imagePicker: {
        marginTop: 20,
        paddingVertical: 30,
    }
})

const mapStateToProps = state => ({
    user: UsersSelector.getUserConnected(state),
    accessToken: AuthSelector.getAccessToken(state),
    isFetching: isFetching(state)
})

const mapDispatchToProps = dispatch => ({
    goToProfile: () => dispatch(StackActions.pop()),
    goToError: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Errors.HOME }))
})

export default astuvu(connect(mapStateToProps, mapDispatchToProps)(UpdateProfileScreen))
