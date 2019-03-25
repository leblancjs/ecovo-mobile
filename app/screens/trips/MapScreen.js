import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import { ScreenNames } from '..';
import { Container, Icon, Text } from 'native-base';
import SlidingUpPanel from 'rn-sliding-up-panel';
import SearchTripComponent from '../../components/trips/SearchTripComponent';
import { withStatusBar } from '../../components/hoc';
import EcovoMapView from '../../components/astuvu-native/EcovoMapView';
class MapScreen extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)
        this.state = {
            user: props.auth.user,
        };
    }

    _slideDown = () => {
        this._panel.hide();
    }
    _goToMyProfile = () => {
        this.props.goToProfile();
    }
    _goToCreateTrip = () => {
        this.props.goToCreateTrip();
    }
    _searchTrips = (params) => {
        //this.props.search.setSearchParams(params);
        this.props.goToResults(params);
    }

    render() {
        return (

            <Container style={styles.container}>
                <EcovoMapView />
                <View style={styles.menuWrapper}>
                    <TouchableOpacity style={styles.touchableIcon} onPress={this._goToMyProfile}>
                        <Image style={styles.profile} source={{ uri: this.state.user.photo }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableIcon} onPress={this._goToCreateTrip}>
                        <Container style={styles.iconTripsWrapper} >
                            <Icon style={styles.iconTrips} type="FontAwesome5" name="map-marked"></Icon>
                        </Container>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.footerHeaderText}>
                        Find a Trip
                    </Text>
                    <TouchableOpacity style={styles.itemRow} onPress={() => this._panel.show()}>
                        <Icon active name='search' style={styles.searchIcon} />
                        <Text style={styles.search}>From</Text>
                    </TouchableOpacity>
                </View>
                <SlidingUpPanel allowDragging={false} ref={c => this._panel = c} allowMomentum={false}>
                    <SearchTripComponent onSearchTrips={this._searchTrips} onCloseComponent={this._slideDown}></SearchTripComponent>
                </SlidingUpPanel>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,

    },
    touchableIcon: {
        margin: 10,
    },
    menuWrapper: {
        position: 'absolute',
        top: 10,
        right: 0,

    },
    profile: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#eee"
    },
    iconTripsWrapper: {
        borderColor: "#eee",
        backgroundColor: "#2BB267",
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center'
    },
    iconTrips: {
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'center',
        color: '#fff',

    },
    bottom: {
        flex: 1,
        position: 'absolute',
        backgroundColor: '#2BB267',
        width: '100%',
        bottom: 0,
        justifyContent: 'flex-end',
        padding: 20,
        paddingBottom: 0,
    },
    footerHeaderText: {
        color: '#fff',
        padding: 10,
        fontSize: 24,
    },
    itemRow: {
        backgroundColor: "#fff",
        flex: 1,
        flexDirection: "row",
        margin: 10,
        borderRadius: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.24,
        shadowRadius: 2,
        elevation: 1,
    },
    searchIcon: {
        color: '#737373',
        margin: 10,
        marginLeft: 15,
        fontSize: 20,
    },
    search: {
        padding: 10,
        fontSize: 18,
        color: "#AEAEAE",
        textAlignVertical: 'center',

    }
})

const mapStateToProps = state => ({
    auth: state.auth
});
const mapDispatchToProps = dispatch => ({
    goToProfile: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Profile.HOME })),
    goToCreateTrip: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Trips.ADD })),
    goToResults: (params) => dispatch(StackActions.push({ routeName: ScreenNames.Trips.RESULTS, params: { searchFilters: params } }))
})

export default withStatusBar(connect(mapStateToProps, mapDispatchToProps)(MapScreen));