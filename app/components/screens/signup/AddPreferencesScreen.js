import React, { Component } from 'react'
import { StyleSheet, Text, Button as ReactButton } from 'react-native'
import { Container, Content, View, Button, Icon } from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { withStatusBar } from '../../hoc'
import { updateUser } from '../../../actions/user'
import { logout } from '../../../actions/auth'
import { ScreenNames } from '../'
import PreferencesForm from '../../profile/PreferencesForm'

class AddPreferencesScreen extends Component {
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
            music: 0,
            conversation: 0,
            smoking: 0
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ logout: this._logout })
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
            <Container style={styles.container}>
                <Text style={styles.title}>Preferences</Text>
                <Content>
                    <PreferencesForm preferences={this.props.auth.user.preferences} onFieldChange={this._onPreferencesChange} />
                </Content>
                <View style={styles.nextBtn}>
                    <Button transparent style={styles.nextBtn} onPress={this._updateUser}>
                        <Text style={styles.textGreen}>Finish</Text>
                        <Icon style={styles.textGreen} name="ios-arrow-forward" />
                    </Button>
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
        margin: 20
    },
    nextBtn: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        marginBottom: 2
    },
    textGreen: {
        fontSize: 20,
        color: '#2BB267'
    },
    text: {
        justifyContent: 'center',
        fontSize: 15
    }
})

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    updateUser: (accessToken, user) => dispatch(updateUser(accessToken, user)),
    logout: () => dispatch(logout()),
    goToWelcome: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.SignIn.HOME })),
    goToTrips: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Trips.MAP })),
    goToError: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Errors.HOME }))
})

export default withStatusBar(connect(mapStateToProps, mapDispatchToProps)(AddPreferencesScreen))
