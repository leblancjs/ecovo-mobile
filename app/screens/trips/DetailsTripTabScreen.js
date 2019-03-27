import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Header, Left, Right, Body, Title, Tab, Tabs, Button, Icon, Text } from 'native-base'
import { connect } from 'react-redux'
import { StackActions } from 'react-navigation'
import { astuvu } from '../../components/hoc'
import TripDetails from '../../components/trips/TripDetails'
import ProfileComponent from '../../components/profile/ProfileComponent'
import { TripsSelector, UsersSelector, VehiclesSelector, AuthSelector } from '../../selectors'

class DetailsTripTabScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: props.driver,
            trip: props.trip,
            vehicle: props.vehicle ? props.vehicle : {
                make:"",
                model:"", 
                year: 0, 
                color: ""
            }
        }
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
                            <TripDetails {...this.props} trip={this.state.trip} vehicule={this.state.vehicle}/>
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
    user: UsersSelector.getUserConnected(state),
    accessToken: AuthSelector.getAccessToken(state),
    trip: TripsSelector.getTripSelected(state),
    driver: UsersSelector.getDriver(state),
    vehicle: VehiclesSelector.getVehicle(state)
})

const mapDispatchToProps = dispatch => ({
    back: () => dispatch(StackActions.pop())
})

export default astuvu(connect(mapStateToProps, mapDispatchToProps)(DetailsTripTabScreen))