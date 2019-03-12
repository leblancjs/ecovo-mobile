import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Text, Card, CardItem, Body, Icon, H1, H2, H3 } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import EcovoMapView from '../../astuvu-native/EcovoMapView';
import { getTripList } from '../../../actions/trip'

var markers = [
    {
        latitude: 45.5016889,
        longitude: -73.567256,
        title: 'Origin',
        subtitle: 'Montreal'
    },
    {
        latitude: 45.404476,
        longitude: -71.888351,
        title: 'Stop 1',
        subtitle: 'Sherbrook'
    },
    {
        latitude: 46.3938,
        longitude: -72.6534,
        title: 'Stop 2',
        subtitle: 'Trois-Rivière'
    },
    {
        latitude: 46.8138,
        longitude: -71.2079,
        title: 'Destination',
        subtitle: 'Quebec'
    },
];

const origin = { latitude: 45.5016889, longitude: -73.567256 };
const destination = { latitude: 46.8138, longitude: -71.2079 };
const stopPoint = [{ latitude: 45.404476, longitude: -71.888351 }, { latitude: 46.3938, longitude: -72.6534 }]

class TripDetails extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)
        this.state = {
            user: props.auth.user,
        };
        this._getTripList();
    }

    _getTripList = () => {
        const { credentials, user } = this.props.auth;

        this.props.getTripList(credentials.accessToken, user.id).then(t => {
            console.log("Trip Screen")
            console.log(t)
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <Container style={styles.container}>

                <EcovoMapView markers={markers} origin={origin} destination={destination} stopPoints={stopPoint} />
                <View style={styles.bottom}>
                    <Card style={{height: '45%', paddingBottom: 60}}>
                        <CardItem header>
                            <Icon type="MaterialIcons" name="directions-car" />
                            <View style={{ flex: 1 }}>
                                <View style={styles.textSameLine}>
                                    <Text>Toyota Camry</Text>
                                    <Text style={styles.textLight}> 2016</Text>
                                </View>
                                <Text style={styles.textLight}>Green</Text>
                            </View>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <ScrollView style={{ width: '100%'}}>
                                    <View style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
                                        <View style={{ paddingHorizontal: 25  }}>
                                            <Icon type="FontAwesome5" name="circle" />

                                            <Icon type="SimpleLineIcons" name="options-vertical" style={{resizeMode: 'repeat', height: '82%'}} />

                                            <Icon type="FontAwesome5" name="circle" />
                                        </View>
                                        <View style={{ paddingHorizontal: 25  }}>
                                            <View>
                                                <View style={styles.textSameLine}>
                                                    <H1>Start</H1>
                                                    <Text>- 14:00</Text>
                                                </View>
                                                <Text>Montréal</Text>
                                            </View>

                                            <View>
                                                <Text style={styles.textBold}>1h30</Text>
                                            </View>

                                            <View>
                                                <View style={styles.textSameLine}>
                                                    <H2>Stop 1</H2>
                                                    <Text>- 15:30</Text>
                                                </View>
                                                <Text>Sherbrook</Text>
                                            </View>

                                            <View>
                                                <Text style={styles.textBold}>3h00</Text>
                                            </View>

                                            <View>
                                                <View style={styles.textSameLine}>
                                                    <H2>Stop 2</H2>
                                                    <Text>- 18:30</Text>
                                                </View>
                                                <Text>Trois-Rivière</Text>
                                            </View>

                                            <View>
                                                <Text style={styles.textBold}>1h00</Text>
                                            </View>

                                            <View>
                                                <View style={styles.textSameLine}>
                                                    <H1>Finish</H1>
                                                    <Text>- 19:30</Text>
                                                </View>
                                                <Text>Québec</Text>
                                            </View>

                                        </View>
                                    </View>
                                </ScrollView>
                            </Body>
                        </CardItem>
                    </Card>
                </View>
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
    bottom: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        justifyContent: 'flex-end',
        padding: 5,
        paddingBottom: 0,
        height: '65%'
    },
    textSameLine: {
        flexDirection: 'row'
    },
    textLight: {
        fontWeight: 'normal'
    },
    textBold: {
        fontWeight: 'bold',
        paddingVertical: 20
    }
})

const mapStateToProps = state => ({
    auth: state.auth,
    trip: state.trip
});
const mapDispatchToProps = dispatch => ({
    getTripList: (accessToken, userId) => dispatch(getTripList(accessToken, userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TripDetails);