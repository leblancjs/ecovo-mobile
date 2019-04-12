import React, { Component, Dispatch } from 'react'
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'
import { Container, Icon, Text, Content, Footer, Body } from 'native-base'
import { EcovoMapView, Photo } from '../../components'
import { UserSelectors } from '../../selectors'
import { ScreenNames } from '..'
import { AnyAction } from 'redux'
import { User } from '../../entities'
import { withStatusBar } from '../../components/hoc'
import { AppState } from '../../store'

export interface MapScreenProps {
    user: User
    goToProfile: () => void
    goToCreateTrip: () => void
    goToResults: () => void
    goToTripSearch: () => void
}

class MapScreen extends Component<MapScreenProps> {
    constructor(props: MapScreenProps) {
        super(props)

        this.state = {
            user: props.user,
        }
    }

    private goToMyProfile = () => {
        this.props.goToProfile()
    }

    private goToCreateTrip = () => {
        this.props.goToCreateTrip()
    }
    
    private goToTripSearch = () => {
        this.props.goToTripSearch()
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={{ flex: 1 }}>
                    <EcovoMapView />
                    <View style={styles.menuWrapper}>
                    <TouchableOpacity style={styles.touchableIcon} onPress={this.goToMyProfile}>
                        <Photo
                            style={styles.profile}
                            source={this.state.user.photo}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableIcon} onPress={this.goToCreateTrip}>
                        <Container style={styles.iconTripsWrapper} >
                            <Icon style={styles.iconTrips} type="FontAwesome5" name="map-marked"></Icon>
                        </Container>
                    </TouchableOpacity>
                    </View>
                </View>
                <Footer>
                    <Body>
                        <View style={styles.bottom}>
                            <Text style={styles.footerHeaderText}>
                                Find a Trip
                            </Text>
                            <TouchableOpacity style={styles.itemRow} onPress={this.goToTripSearch}>
                                <Icon active name='search' style={styles.searchIcon} />
                                <Text style={styles.search}>From</Text>
                            </TouchableOpacity>
                        </View>
                    </Body>
                </Footer>
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
        // marginBottom: Platform.OS === "ios" ? -40 : 0,
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

const mapStateToProps= (state: AppState) =>  ({
    user: UserSelectors.getUserConnected(state)
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    goToProfile: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Profile.HOME })),
    goToCreateTrip: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Trips.ADD })),
    goToResults: () => dispatch(StackActions.push({ routeName: ScreenNames.Trips.RESULTS })),
    goToTripSearch: () => dispatch(StackActions.push({ routeName: ScreenNames.Trips.SEARCH })),
})

export default withStatusBar(connect(mapStateToProps, mapDispatchToProps)(MapScreen))