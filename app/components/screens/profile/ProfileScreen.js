import React, { Component } from 'react'
import { StyleSheet, View, Button, Image } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'
import { withStatusBar } from '../../hoc'
import { logout } from '../../../actions/auth'
import { ScreenNames } from '../';

class ProfileScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Button
                    title='Logout'
                    onPress={navigation.getParam('logout')}
                    color='#fff'
                />
            ),
            headerLeft: (
                <Button
                    title='Trip'
                    onPress={navigation.getParam('trip')}
                    color='#fff'
                />
            )
        }
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.navigation.setParams({ logout: this._logout })
        this.props.navigation.setParams({ trip: this.props.goToTrip })
    }

    _logout = () => {
        this.props.logout()
            .then(() => this.props.goToWelcome())
            .catch(err => this._error(err))
    }

    _error = (err) => {
        alert('Oh no! Something went wrong, looks like your stuck here (' + JSON.stringify(err) + ').')
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.harold}
                    source={{uri: 'https://media.tenor.com/images/e1ccf14ac4ed9d5e76601142ad183547/tenor.gif'}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    harold: {
        flex: 0.5,
        alignSelf: 'stretch'
    }
})

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    goToWelcome: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.SignIn.HOME })),
    goToTrip: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Trips.HOME }))
})

export default withStatusBar(connect(mapStateToProps, mapDispatchToProps)(ProfileScreen))
