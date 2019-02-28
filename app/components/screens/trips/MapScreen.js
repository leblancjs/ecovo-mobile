import React, { Component } from 'react'
import { StyleSheet, View, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { withStatusBar } from '../../hoc';
import { ScreenNames } from '../';

class MapScreen extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.gif}
                    source={{uri: "https://i.kym-cdn.com/photos/images/newsfeed/001/042/114/a2f.gif"}}
                />
                <Button
                    title='Profile'
                    onPress={this.props.goToProfile}
                />
                <Button
                    title='Vehicule'
                    onPress={this.props.goToVehicule}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gif: {
        flex: 0.5,
        alignSelf: 'stretch'
    }
})

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    goToProfile: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Profile.HOME })),
    goToVehicule: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Vehicules.HOME }))
})

export default withStatusBar(connect(mapStateToProps, mapDispatchToProps)(MapScreen));