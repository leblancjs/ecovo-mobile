import React, { Component } from 'react'
import { Container, Header, Content, Left, Body, Right, Title, Button, Text } from 'native-base'
import { StyleSheet, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { astuvu } from '../../components/hoc'
import { ScreenNames } from '..'

class GenericErrorScreen extends Component {
    constructor(props) {
        super(props)
    }

    _reportBug = () => {
        alert('Hide the pain.')
    }

    render() {
        return (
            <Container>
                <Header noShadow>
                    <Left>
                        <Button transparent onPress={this.props.reboot}>
                            <Text>Reboot</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Oops!</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content contentContainerStyle={styles.container}>
                    <Image
                        style={styles.gif}
                        source={{uri: 'https://media1.tenor.com/images/4f6832682f5cd2400bc5cabb23523fb3/tenor.gif'}}
                    />
                    <View style={styles.content}>
                        <Text style={styles.title}>
                            Well that's embarassing...
                        </Text>
                        <View>
                            <Text style={styles.message}>
                                Something went wrong. We're sorry! We'll fix it, we promise!
                                In the mean time, feel free to write us to express your anger or sadness.
                            </Text>
                            <Text style={styles.harold}>
                                Harold feels your pain.
                            </Text>
                        </View>
                        <Button block onPress={this._reportBug}>
                            <Text>Report a Bug</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gif: {
        flex: 1,
        alignSelf: 'stretch'
    },
    content: {
        flex: 1,
        margin: 16
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 16
    },
    message: {
        marginBottom: 16
    },
    harold: {
        marginBottom: 8
    }
})

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    reboot: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.BOOTSTRAP }))
})

export default astuvu(connect(mapStateToProps, mapDispatchToProps)(GenericErrorScreen))