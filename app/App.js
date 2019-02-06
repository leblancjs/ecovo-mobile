/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert} from 'react-native';
import AuthService from './auth/AuthService';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { accessToken: null };
    this.authService = new AuthService();
  }

  _onLogin = () => {
    this.authService.login()
      .then(credentials => {
        console.log(credentials)

        // Successfully authenticated
        Alert.alert(
          'Success',
          'AccessToken: ' + credentials.accessToken,
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        );

        // Store the accessToken
        this.setState({ accessToken: credentials.accessToken });
      })
      .catch(error => console.log(error));
  }

  _onLogout = () => {
    if (Platform.OS === 'android') {
      this.setState({ accessToken: null });
    } else {
      this.authService.logout()
        .then(success => {
          this.setState({ accessToken: null });
        })
        .catch(error => console.log(error));
    }
  }
  
  render() {
    let loggedIn = this.state.accessToken === null ? false : true;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>

        <Text style={styles.header}>Auth0Sample - Login</Text>
        <Text>
          You are {loggedIn ? '' : 'not '}logged in.
        </Text>
        <Button
          onPress={loggedIn ? this._onLogout : this._onLogin}
          title={loggedIn ? 'Log Out' : 'Log In'}
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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});
