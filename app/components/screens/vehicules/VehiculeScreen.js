import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, Button, Alert } from 'react-native'
import { Icon, Container, Fab, Card, CardItem, Body, H1, H2, H3 } from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'
import { withStatusBar } from '../../hoc'
import { logout } from '../../../actions/auth'
import { deleteVehicule } from '../../../actions/vehicules'
import { getVehiculeList } from '../../../actions/vehicules'
import { ScreenNames } from '../'

class VehiculeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Button
                    title='Logout'
                    onPress={navigation.getParam('logout')}
                    color='#fff'
                />
            ),
            headerLeft: (
                <Button
                    title='Trip'
                    onPress={navigation.getParam('trip')}
                    color='#fff'
                />
            )
        }
    }

    constructor(props) {
        super(props)
        this._getVehiculeList();
    }

    componentDidMount() {
        this.props.navigation.setParams({ logout: this._logout })
        this.props.navigation.setParams({ trip: this.props.goToTrip })
    }

    _getVehiculeList = () => {
        const { credentials, user } = this.props.auth;

        this.props.getVehiculeList(credentials.accessToken, user.id).then(v => {
            console.log("Vehicule Screen")
            console.log(v)
        }).catch(error => {
            console.log(error)
        })
    }

    _logout = () => {
        this.props.logout()
            .then(() => this.props.goToWelcome())
            .catch(err => this._error(err))
    }

    _error = (err) => {
        alert('Oh no! Something went wrong, looks like your stuck here (' + JSON.stringify(err) + ').')
    }

    _deleteVehicule = (vehiculeId) => {
        const { credentials, user } = this.props.auth;

        Alert.alert(
            'Vehocile delete',
            'Are you sure to delete this vehicule?',
            [
                { text: 'Yes', onPress: () => this.props.deleteVehicule(credentials.accessToken, user.id, vehiculeId) },
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                }
            ],
            { cancelable: false },
        );
    }

    render() {
        const { vehicules } = this.props.vehicules
        return (
            <Container style={styles.container}>
                <View>
                    <ScrollView>
                        {vehicules.map((v, i) => {
                            return (
                                <Card key={i}>
                                    <CardItem>
                                        <Body>
                                            <View style={styles.titleCard}>
                                                <H1>{v.make.toUpperCase()}</H1>
                                                <H2> - {v.model}</H2>
                                            </View>
                                            <H3>{v.year}</H3>
                                            <Text>{v.color.toUpperCase()}</Text>
                                            <View style={styles.deletebtn}>
                                                <Button title='DELETE' color='#2bb267' onPress={() => this._deleteVehicule(v.id)} />
                                            </View>
                                        </Body>
                                    </CardItem>
                                </Card>
                            )
                        })}
                    </ScrollView>
                </View>
                <View style={styles.fabView}>
                    <Fab
                        active={true}
                        direction="up"
                        containerStyle={{}}
                        style={styles.fab}
                        position="bottomRight"
                        onPress={this.props.goToCreateVehicule}>
                        <Icon name="md-add" />
                    </Fab>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleCard: {
        flex: 1,
        flexDirection: 'row'
    },
    deletebtn: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    fabView: {
        flex: 1
    },
    fab: {
        backgroundColor: '#2BB267'
    }
})

const mapStateToProps = state => ({
    auth: state.auth,
    vehicules: state.ui.vehicules
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    deleteVehicule: (accessToken, userId, vehiculeId) => dispatch(deleteVehicule(accessToken, userId, vehiculeId)),
    getVehiculeList: (accessToken, userId) => dispatch(getVehiculeList(accessToken, userId)),
    goToWelcome: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.SignIn.HOME })),
    goToTrip: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Trips.HOME })),
    goToCreateVehicule: () => dispatch(StackActions.push({ routeName: ScreenNames.Vehicules.CREATE }))
})

export default withStatusBar(connect(mapStateToProps, mapDispatchToProps)(VehiculeScreen))
