import React, { Component } from 'react';
import { StyleSheet, Text, Slider } from 'react-native';
import { Container, Content, View, Button, Icon } from 'native-base';
import { connect } from 'react-redux';

class AddPreferences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preferences: {
                musicValue: 0,
                smokingValue: 0
            }
        }
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
                            musicValue = {this.state.musicValue}
                            onValueChange = {(musicValue) => this.setState({musicValue})}
                            step = { 50 }
                            minimumValue = { 0 }
                            maximumValue = { 100 } />
                        <Icon name="md-volume-high" />
                    </View>

                    <View style={styles.sliderHeader}>
                        <Text style={styles.text}>I like to smoke in the car</Text>
                    </View>
                    <View style={styles.sliderHeader}>
                        <Icon name="logo-no-smoking" />
                        <Slider
                            style={styles.slider}
                            smokingValue = {this.state.smokingValue}
                            onValueChange = {(smokingValue) => this.setState({smokingValue})}
                            step = { 50 }
                            minimumValue = { 0 }
                            maximumValue = { 100 } />
                        <Icon name="smoking-rooms" />
                    </View>

                    <View style={styles.sliderHeader}>
                        <Text style={styles.text}>I like to talk in the car</Text>
                    </View>
                    <View style={styles.sliderHeader}>
                        <Icon name="md-volume-off" />
                        <Slider
                            style={styles.slider}
                            musicValue = {this.state.musicValue}
                            onValueChange = {(musicValue) => this.setState({musicValue})}
                            step = { 50 }
                            minimumValue = { 0 }
                            maximumValue = { 100 } />
                        <Icon name="md-volume-high" />
                    </View>
                    <Button transparent style={styles.nextBtn} onPress={this.props._submitPersonnalInfo}>
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
        margin: 10
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
    }
});

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPreferences);
