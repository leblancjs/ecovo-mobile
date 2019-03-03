import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Text, Fab, Card, CardItem, Body, Icon, Content } from 'native-base';
import PreferencesForm from './PreferencesForm';
import PropTypes from 'prop-types';

class ProfileComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            photo: props.user? props.user.photo : '',
            firstName: props.user ? props.user.firstName : '',
            lastName: props.user ? props.user.lastName : '',
            dateOfBirth: props.user ? props.user.dateOfBirth : '',
            gender: props.user ? props.user.gender : '',
            description : props.user ? props.user.description : '',
            preferences: {
                music: props.user.preferences ? props.user.preferences.music : 0,
                smoking: props.user.preferences ? props.user.preferences.smoking : 0,
                conversation: props.user.preferences ? props.user.preferences.conversation : 0
            }

        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            props
        })
        this.render();
      }

    _calculateAge = (birthday) => {
        if (birthday != "") {
            birthday = new Date(birthday);
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

    }
    
    _fabHandler = () => {
        if (this.props.onFabTapped) {
            this.props.onFabTapped();
        }
     }

    render() {
        return (
            <Container>
                <ScrollView>
                    <View style={styles.row}>
                        <Image style={styles.logo} source={{ uri: this.state.photo }} />
                    </View>
                    <View style={styles.nameHolder}>
                        <Text style={styles.name}>
                            {this.state.firstName} {this.state.lastName}
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
                                    Age : {this._calculateAge(this.state.dateOfBirth)} years old
                                </Text>
                                <Text>
                                    Gender : {this.state.gender}
                                </Text>
                                <Text>
                                    Phone : {this.state.phoneNumber}
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>More about {this.state.firstName}</Text>
                        </CardItem>
                        <CardItem>
                            <Body style={styles.sliderContainer}>
                                <Text>Some elements to take under consideration before riding with {this.state.firstName}.</Text>
                                <Content style={styles.slider}>
                                    <PreferencesForm disabled={true} preferences={this.state.preferences}></PreferencesForm>
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
                                    {this.state.description == "" ? "No description" : this.state.description}
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                </ScrollView>
                <Fab direction="right" position="bottomRight"
                    style={{ backgroundColor: '#2BB267' }}
                    onPress={this._fabHandler}>
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
ProfileComponent.propTypes = {
    user: PropTypes.object,
    onFabTapped: PropTypes.func.isRequired,
}
export default ProfileComponent