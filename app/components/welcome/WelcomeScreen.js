import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { login } from '../../actions/auth';

class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to Ecovo</Text>
                <Button
                    onPress={this.props.login}
                    title='Get Started'
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    }
});

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    login: () => dispatch(login())
        .then(() => dispatch(NavigationActions.navigate({ routeName: 'Profile' })))
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
