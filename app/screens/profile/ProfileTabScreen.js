import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Header, Content, Tabs, Tab, Left, Body, Right, Button, Title, Icon, Text } from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'
import { logout } from '../../actions/auth'
import MyProfileScreen from './MyProfileScreen'
import VehiculeScreen from '../vehicules/VehiculeScreen'
import { astuvu } from '../../components/hoc'
import { ScreenNames } from '../'

class ProfileTabScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                ...this.props.user
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

    _goToUpdateProfileScreen = () => {
        this.props.goToUpdateProfileScreen()
    }

    render() {
        return (
            <Container>
                <Header noShadow>
                    <Left>
                        <Button transparent onPress={this.props.goMapScreen}>
                            <Icon name="close"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this._logout}>
                            <Text>Logout</Text>
                        </Button>
                    </Right>
                </Header>
                <Content
                    contentContainerStyle={styles.container}
                    scrollEnabled={false}
                >
                    <Tabs tabBarUnderlineStyle={{ backgroundColor: '#fff', height: 2 }}>
                        <Tab heading="PERSONAL INFO"
                            tabStyle={{ backgroundColor: '#2bb267' }}
                            textStyle={{ color: '#fff' }}
                            activeTabStyle={{ backgroundColor: '#2bb267' }}
                            activeTextStyle={{ color: '#fff' }}>
                            <MyProfileScreen user={this.props.user} onFabTapped={this._goToUpdateProfileScreen}/>
                        </Tab>
                        <Tab heading="CARS"
                            tabStyle={{ backgroundColor: '#2bb267' }}
                            textStyle={{ color: '#fff' }}
                            activeTabStyle={{ backgroundColor: '#2bb267' }}
                            activeTextStyle={{ color: '#fff' }}>
                            <VehiculeScreen/>
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    goToWelcome: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.SignIn.HOME })),
    goMapScreen: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Trips.HOME })),
    goToUpdateProfileScreen: () => dispatch(StackActions.push({ routeName: ScreenNames.Profile.UPDATE }))
})

export default astuvu(connect(mapStateToProps, mapDispatchToProps)(ProfileTabScreen))