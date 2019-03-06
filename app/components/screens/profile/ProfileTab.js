import React, { Component } from 'react'
import { Container, Tab, Tabs } from 'native-base'
import { StyleSheet, Button as ReactButton } from 'react-native'
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import MyProfileScreen from './MyProfileScreen'
import VehiculeScreen from '../vehicules/VehiculeScreen'
import { withStatusBar } from '../../hoc';
import { ScreenNames } from '../'

class ProfileTab extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <ReactButton
                    title='X'
                    onPress={navigation.getParam('back')}
                    color='#fff'
                />
            )
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({ back: this.props.goMapScreen })
    }

    render() {
        return (
            <Container>
                <Tabs tabBarUnderlineStyle={{ backgroundColor: '#fff', height: 2 }}>
                    <Tab heading="MY PROFILE"
                        tabStyle={{ backgroundColor: '#2bb267' }}
                        textStyle={{ color: '#fff' }}
                        activeTabStyle={{ backgroundColor: '#2bb267' }}
                        activeTextStyle={{ color: '#fff' }}>
                        <MyProfileScreen {...this.props} />
                    </Tab>
                    <Tab heading="MY CARS"
                        tabStyle={{ backgroundColor: '#2bb267' }}
                        textStyle={{ color: '#fff' }}
                        activeTabStyle={{ backgroundColor: '#2bb267' }}
                        activeTextStyle={{ color: '#fff' }}>
                        <VehiculeScreen {...this.props} />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    goMapScreen: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Trips.HOME }))
});

export default withStatusBar(connect(mapStateToProps, mapDispatchToProps)(ProfileTab));