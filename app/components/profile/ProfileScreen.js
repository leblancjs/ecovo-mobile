import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { logout, getUserInfo, getProfileById } from '../../actions/auth';
import { ScrollView } from 'react-native-gesture-handler';

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
    }

    _getUserInfo = () => {
        this.props.getUserInfo(this.props.auth.credentials.accessToken);
    }

    _getProfileById = () => {
        this.props.getProfileById(this.props.auth.credentials.accessToken, this.props.auth.userInfo.sub);
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
                    onPress={this._getUserInfo}
                    title='Get User Info'
                />
                <Button
                    onPress={this._getProfileById}
                    title='Get Profile'
                />
                <Button
                    onPress={this.props.logout}
                    title='Logout'
                />
                <ScrollView>
                    <Text>
                        {`${JSON.stringify(this.props.auth.userInfo)}\n
                        ${JSON.stringify(this.props.auth.profile)}\n
                        ${JSON.stringify(this.props.auth.error)}`}
                    </Text>
                </ScrollView>
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
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    getUserInfo: (accessToken) => dispatch(getUserInfo(accessToken)),
    getProfileById: (accessToken, userId) => dispatch(getProfileById(accessToken, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
