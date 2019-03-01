import React, { Component } from 'react'
import { StyleSheet, Text, Slider, Button as ReactButton } from 'react-native'
import { Container, Content, View, Button, Icon, Right, Left } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { withStatusBar } from '../../hoc'
import { updateUser } from '../../../actions/user'
import { logout } from '../../../actions/auth'
import { ScreenNames } from '../'

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
            user: {
                preferences: this.props.auth.user.preferences ?
                    this.props.auth.user.preferences :
                    {
                        music: 0,
                        conversation: 0,
                        smoking: 0
                    }
            }
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ logout: this._logout })
    }

    _setMusic = (music) => {
        this.setState(state => ({
            ...state,
            user: {
                ...state.user,
                preferences: {
                    ...state.user.preferences,
                    music
                }
            },
        }))
    }

    _setConversation = (conversation) => {
        this.setState(state => ({
            ...state,
            user: {
                ...state.user,
                preferences: {
                    ...state.user.preferences,
                    conversation
                }
            },
        }))
    }

    _setSmoking = (smoking) => {
        this.setState(state => ({
            ...state,
            user: {
                ...state.user,
                preferences: {
                    ...state.user.preferences,
                    smoking
                }
            },
        }))
    }

    _updateUser = () => {
        this.props.updateUser(
            this.props.auth.credentials.accessToken,
            {
                ...this.state.user,
                id: this.props.auth.user.id,
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
                    <View style={styles.sliderContainer}>
                        <View style={styles.sliderHeader}>
                            <Text style={styles.text}>I like to listen to music in the car</Text>
                        </View>
                        <View style={styles.sliderHeader}>
                            <MaterialCommunityIcons style={styles.icon} name="music-note-off" solid />
                            <Slider
                                value={this.state.user.preferences.music}
                                style={styles.slider}
                                onValueChange={(music) => this._setMusic(music)}
                                step={1}
                                minimumValue={0}
                                maximumValue={2} />
                            <MaterialIcons style={styles.icon} name="music-note" solid />
                        </View>
                        <View style={styles.sliderLegend}>
                            <Left><Text style={styles.text}>0</Text></Left>
                            <Text style={styles.text}>1</Text>
                            <Right><Text style={styles.text}>2</Text></Right>
                        </View>
                    </View>

                    <View style={styles.sliderContainer}>
                        <View style={styles.sliderHeader}>
                            <Text style={styles.text}>I like to smoke in the car</Text>
                        </View>
                        <View style={styles.sliderHeader}>
                            <MaterialIcons style={styles.icon} name="smoke-free" solid />
                            <Slider
                                value={this.state.user.preferences.smoking}
                                style={styles.slider}
                                onValueChange={(smoking) => this._setSmoking(smoking)}
                                step={1}
                                minimumValue={0}
                                maximumValue={2} />
                            <MaterialIcons style={styles.icon} name="smoking-rooms" solid />
                        </View>
                        <View style={styles.sliderLegend}>
                            <Left><Text style={styles.text}>0</Text></Left>
                            <Text style={styles.text}>1</Text>
                            <Right><Text style={styles.text}>2</Text></Right>
                        </View>
                    </View>

                    <View style={styles.sliderContainer}>
                        <View style={styles.sliderHeader}>
                            <Text style={styles.text}>I like to talk in the car</Text>
                        </View>
                        <View style={styles.sliderHeader}>
                            <MaterialCommunityIcons style={styles.icon} name="comment-remove-outline" solid />
                            <Slider
                                value={this.state.user.preferences.conversation}
                                style={styles.slider}
                                onValueChange={(conversation) => this._setConversation(conversation)}
                                step={1}
                                minimumValue={0}
                                maximumValue={2} />
                            <MaterialCommunityIcons style={styles.icon} name="comment-text-outline" solid />
                        </View>
                        <View style={styles.sliderLegend}>
                            <Left><Text style={styles.text}>0</Text></Left>
                            <Text style={styles.text}>1</Text>
                            <Right><Text style={styles.text}>2</Text></Right>
                        </View>
                    </View>
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
    sliderContainer: {
        alignContent: 'center',
        marginTop: 40
    },
    sliderHeader: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    slider: {
        flexDirection: 'row',
        width: 300
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
    },
    sliderLegend: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 70,
        marginRight: 70
    },
    icon: {
        fontSize: 25,
        color: '#000000'
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
