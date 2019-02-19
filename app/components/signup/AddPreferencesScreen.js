import React, { Component } from 'react';
import { StyleSheet, Text, Slider } from 'react-native';
import { Container, Content, View, Button, Icon, Right, Left } from 'native-base';
import { connect } from 'react-redux';
import { updateMusic, updateSmoking, updateConversation } from '../../actions/ui/signup';
import { updateUser } from '../../actions/user';

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
        console.log("ACCESS TOKEN : " + this.props.auth.credentials.accessToken);
        this.props.updateUser(this.props.auth.credentials.accessToken, this.props.auth.user.id, this.props.user);
    }

    render() {
        return (
            <Container style={styles.container}>
                <Text style={styles.title}>Preferences</Text>
                <Content>
                    <View style={styles.sliderHeader}>
                        <Text style={styles.text}>I like to listen to music in the car</Text>
                    </View>
                    <View style={styles.sliderHeader}>
                        <Icon name="md-volume-off" />
                        <Slider
                            style={styles.slider}
                            onValueChange = {(music) => this._updateMusic(music)}
                            step = { 1 }
                            minimumValue = { 0 }
                            maximumValue = { 2 } />
                        <Icon name="md-volume-high" />
                    </View>
                    <View style={styles.sliderLegend}>
                        <Left><Text>0</Text></Left>
                        <Text>1</Text>
                        <Right><Text>2</Text></Right>
                    </View>

                    <View style={styles.sliderHeader}>
                        <Text style={styles.text}>I like to smoke in the car</Text>
                    </View>
                    <View style={styles.sliderHeader}>
                        <Icon name="logo-no-smoking" />
                        <Slider
                            style={styles.slider}
                            onValueChange = {(smoking) => this._updateSmoking(smoking)}
                            step = { 1 }
                            minimumValue = { 0 }
                            maximumValue = { 2 } />
                        <Icon name="smoking-rooms" />
                    </View>
                    <View style={styles.sliderLegend}>
                        <Left><Text>0</Text></Left>
                        <Text>1</Text>
                        <Right><Text>2</Text></Right>
                    </View>

                    <View style={styles.sliderHeader}>
                        <Text style={styles.text}>I like to talk in the car</Text>
                    </View>
                    <View style={styles.sliderHeader}>
                        <Icon name="md-volume-off" />
                        <Slider
                            style={styles.slider}
                            onValueChange = {(conversation) => this._updateMusic(conversation)}
                            step = { 1 }
                            minimumValue = { 0 }
                            maximumValue = { 2 } />
                        <Icon name="md-volume-high" />
                    </View>
                    <View style={styles.sliderLegend}>
                        <Left><Text>0</Text></Left>
                        <Text>1</Text>
                        <Right><Text>2</Text></Right>
                    </View>

                    <Button transparent style={styles.nextBtn} onPress={this._updateUser}>
                        <Text style={styles.textGreen}>Finish</Text>
                        <Icon style={styles.textGreen} name="ios-arrow-forward"/>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      margin: 10
    },
    title: {
      fontSize: 30,
      textAlign: 'left',
      margin: 20
    },
    sliderHeader: {
        flexDirection: 'row',
        flex: 1,
        margin: 10,
        justifyContent: 'center'
    },
    slider: {
        flexDirection: 'row',
        flex: 1,
        margin: 10
    }, 
    nextBtn: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        marginBottom: 2
    },
    textGreen: {
        fontSize: 20,
        color: '#2BB267'
    }, 
    text: {
        justifyContent: 'center'
    },
    sliderLegend: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 55,
        marginRight: 55
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
