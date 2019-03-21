import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, Left, Right, Body, Title, Text, Button, H1, Icon } from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'
import { astuvu } from '../../hoc'
import { updateUser } from '../../../actions/user'
import { logout } from '../../../actions/auth'
import { ScreenNames } from '../'
import PreferencesForm from '../../profile/PreferencesForm'

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
            this.props.auth.credentials.accessToken,
            {
                id: this.props.auth.user.id,
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
                            preferences={this.props.auth.user.preferences}
                            onFieldChange={this._onPreferencesChange}
                        />
                    </View>
                    <Button block
                        disabled={this.props.auth.isSumitting}
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
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    updateUser: (accessToken, user) => dispatch(updateUser(accessToken, user)),
    back: () => dispatch(StackActions.pop()),
    logout: () => dispatch(logout()),
    goToWelcome: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.SignIn.HOME })),
    goToTrips: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Trips.MAP })),
    goToError: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Errors.HOME }))
})

export default astuvu(connect(mapStateToProps, mapDispatchToProps)(AddPreferencesScreen))
