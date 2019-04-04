import React, { Component, Dispatch } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Container, Header, Footer, Content, Left, Right, Body, Title, Button, Icon } from 'native-base'
import { TextField, FooterButton, PhotoPickerField, PersonalInfoForm, PreferencesForm } from '../../components'
import { StackActions } from 'react-navigation'
import { connect } from 'react-redux'
import { UserService } from '../../services'
import { UISelectors, UserSelectors, AuthSelector } from '../../selectors'
import { User, Credentials } from '../../entities'
import { AnyAction } from 'redux'
import { AppState } from '../../store'

export interface UpdateProfileScreenScreenProps {
    user: User
    auth: Credentials
    fetching: boolean
    goToProfile: () => void
}

interface UpdateProfileScreenState {
    user: User
    error: string | null
}
class UpdateProfileScreen extends Component<UpdateProfileScreenScreenProps, UpdateProfileScreenState> {
    constructor(props: UpdateProfileScreenScreenProps) {
        super(props)

        this.state = {
            user: {
                ...props.user,
                preferences: { ...props.user.preferences }
            },
            error: null,
        }
    }

    _setPhoto = (photo: string) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                photo,
            }
        })
    }

    _updateUser = () => {
        if (this.props.user.id) { 
            UserService.update({
                ...this.state.user,
                id: this.props.user.id,
            })
                .then(() => this.props.goToProfile())
                .catch(error => {
                    console.log(`Failed to update profile.`, error)
                })
        }

    }

    _onPersonalInfoFieldChange = (field: string, value: string, error: string | null): void => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [field]: value
            },
            error
        })
    }

    _onPreferencesFieldChange = (field: string, value: string, error: string | null): void => {
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
                </Content>
                <Footer>
                    <Body>
                        <FooterButton
                            loading={this.props.fetching}
                            text="Update"
                            formError={this.state.error != null}
                            onPress={this._updateUser}
                        />
                    </Body>
                </Footer>
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

const mapStateToProps = (state: AppState) => ({
    user: UserSelectors.getUserConnected(state),
    accessToken: AuthSelector.getAccessToken(state),
    fetching: UISelectors.isFetching(state)
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    goToProfile: () => dispatch(StackActions.pop({immediate: true, n: 1})),
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileScreen)
