import React, { Component } from 'react'
import { StyleSheet, View, Button, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { bootstrap } from '../../../actions/bootstrap'
import { withStatusBar } from '../../hoc'
import LogoFadeIn from "./LogoFadeIn"

class SignInScreen extends Component {
    constructor(props) {
        super(props)
    }

    _getStarted = () => {
        StatusBar.setBarStyle('dark-content', true)

        this.props.bootstrap()
            .catch(err => console.log("Looks like we're stuck here for a while.", err))
            .finally(() => StatusBar.setBarStyle('light-content', true))
    }

    render() {
        return (
            <View style={styles.container}>
                <LogoFadeIn
                    style={styles.logo}
                    source={require('../../../../assets/logo.png')}
                />
                <Button
                    title="Get Started"
                    onPress={this._getStarted}
                    disabled={this.props.isFetching}
                    color="#2bb267"
                />
            </View>
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
        width: 256,
        height: 295
    }
})

const mapStateToProps = state => ({
    isFetching: state.auth.isFetching
})

const mapDispatchToProps = dispatch => ({
    bootstrap: () => dispatch(bootstrap())
})

export default withStatusBar(connect(mapStateToProps, mapDispatchToProps)(SignInScreen))
