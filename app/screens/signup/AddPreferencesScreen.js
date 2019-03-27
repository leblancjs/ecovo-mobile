import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, Left, Right, Body, Title, Text, Button, H1, Icon } from 'native-base'
import { astuvu } from '../../components/hoc'
import PreferencesForm from '../../components/profile/PreferencesForm'
import { AuthService, UserService } from '../../service'
import { isFetching, UsersSelector, AuthSelector } from '../../selectors'
import { ScreenNames } from '../'

class AddPreferencesScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            music: 0,
            conversation: 0,
            smoking: 0
        }
    }

    _onPreferencesChange = (field, value) => {
        this.setState({
            ...this.state,
            [field]: value
        })
    }

    _updateUser = () => {
        this.props.updateUser(
            this.props.accessToken,
            {
                id: this.props.user.id,
                preferences: {
                    ...this.state
                },
                signUpPhase: 'done'
            }
        )
            .then(() => this.props.goToTrips())
            .catch(error => {
                console.log(error)
                this.props.goToError()
            })
    }

    _back = () => {
        this.props.back()
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
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this._back}>
                            <Icon name="arrow-back"></Icon>
                            <Text>Back</Text>
                        </Button>
                    </Left>
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
                    <H1>Preferences</H1>
                    <View style={styles.form}>
                        <PreferencesForm
                            preferences={this.props.user.preferences}
                            onFieldChange={this._onPreferencesChange}
                        />
                    </View>
                    <Button block
                        disabled={this.props.isFetching}
                        onPress={this._updateUser}
                    >
                        <Text>Finish</Text>
                    </Button>
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
        flex: 1,
        marginTop: 16
    }
})

const mapStateToProps = state => ({
    user: UsersSelector.getUserConnected(state),
    accessToken: AuthSelector.getAccessToken(state),
    isFetching: isFetching(state)
})

const mapDispatchToProps = dispatch => ({
    updateUser: (accessToken, user) => dispatch(UserService.update(accessToken, user)),
    back: () => dispatch(StackActions.pop()),
    logout: () => dispatch(AuthService.logout()),
    goToWelcome: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.SignIn.HOME })),
    goToTrips: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Trips.MAP })),
    goToError: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Errors.HOME }))
})

export default astuvu(connect(mapStateToProps, mapDispatchToProps)(AddPreferencesScreen))
