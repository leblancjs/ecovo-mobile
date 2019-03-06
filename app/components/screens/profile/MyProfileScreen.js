import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { StackActions } from 'react-navigation';
import ProfileComponent from '../../profile/ProfileComponent';
import { ScreenNames } from '../'

class MyProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.auth.user,
        };
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
    goToUpdateProfileScreen: () => dispatch(StackActions.push({ routeName: ScreenNames.Profile.UPDATE }))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileScreen);
