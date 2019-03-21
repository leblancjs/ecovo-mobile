import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, Title, Left, Right, Body, Text, Button, Card, CardItem } from 'native-base'
import { connect } from 'react-redux'
import { bootstrap } from '../../../actions/bootstrap'
import { astuvu } from '../../hoc'
import LogoFadeIn from "../../astuvu-native/LogoFadeIn"

class SignInScreen extends Component {
    constructor(props) {
        super(props)
    }

    _getStarted = () => {
        this.props.bootstrap()
            .catch(err => console.log("Looks like we're stuck here for a while.", err))
    }

    render() {
        return (
            <Container>
                <Header transparent noShadow iosBarStyle="dark-content">
                    <Left />
                    <Body>
                        <Title>Welcome</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder scrollEnabled={false}>
                    <View style={styles.logoContainer}>
                        <LogoFadeIn
                            style={styles.logo}
                            source={require('../../../../assets/logo.png')}
                        />
                        <Text>The smart way to carpool</Text>
                    </View>
                    <View style={styles.shamelessPublicityContainer}>
                        <Card>
                            <CardItem header>
                                <Text>Drivers</Text>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>
                                        You can post your trips, and let the passengers come to you.
                                        We'll handle all the payment details, so you just have to show up
                                        and drive.
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem header>
                                <Text>Passengers</Text>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>
                                        Look for the ride that is most convenient for you. If you can't find it,
                                        we got you! Make a request for a lift and we'll notify you as soon as we
                                        find one!
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                    <Button block
                        disabled={this.props.isFetching}
                        onPress={this._getStarted}
                    >
                        <Text>Get Started</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24
    },
    logo: {
        width: 192,
        height: 221,
        marginBottom: 16
    },
    shamelessPublicityContainer: {
        flex: 1,
        marginBottom: 16
    }
})

const mapStateToProps = state => ({
    isFetching: state.auth.isFetching
})

const mapDispatchToProps = dispatch => ({
    bootstrap: () => dispatch(bootstrap())
})

export default astuvu(connect(mapStateToProps, mapDispatchToProps)(SignInScreen))
