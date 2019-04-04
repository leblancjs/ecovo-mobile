import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dispatch, AnyAction } from 'redux'
import { NavigationActions, StackActions } from 'react-navigation'
import { StyleSheet, ScrollView } from 'react-native'
import { Container, Header, Content, Footer, Left, Right, Body, Title, Text, Button, H1, Icon } from 'native-base'
import { PreferencesForm, FooterButton } from '../../components'
import { AuthService, UserService } from '../../services'
import { UISelectors, UserSelectors } from '../../selectors'
import { ScreenNames } from '../'
import { AppState } from '../../store'
import { User, Preferences, Preference } from '../../entities'

export interface Props {
    user: User
    fetching: boolean
    back: () => void
    goToWelcome: () => void
    goToTrips: () => void
}

interface State {
    preferences: Preferences
}

class AddPreferencesScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            preferences: props.user.preferences ?
                {
                    ...props.user.preferences
                }:
                {
                    smoking: Preference.Never,
                    music: Preference.Never,
                    conversation: Preference.Never,
                },
        }
    }

    private onPreferencesChange = (field: string, value: number) => {
        this.setState({
            ...this.state,
            preferences: {
                ...this.state.preferences,
                [field]: value,
            },
        })
    }

    private updateUser = () => {
        UserService.update(
            {
                id: this.props.user.id || '',
                preferences: {
                    ...this.state.preferences
                },
                signUpPhase: 'done'
            }
        )
            .then(() => this.props.goToTrips())
            .catch(error => {
                console.log(`Failed to update preferences.`, error)
            })
    }

    private back = () => {
        this.props.back()
    }

    private logout = () => {
        AuthService.logout()
            .then(() => this.props.goToWelcome())
            .catch(error => {
                console.log(`Failed to logout.`, error)
            })
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.back}>
                            <Icon name="arrow-back"></Icon>
                            <Text>Back</Text>
                        </Button>
                    </Left>
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
                    <H1>Preferences</H1>
                    <ScrollView style={styles.form}>
                        <PreferencesForm
                            preferences={this.props.user.preferences}
                            onFieldChange={this.onPreferencesChange}
                        />
                    </ScrollView>
                </Content>
                <Footer>
                    <Body>
                        <FooterButton
                            text='Finish'
                            disabled={this.props.fetching}
                            loading={this.props.fetching}
                            onPress={this.updateUser}
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
        marginTop: 16,
    },
})

const mapStateToProps = (state: AppState) => ({
    user: UserSelectors.getUserConnected(state),
    isFetching: UISelectors.isFetching(state),
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    back: () => dispatch(StackActions.pop({})),
    goToWelcome: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.SignIn.HOME })),
    goToTrips: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Trips.MAP })),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPreferencesScreen)
