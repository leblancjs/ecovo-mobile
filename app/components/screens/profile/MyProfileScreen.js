import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator,  Button as ReactButton } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import ProfileComponent from '../../profile/ProfileComponent';
import { withStatusBar } from '../../hoc';
import { ScreenNames } from '../'

class MyProfileScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <ReactButton
                    title='< Back'
                    onPress={navigation.getParam('back')}
                    color='#fff'
                />
            )
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            user: props.auth.user,
        };
    }
    
    _back = () => {
        this.props.goMapScreen();

    }

    componentWillMount() {
        this.props.navigation.setParams({ back: this._back })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.auth.user,
        }, () => {
            this.forceUpdate();
          });

    }

    _goToUpdateProfileScreen = () => {
        this.props.goToUpdateProfileScreen();
    }

    render() {
        return (
            <ProfileComponent user={this.state.user} onFabTapped={this._goToUpdateProfileScreen}></ProfileComponent>
        )
    }
}

const styles = StyleSheet.create({

});
const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    goToUpdateProfileScreen: () => dispatch(StackActions.push({ routeName: ScreenNames.Profile.UPDATE })),
    goMapScreen: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Trips.HOME })),

});

export default withStatusBar(connect(mapStateToProps, mapDispatchToProps)(MyProfileScreen));
