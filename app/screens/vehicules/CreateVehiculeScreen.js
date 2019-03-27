import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, Left, Right, Body, Title, Text, Button, Icon } from 'native-base'
import { connect } from 'react-redux'
import { StackActions } from 'react-navigation'
import { astuvu } from '../../components/hoc'
import { VehicleService } from '../../service'
import { isFetching, UsersSelector, AuthSelector } from '../../selectors'
import VehiculesForm from "../../components/vehicules/VehiculesForm"

class CreateVehiculeScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            make: '',
            model: '',
            year: '',
            color: '',
            seats: 1
        }
    }

    _onFieldChange = (field, value) => {
        this.setState({
            ...this.state,
            [field]: value
        })
    }

    _createVehicule = () => {
        const { accessToken, user } = this.props;

        this.props.createVehicule(accessToken, user.id, this.state)
            .then(() => this.props.goToProfile())
            .catch(err => console.log(err))
    }

    _back = () => {
        this.props.goToProfile()
    }

    render() {
        let buttonVisible =
            this.state.make != '' &&
            this.state.model != '' &&
            this.state.year != '' &&
            this.state.color != ''

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this._back}>
                            <Icon name="close"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Add Vehicle</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content
                    scrollEnabled={false}
                    contentContainerStyle={styles.container}
                >
                    <View style={styles.form}>
                        <VehiculesForm vehicule={this.state.vehicule} onFieldChange={this._onFieldChange} />
                    </View>
                    {
                        buttonVisible &&
                        <Button block
                            disabled={this.props.isFetching}
                            onPress={this._createVehicule}
                        >
                            <Text>Add</Text>
                        </Button>
                    }
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16
    },
    form: {
        flex: 1
    }
})

const mapStateToProps = state => ({
    accessToken: AuthSelector.getAccessToken(state),
    user: UsersSelector.getUserConnected(state),
    isFetching: isFetching(state)
})

const mapDispatchToProps = dispatch => ({
    createVehicule: (accessToken, userId, vehiculeData) => dispatch(VehicleService.create(accessToken, userId, vehiculeData)),
    goToProfile: () => dispatch(StackActions.pop())
})

export default astuvu(connect(mapStateToProps, mapDispatchToProps)(CreateVehiculeScreen))
