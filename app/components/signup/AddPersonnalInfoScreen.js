import React, { Component } from 'react';
import { StyleSheet, Text, Alert } from 'react-native';
import { Input, Icon, Container, Form, Button, Item, Content, DatePicker, Picker, Right, View } from 'native-base';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class AddPersonnalInfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            personnalInfo: {
                firstName: '',
                lastName: '',
                chosenDate: new Date(),
                sexe: undefined
            }
        };
        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    onValueChange2(value) {
        this.setState({
            sexe: value
        });
    }

    _submitPersonnalInfo = () => {
        this.props.submitPersonnalInfo(this.props.auth.credentials.accessToken, this.state.personnalInfo);
    }

    render() {
        return (
            <Container style={styles.container}>
                <Text style={styles.title}>Personnal Info</Text>
                <Content>
                    <Button transparent>
                        <Icon active name='person' />
                        <Text style={styles.text}>Choose a picture</Text>
                    </Button>
                    <Form>
                        <Item style={styles.item}>
                            <Input style={styles.text} placeholder="First Name" />
                        </Item>
                        <Item style={styles.item}>
                            <Input style={styles.text} placeholder="Last Name" />
                        </Item>
                        <Item style={styles.item}>
                            <DatePicker
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Birthdate"
                                onDateChange={this.setDate}
                                disabled={false}
                                style={styles.text}/>
                            <Right>
                                <Icon name='calendar' />
                            </Right>
                        </Item>
                        <Item style={styles.item}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Sexe"
                                selectedValue={this.state.sexe}
                                onValueChange={this.onValueChange2.bind(this)}>
                                <Picker.Item label="Male" value="male" />
                                <Picker.Item label="Female" value="female" />
                            </Picker>
                        </Item>
                    </Form>
                    <Button transparent style={styles.nextBtn} onPress={this.props._submitPersonnalInfo}>
                        <Text style={styles.textGreen}>Next</Text>
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
      margin: 20,
    },
    text: {
        fontSize: 15,
        opacity: 1
    },
    textGreen: {
        fontSize: 20,
        color: '#2BB267'
    },
    item: {
        margin: 20
    }, 
    nextBtn: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        marginBottom: 2
    }
});

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    submitPersonnalInfo: (accessToken, personnalInfo) => dispatch(submitPersonnalInfo(accessToken, personnalInfo))
        .then(() => dispatch(NavigationActions.navigate({ routeName: 'AddPreferences' })))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPersonnalInfoScreen);
