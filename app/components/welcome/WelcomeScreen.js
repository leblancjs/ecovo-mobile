import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
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
                <Image
                    style={styles.img_logo}
                    source={require("../../img/Logo.png")}
                />
                <Text style={styles.welcome}>Welcome to Ecovo</Text>
                <Button
                    onPress={this.props.login}
                    title='Ready to carpooling! >'
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
    img_logo: {
        width: 256,
        height: 295
    }
});

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    login: () => dispatch(login())
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
