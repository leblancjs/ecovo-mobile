import React, { Component } from 'react';
import { StyleSheet, Text, Slider } from 'react-native';
import { Container, Content, View, Button, Icon, Right, Left } from 'native-base';
import { connect } from 'react-redux';
import { updateMusic, updateSmoking, updateConversation } from '../../actions/ui/signup';
import { updateUser } from '../../actions/user';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class AddPreferences extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
    }

    _updateConversation = (conversation) => {
        this.props.updateConversation(conversation);
    }

    _updateMusic = (music) => {
        this.props.updateMusic(music);
    }

    _updateSmoking = (smoking) => {
        this.props.updateSmoking(smoking);
    }

    _updateUser = () => {
        this.props.updateUser(this.props.auth.credentials.accessToken, this.props.auth.user.id, this.props.user);
    }

    render() {
        return (
            <Container style={styles.container}>
                <Text style={styles.title}>Preferences</Text>
                <Content>
                    <View style={styles.sliderContainer}>
                        <View style={styles.sliderHeader}>
                            <Text style={styles.text}>I like to listen to music in the car</Text>
                        </View>
                        <View style={styles.sliderHeader}>
                            <FontAwesome5 style={styles.icon} name="music-off" solid/>
                            <Slider
                                style={styles.slider}
                                onValueChange = {(music) => this._updateMusic(music)}
                                step = { 1 }
                                minimumValue = { 0 }
                                maximumValue = { 2 } />
                            <MaterialIcons style={styles.icon} name="music-note" solid/>
                        </View>
                        <View style={styles.sliderLegend}>
                            <Left><Text style={styles.text}>0</Text></Left>
                            <Text style={styles.text}>1</Text>
                            <Right><Text style={styles.text}>2</Text></Right>
                        </View>
                    </View>

                    <View style={styles.sliderContainer}>
                        <View style={styles.sliderHeader}>
                            <Text style={styles.text}>I like to smoke in the car</Text>
                        </View>
                        <View style={styles.sliderHeader}>
                            <MaterialIcons style={styles.icon} name="smoke-free" solid/>
                            <Slider
                                style={styles.slider}
                                onValueChange = {(smoking) => this._updateSmoking(smoking)}
                                step = { 1 }
                                minimumValue = { 0 }
                                maximumValue = { 2 } />
                            <MaterialIcons style={styles.icon} name="smoking-rooms" solid/>
                        </View>
                        <View style={styles.sliderLegend}>
                            <Left><Text style={styles.text}>0</Text></Left>
                            <Text style={styles.text}>1</Text>
                            <Right><Text style={styles.text}>2</Text></Right>
                        </View>
                    </View>

                    <View style={styles.sliderContainer}>
                        <View style={styles.sliderHeader}>
                            <Text style={styles.text}>I like to talk in the car</Text>
                        </View>
                        <View style={styles.sliderHeader}>
                            <FontAwesome5 style={styles.icon} name="microphone-slash" solid/>
                            <Slider
                                style={styles.slider}
                                onValueChange = {(conversation) => this._updateMusic(conversation)}
                                step = { 1 }
                                minimumValue = { 0 }
                                maximumValue = { 2 } />
                            <FontAwesome5 style={styles.icon} name="microphone" solid/>
                        </View>
                        <View style={styles.sliderLegend}>
                            <Left><Text style={styles.text}>0</Text></Left>
                            <Text style={styles.text}>1</Text>
                            <Right><Text style={styles.text}>2</Text></Right>
                        </View>
                    </View>
                </Content>
                <View style={styles.nextBtn}>
                    <Button transparent style={styles.nextBtn} onPress={this._updateUser}>
                        <Text style={styles.textGreen}>Finish</Text>
                        <Icon style={styles.textGreen} name="ios-arrow-forward"/>
                    </Button>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      margin: 15
    },
    title: {
      fontSize: 30,
      textAlign: 'left',
      margin: 20
    },
    sliderContainer: {
        alignContent: 'center',
        marginTop: 40
    },
    sliderHeader: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    slider: {
        flexDirection: 'row',
        width: 300
    }, 
    nextBtn: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        marginBottom: 2
    },
    textGreen: {
        fontSize: 20,
        color: '#2BB267'
    },
    text: {
        justifyContent: 'center',
        fontSize: 15
    },
    sliderLegend: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 70,
        marginRight: 70
    },
    icon: {
        fontSize: 25,
        color: '#000000'
    }
});

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.ui.signup.user
});

const mapDispatchToProps = dispatch => ({
    updateMusic: (music) => dispatch(updateMusic(music)),
    updateSmoking: (smoking) => dispatch(updateSmoking(smoking)),
    updateConversation: (conversation) => dispatch(updateConversation(conversation)),
    updateUser: (accessToken, userId, userData) => dispatch(updateUser(accessToken, userId, userData))
        .then(() => dispatch(NavigationActions.navigate({ routeName: '' }))),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPreferences);
