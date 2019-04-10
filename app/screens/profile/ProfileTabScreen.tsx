import React, { Component, Dispatch } from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { Container, Header, Content, Tabs, Tab, Left, Body, Right, Button, Title, Icon, Text } from 'native-base'
import { AuthService } from '../../services'
import MyProfileScreen from './MyProfileScreen'
import VehicleScreen from '../vehicles/VehicleScreen'
import { UserSelectors } from '../../selectors'
import { ScreenNames } from '..'
import { User } from '../../entities'
import { AnyAction } from 'redux'
import { AppState } from '../../store'
import { UISelectors } from '../../selectors'

export interface ProfileTabScreenProps {
    user: User
    fetching: boolean
    goToWelcome: () => void
    goToMapScreen: () => void
    goToUpdateProfileScreen: () => void
}

class ProfileTabScreen extends Component<ProfileTabScreenProps> {
    constructor(props: ProfileTabScreenProps) {
        super(props)
    }

    _logout = () => {
        this.props.goToWelcome() //hacky, but hey it works ¯\_(ツ)_/¯
        AuthService.logout()
            .then(() => this.props.goToWelcome())
            .catch(error => {
                console.log(`Failed to logout.`, error)
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
                        <Button transparent onPress={this.props.goToMapScreen}>
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
                            <MyProfileScreen user={this.props.user} onFabTapped={this._goToUpdateProfileScreen} />
                        </Tab>
                        <Tab heading="CARS"
                            tabStyle={{ backgroundColor: '#2bb267' }}
                            textStyle={{ color: '#fff' }}
                            activeTabStyle={{ backgroundColor: '#2bb267' }}
                            activeTextStyle={{ color: '#fff' }}>
                            <VehicleScreen/>
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

const mapStateToProps  = (state: AppState) => ({
    user: UserSelectors.getUserConnected(state),
    fetching: UISelectors.isFetching(state),
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    goToWelcome: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.BOOTSTRAP })),
    goToMapScreen: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Trips.HOME })),
    goToUpdateProfileScreen: () => dispatch(StackActions.push({ routeName: ScreenNames.Profile.UPDATE }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTabScreen)