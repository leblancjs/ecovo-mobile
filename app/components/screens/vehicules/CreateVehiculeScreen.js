import React, { Component } from 'react'
import { StyleSheet, Text, Button as ReactButton, View } from 'react-native'
import { Icon, Container, Content, Button } from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'
import { withStatusBar } from '../../hoc'
import { logout } from '../../../actions/auth'
import { createVehicule } from '../../../actions/vehicules'
import { ScreenNames } from '../'
import VehiculesForm from "../../vehicules/VehiculesForm"

class CreateVehiculeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <ReactButton
                    title='Logout'
                    onPress={navigation.getParam('logout')}
                    color='#fff'
                />
            ),
            headerLeft: (
                <ReactButton
                    title='Vehicule'
                    onPress={navigation.getParam('vehicule')}
                    color='#fff'
                />
            )
        }
    }

    constructor(props) {
        super(props)

        this.state = {
            make: '',
            model: '',
            year: '',
            color: ''
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ logout: this._logout })
        this.props.navigation.setParams({ vehicule: this.props.goToVehicule })
    }

    _onFieldChange = (field, value) => {
        this.setState({
            ...this.state,
            [field]: value
        })
    }

    _createVehicule = () => {
        const { credentials, user } = this.props.auth;

        this.props.createVehicule(credentials.accessToken, user.id, this.state)
            .then(() => this.props.goToVehicule())
            .catch(err => console.log(err))
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
        let buttonVisible =
            this.state.make != '' &&
            this.state.model != '' &&
            this.state.year != '' &&
            this.state.color != ''

        return (
            <Container style={styles.container}>
                <Text style={styles.title}>Add a vehicule</Text>
                <Content>
                    <VehiculesForm vehicule={this.state.vehicule} onFieldChange={this._onFieldChange} />
                </Content>
                <View style={styles.saveBtn}>
                    {
                        buttonVisible &&
                        <Button transparent onPress={this._createVehicule} >
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

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    createVehicule: (accessToken, userId, vehiculeData) => dispatch(createVehicule(accessToken, userId, vehiculeData)),
    goToWelcome: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.SignIn.HOME })),
    goToVehicule: () => dispatch(StackActions.pop({ routeName: ScreenNames.Vehicules.HOME }))
})

export default withStatusBar(connect(mapStateToProps, mapDispatchToProps)(CreateVehiculeScreen))
