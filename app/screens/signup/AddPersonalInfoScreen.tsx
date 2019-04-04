import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'
import { StyleSheet, ScrollView } from 'react-native'
import { Container, Header, Content, Footer, Left, Right, Body, Title, Text, Button, H1 } from 'native-base'
import PersonalInfoForm from '../../components/profile/PersonalInfoForm'
import { AuthService, UserService } from '../../services'
import { UISelectors, UserSelectors } from '../../selectors'
import { ScreenNames } from '../'
import { PhotoPickerField, FooterButton } from '../../components'
import { User, Preference } from '../../entities'
import { AppState } from '../../store'
import { Dispatch, AnyAction } from 'redux'

export interface AddPersonalInfoScreenProps {
    user: User
    fetching: boolean
    goToWelcome: () => void
    goToPreferences: () => void
}

interface AddPersonalInfoScreenState {
    user: User
    error: string | null
}

class AddPersonalInfoScreen extends Component<AddPersonalInfoScreenProps, AddPersonalInfoScreenState> {
    constructor(props: AddPersonalInfoScreenProps) {
        super(props)

        this.state = {
            user: {
                ...props.user,
                gender: props.user.gender ? props.user.gender : 'Male',
                preferences: {
                    smoking: Preference.Never,
                    music: Preference.Never,
                    conversation: Preference.Never,
                },
            },
            error: null,
        }
    }

    private setPhoto = (photo: string): void => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                photo,
            }
        })
    }

    private onFieldChange = (field: string, value: string, error: string | null): void => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [field]: value,
            },
            error,
        })
    }

    private createUser = () => {
        if (this.props.user.id) {
            if (!this.props.fetching) {
                UserService.update({
                    ...this.state.user,
                    id: this.props.user.id,
                })
                    .then(() => this.props.goToPreferences())
                    .catch(error => {
                        console.log(`Failed to update user.`, error)
                    })
            }
        } else {
            if (!this.props.fetching) {
                UserService.create({
                    ...this.state.user,
                })
                    .then(() => this.props.goToPreferences())
                    .catch(error => {
                        console.log(`Failed to create user.`, error)
                    })
            }
        }
    }

    private logout = () => {
        AuthService.logout()
            .then(() => this.props.goToWelcome())
            .catch(error => {
                console.log(`Failed to logout.`, error)
            })
    }

    private validateForm = () => {
        let user = this.state.user

        return user.firstName && user.lastName && user.gender && user.dateOfBirth
    }

    render = () => {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Title>Sign Up</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.logout}>
                            <Text>Logout</Text>
                        </Button>
                    </Right>
                </Header>
                <Content
                    scrollEnabled={false}
                    contentContainerStyle={styles.container}
                >
                    <H1>Personal Info</H1>
                    <ScrollView style={styles.form}>
                        <PhotoPickerField
                            style={{ container: styles.photoContainer, thumbnail: styles.photoThumbnail }}
                            initialPhoto={this.state.user.photo}
                            viewerEnabled={true}
                            viewerTitle='Profile Photo'
                            onPhotoChange={this.setPhoto}
                        />
                        <PersonalInfoForm
                            user={this.props.user}
                            onFieldChange={this.onFieldChange}
                        />
                    </ScrollView>
                </Content>
                <Footer>
                    <Body>
                        <FooterButton
                            text='Next'
                            disabled={this.props.fetching || !this.validateForm()}
                            loading={this.props.fetching}
                            formError={!!this.state.error}
                            onPress={this.createUser}
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
        margin: 16,
    },
    form: {
        flex: 1,
        width: '100%',
    },
    photoContainer: {
        height: 80,
        margin: 16,
    },
    photoThumbnail: {
        borderWidth: 0,
    },
    imagePicker: {
        marginTop: 20,
        paddingVertical: 30,
    },
})

const mapStateToProps = (state: AppState) => ({
    user: UserSelectors.getUserConnected(state),
    fetching: UISelectors.isFetching(state),
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    goToWelcome: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.SignIn.HOME })),
    goToPreferences: () => dispatch(StackActions.push({ routeName: ScreenNames.SignUp.PREFERENCES })),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPersonalInfoScreen)
