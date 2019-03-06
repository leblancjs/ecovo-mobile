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

    constructor(props) {
        super(props)

        this.state = {
            make: '',
            model: '',
            year: '',
            color: ''
        }
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
            .then(() => this.props.goToProfile())
            .catch(err => console.log(err))
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
    goToProfile: () => dispatch(StackActions.pop({ routeName: ScreenNames.Profile.HOME }))
})

export default withStatusBar(connect(mapStateToProps, mapDispatchToProps)(CreateVehiculeScreen))
