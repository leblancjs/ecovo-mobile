import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, Button, Alert } from 'react-native'
import { Icon, Container, Fab, Card, CardItem, Body, H1, H2, H3 } from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'
import { logout } from '../../../actions/auth'
import { deleteVehicule } from '../../../actions/vehicules'
import { getVehiculeList } from '../../../actions/vehicules'
import { ScreenNames } from '../'

class VehiculeScreen extends Component {
    constructor(props) {
        super(props)
        this._getVehiculeList();
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
    goToCreateVehicule: () => dispatch(StackActions.push({ routeName: ScreenNames.Vehicules.CREATE }))
})

export default connect(mapStateToProps, mapDispatchToProps)(VehiculeScreen)
