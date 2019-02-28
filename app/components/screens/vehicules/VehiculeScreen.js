import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Icon, Container, Form, Button, Item, Content, DatePicker, Picker, Right } from 'native-base'
import { connect } from 'react-redux'
import moment from 'moment'
import { NavigationActions, StackActions } from 'react-navigation'
import { withStatusBar } from '../../hoc'
import { logout } from '../../../actions/auth'
import { ScreenNames } from '../'

class VehiculeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Button
                    title='Logout'
                    onPress={navigation.getParam('logout')}
                    color='#fff'
                />
            ),
            headerLeft: (
                <Button
                    title='Trip'
                    onPress={navigation.getParam('trip')}
                    color='#fff'
                />
            )
        }
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.navigation.setParams({ logout: this._logout })
        this.props.navigation.setParams({ trip: this.props.goToTrip })
    }

    _logout = () => {
        this.props.logout()
            .then(() => this.props.goToWelcome())
            .catch(err => this._error(err))
    }

    _error = (err) => {
        alert('Oh no! Something went wrong, looks like your stuck here (' + JSON.stringify(err) + ').')
    }

    render() {
        return (
            <Container style={styles.container}>
                <Text style={styles.title}>Add a vehicule</Text>
                <Content>
                    <Form>
                        <Item style={styles.item}>
                            <Input style={styles.text}
                                value=""
                                onChangeText={(make) => console.log("Make : " +make)}
                                placeholder="Make" />
                        </Item>
                        <Item style={styles.item}>
                            <Input style={styles.text}
                                value=""
                                onChangeText={(model) => console.log("model : " +model)}
                                placeholder="Model" />
                        </Item>
                        <Item style={styles.item}>
                            <DatePicker
                                defaultDate=""
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Year"
                                onDateChange={(year) => console.log("Year : " +year)}
                                disabled={false}
                                formatChosenDate={date => {return moment(date).format('YYYY');}}
                                style={styles.text} />
                            <Right>
                                <Icon name='calendar' />
                            </Right>
                        </Item>
                        <Item style={styles.item}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                placeholder="Color"
                                selectedValue=""
                                onValueChange={(color) => console.log("Color : "+ color)}
                            >
                                <Picker.Item label="White" value="White" />
                                <Picker.Item label="Black" value="Black" />
                                <Picker.Item label="Red" value="Red" />
                                <Picker.Item label="Blue" value="Blue" />
                                <Picker.Item label="Green" value="Green" />
                            </Picker>
                        </Item>
                    </Form>
                </Content>
                <View style={styles.saveBtn}>
                    {
                        //buttonVisible &&
                        <Button transparent
                            //onPress={this._createUser}
                        >
                            <Text style={styles.textGreen}>Save</Text>
                            <Icon style={styles.textGreen} name="ios-arrow-forward" />
                        </Button>
                    }
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    title: {
        fontSize: 30,
        textAlign: 'left',
        margin: 20,
    },
    item: {
        margin: 15
    },
    text: {
        fontSize: 15,
        opacity: 1
    },
    saveBtn: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        marginBottom: 2
    },
    textGreen: {
        fontSize: 20,
        color: '#2BB267'
    },
})

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    goToWelcome: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.SignIn.HOME })),
    goToTrip: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Trips.HOME }))
})

export default withStatusBar(connect(mapStateToProps, mapDispatchToProps)(VehiculeScreen))
