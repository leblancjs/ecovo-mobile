import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Header, Content, Spinner } from 'native-base'
import LogoFadeIn from '../components/astuvu-native/LogoFadeIn'
import { BootstrapService, ErrorService } from '../services'

export interface Props {}
interface State {}

class BootstrapScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
        BootstrapService.bootstrap()
            .catch(error => ErrorService.signal(error))
    }

    render() {
        return (
            <Container>
                <Header transparent noShadow iosBarStyle="dark-content"/>
                <Content padder contentContainerStyle={styles.container}>
                    <LogoFadeIn
                        source={require('../../assets/logo.png')}
                    />
                    <Spinner color="#2bb267"/>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default BootstrapScreen