import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image } from 'react-native';
import { Text, CardItem, Body, Icon, H1, H2 } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

class TripStopDetails extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
    }

    render() {
        const { stops } = this.props;
        return (
            <CardItem>
                <Body>
                    <ScrollView style={styles.scrollViewStyle}>
                        <View style={styles.viewMasterStyle}>
                            <View style={styles.viewLeftStyle}>
                                <Icon type="FontAwesome5" name="circle" />

                                <Image style={styles.imgLineVertical} source={require('./img_299219.png')} />

                                <Icon type="FontAwesome5" name="circle" />
                            </View>
                            <View style={styles.viewRightStyle}>
                                {stops.map((s, i) => {
                                    return (
                                        <View key={i}>
                                            <View>
                                                <View style={styles.textSameLine}>
                                                    <H1>{s.title}</H1>
                                                    <Text style={styles.txtHourStyle}>- {s.hour}</Text>
                                                </View>
                                                <Text>{s.subtitle}</Text>
                                            </View>

                                            {s.duration &&
                                                <View>
                                                    <Text style={styles.textBold}>{s.duration}</Text>
                                                </View>
                                            }
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    </ScrollView>
                </Body>
            </CardItem>
        )
    }
}

const styles = StyleSheet.create({
    textSameLine: {
        flexDirection: 'row'
    },
    textBold: {
        fontWeight: 'bold',
        paddingVertical: 20
    },
    scrollViewStyle: {
        width: '100%'
    },
    viewMasterStyle: {
        flex: 1,
        flexDirection: 'row',
        width: '100%'
    },
    viewLeftStyle: {
        paddingHorizontal: 25
    },
    imgLineVertical: {
        height: '82%',
        width: 3,
        marginLeft: 12
    },
    viewRightStyle: {
        paddingHorizontal: 25
    },
    txtHourStyle: {
        paddingTop: 7,
        paddingLeft: 3
    }
})

TripStopDetails.propTypes = {
    stops: PropTypes.array
}

export default TripStopDetails;