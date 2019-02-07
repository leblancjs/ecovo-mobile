import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { logout } from '../../actions/auth';

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Profile</Text>
                <Image
                    style={styles.harold}
                    source={{uri: 'https://i.kym-cdn.com/photos/images/original/000/839/182/45a.gif'}}
                />
                <Button
                    onPress={this.props.logout}
                    title='Logout'
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
    title: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    harold: {
        width: 256,
        height: 256
    }
});

const mapStateToProps = state => ({
    credentials: state.auth.credentials
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
        .then(() => dispatch(NavigationActions.navigate({ routeName: 'Welcome' })))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
