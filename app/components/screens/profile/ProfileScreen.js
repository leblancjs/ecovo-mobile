import React, { Component } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, RefreshControl, ReactButton } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { getProfileById } from '../../../actions/auth';
import { getCurrentUserInfo } from '../../../actions/user';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Text, Fab, Card, CardItem, Body, Icon, Content } from 'native-base';
import PreferencesForm from '../../profile/PreferencesForm';
import { NavigationOptions } from '../../astuvu-native/NavigationHeader';

class ProfileScreen extends Component {
    static navigationOptions = {
            ...NavigationOptions

    }
    
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            loadedOnce: false,
        };
    }

    componentWillMount() {
        this._getCurrentUserInfo();
    }

    componentDidMount() {
        this.props.navigation.setParams({ goToMap: this._goToMap });
    }

    _getCurrentUserInfo = () => {
        this.props.getCurrentUserInfo(this.props.auth.credentials.accessToken);
    }

    _getProfileById = () => {
        this.props.getProfileById(this.props.auth.credentials.accessToken, this.props.auth.userInfo.sub);
    }

    _goToUpdateProfileScreen = () => {
        this.props.goToUpdateProfileScreen();
    }


    _goToMap = () => {
        this.props.goToMap();
    }


    _calculateAge = (birthday) => {
        if (birthday != "") {
            birthday = new Date(birthday);
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

    }

    render() {
        if (!this.props.auth.isFetching || this.state.loadedOnce) {
            this.state.loadedOnce = true;
            return this.renderLoaded();
        }
        if (!this.state.loadedOnce) { // To skip if it is a pull to refresh
            return this.loading();
        }
        return this.loading();
    }
    loading() {
        return (<View>
            <ActivityIndicator size="large" color="#2BB267" />
            <Text>Fetching informations</Text>
        </View>);
    }
    renderLoaded() {
        return (
            <Container>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._getCurrentUserInfo}
                        />
                    }
                >
                    <View style={styles.row}>
                        <Image style={styles.logo} source={{ uri: this.props.auth.user.photo }} />
                    </View>
                    <View style={styles.nameHolder}>
                        <Text style={styles.name}>
                            {this.props.auth.user.firstName} {this.props.auth.user.lastName}
                        </Text>
                    </View>
                    <View style={styles.ratingHolder}>
                    </View>
                    <Card>
                        <CardItem header>
                            <Text>Basic Informations</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>
                                    Age : {this._calculateAge(this.props.auth.user.dateOfBirth)} years old
                                </Text>
                                <Text>
                                    Gender : {this.props.auth.user.gender}
                                </Text>
                                <Text>
                                    Phone : {this.props.auth.user.phoneNumber}
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>More about {this.props.auth.user.firstName}</Text>
                        </CardItem>
                        <CardItem>
                            <Body style={styles.sliderContainer}>
                                <Text>Some elements to take under consideration before riding with {this.props.auth.user.firstName}.</Text>
                                <Content style={styles.slider}>
                                    <PreferencesForm disabled={true} preferences={this.props.auth.user.preferences}></PreferencesForm>
                                </Content>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>Description</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>
                                    {this.props.auth.user.description == "" ? "No description" : this.props.auth.user.description}
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                </ScrollView>
                <Fab direction="right" position="bottomRight"
                    style={{ backgroundColor: '#2BB267' }}
                    onPress={this._goToUpdateProfileScreen}>
                    <Icon type="MaterialIcons" name="edit" />
                </Fab>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        margin: 40,
        marginTop: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#eee"

    },

    row: {
        borderWidth: 0,
        backgroundColor: '#2BB267',
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
    },

    name: {
        fontSize: 24,
    },

    nameHolder: {
        marginTop: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },

    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    slider: {
        flex: 1,
        width: 350,
    },

    icon: {
        fontSize: 25,
        color: '#000000'
    },
});
const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    getCurrentUserInfo: (accessToken) => dispatch(getCurrentUserInfo(accessToken)),
    getProfileById: (accessToken, userId) => dispatch(getProfileById(accessToken, userId)),
    goToUpdateProfileScreen: () => dispatch(NavigationActions.navigate({ routeName: 'updateProfile' })),
    goToMap: () => dispatch(NavigationActions.navigate({ routeName: 'trips' })),

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
