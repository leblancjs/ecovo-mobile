import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { withSafeView } from '../hoc'
import { bootstrap } from '../../actions/bootstrap'

class BootstrapScreen extends Component {
    constructor(props) {
        super(props)

        StatusBar.setBarStyle('dark-content', true)
    }

    componentDidMount() {
        this.props.bootstrap()
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#2bb267"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    bootstrap: () => dispatch(bootstrap())
})

export default withSafeView(connect(mapStateToProps, mapDispatchToProps)(BootstrapScreen))