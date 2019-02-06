import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Alert } from 'react-native';
import AuthService from './auth/AuthService';

class App extends Component {
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
        <Text style={styles.header}>Login</Text>
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
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

export default App;
