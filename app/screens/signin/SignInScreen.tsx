import React, { Component } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Container, Header, Content, Title, Left, Right, Body, Text, Button, Card, CardItem } from 'native-base'
import { connect } from 'react-redux'
import { LogoFadeIn } from '../../components'
import { UISelectors } from '../../selectors'
import { BootstrapService } from '../../services'
import { AppState } from '../../store'

export interface SignInScreenProps {
    fetching: boolean
}

class SignInScreen extends Component<SignInScreenProps> {
    constructor(props: SignInScreenProps) {
        super(props)
    }

    private getStarted = (): void => {
        BootstrapService.bootstrap()
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
                <Content
                    padder
                    scrollEnabled={false}
                    contentContainerStyle={{ flex: 1 }}
                >
                    <View style={styles.logoContainer}>
                        <LogoFadeIn
                            source={require('../../../assets/logo.png')}
                        />
                        <Text>The smart way to carpool</Text>
                    </View>
                    <ScrollView style={styles.shamelessPublicityContainer}>
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
                    </ScrollView>
                    <Button block
                        disabled={this.props.fetching}
                        onPress={this.getStarted}
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
        marginBottom: 24,
    },
    shamelessPublicityContainer: {
        flex: 1,
        marginBottom: 16,
    },
})

const mapStateToProps = (state: AppState) => ({
    fetching: UISelectors.isFetching(state)
})

export default connect(mapStateToProps)(SignInScreen)
