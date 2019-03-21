import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Header, Left, Right, Body, Title, Tab, Tabs, Button, Icon, Text } from 'native-base'
import { connect } from 'react-redux'
import { StackActions } from 'react-navigation'
import { astuvu } from '../../hoc'
import TripDetails from './TripDetails'
import ProfileComponent from '../../profile/ProfileComponent'
import { getTripById } from '../../../actions/trip'
import { getUserById } from '../../../actions/user'
import { getVehiculeById } from '../../../actions/vehicules'

class DetailsTripTabScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: props.user,
            trip: props.trip,
            vehicule: {}
        }

        // Commented for demo
        // this._getTripById()
    }

    componentWillMount() {
    }

    _getTripById = () => {
        const { accessToken } = this.props.auth.credentials
        this.props.getTripById(accessToken, '5c902955c7376e6a9ddfa338').then(t => {
            this.setState({
                trip: t
            })
            this._getUserById(t.driverId)
            this._getVehiculeById(t.driverId, t.vehicleId)
        })
    }

    _getUserById = (userId) => {
        const { accessToken } = this.props.auth.credentials
        this.props.getUserById(accessToken, userId).then(u => {
            this.setState({
                user: u
            })
        })
    }

    _getVehiculeById = (userId, vehiculeId) => {
        const { accessToken } = this.props.auth.credentials
        this.props.getVehiculeById(accessToken, userId, vehiculeId).then(v => {
            this.setState({
                vehicule: v
            })
        })
    }

    _fabClickHandle = () => {
        console.log("Fab clicked")
    }

    _back = () => {
        this.props.back()
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this._back}>
                            <Icon name="arrow-back"/>
                            <Text>Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Trip Details</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content
                    scrollEnabled={false}
                    contentContainerStyle={styles.container}
                >
                    <Tabs tabBarUnderlineStyle={{ backgroundColor: '#fff', height: 2 }} locked={true}>
                        <Tab heading="TRIP"
                            tabStyle={{ backgroundColor: '#2bb267' }}
                            textStyle={{ color: '#fff' }}
                            activeTabStyle={{ backgroundColor: '#2bb267' }}
                            activeTextStyle={{ color: '#fff' }}>
                            <TripDetails {...this.props} trip={this.state.trip} vehicule={this.state.vehicule}/>
                        </Tab>
                        <Tab heading="DRIVER"
                            tabStyle={{ backgroundColor: '#2bb267' }}
                            textStyle={{ color: '#fff' }}
                            activeTabStyle={{ backgroundColor: '#2bb267' }}
                            activeTextStyle={{ color: '#fff' }}>
                            <ProfileComponent {...this.props} user={this.state.user} onFabTapped={this._fabClickHandle} fabType="message"/>
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.auth.user,
    trip: state.trip.trip
})

const mapDispatchToProps = dispatch => ({
    getTripById: (accessToken, tripId) => dispatch(getTripById(accessToken, tripId)),
    getUserById: (accessToken, userId) => dispatch(getUserById(accessToken, userId)),
    getVehiculeById: (accessToken, userId, vehiculeId) => dispatch(getVehiculeById(accessToken, userId, vehiculeId)),
    back: () => dispatch(StackActions.pop())
})

export default astuvu(connect(mapStateToProps, mapDispatchToProps)(DetailsTripTabScreen))