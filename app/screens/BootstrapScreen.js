import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Header, Content, Spinner } from 'native-base'
import { connect } from 'react-redux'
import { astuvu } from '../components/hoc'
import { bootstrap } from '../actions/bootstrap'
import LogoFadeIn from '../components/astuvu-native/LogoFadeIn';

class BootstrapScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.bootstrap()
    }

    render() {
        return (
            <Container>
                <Header transparent noShadow iosBarStyle="dark-content"/>
                <Content padder contentContainerStyle={styles.container}>
                    <LogoFadeIn
                        style={styles.logo}
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
    logo: {
        width: 192,
        height: 221,
        marginBottom: 16
    }
})

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    bootstrap: () => dispatch(bootstrap())
})

export default astuvu(connect(mapStateToProps, mapDispatchToProps)(BootstrapScreen))