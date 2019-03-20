import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'native-base'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import moment from "moment";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class TripCardCarousel extends Component {
    constructor(props) {
        super(props)
    }

    _onItemChange(index) {
        if (this.props.onItemChange) { 
            this.props.onItemChange(index);
        }
    }

    _renderItem({ item, index }) {
        item = {
            time: item.leaveAt && item.arriveBy ? Date.parse(item.arriveBy) - Date.parse(item.leaveAt) : 0,
            price: item.price ? item.price : "",
            departure: item.departure ? item.departure : new Date(),
            arrival: item.arrival ? item.arrival : new Date(),
            stops: item.stops ? item.stops.length : 0,
            car: item.car != null ? item.car : { make: "Toyota", year: 1999, model: "Tercel" }
        };

        return (
            <View style={styles.slideDropShadow}>
                <View style={styles.slide}>
                    <View style={styles.inline}>
                        <Text style={styles.time}>{Math.floor(moment.duration(item.time).asHours()) + moment.utc(moment.duration(item.time)).format(":mm:ss")}</Text>
                        <View style={styles.priceWrapper}>
                            <Text style={styles.price}>{item.price}$</Text>
                        </View>
                    </View>
                    <Text style={styles.departure}>Departure: {moment(item.departure).format("H:HH (L)")}</Text>
                    <Text style={styles.arrival}>Arrival: {moment(item.arrival).format("H:HH (L)")}</Text>
                    <Text style={styles.stop}>{item.stops} stop(s)</Text>
                    <View style={styles.inline}>
                        <View style={styles.inline}>
                            <Text style={styles.carMake}>{item.car.make && item.car.make || ""} {item.car.model && item.car.model || ""}</Text>
                            <Text style={styles.carYear}> {item.car.year && item.car.year || ""}</Text>
                        </View>
                        <Button style={styles.button} ><Text style={styles.buttonText}>MORE</Text></Button>
                    </View>

                </View>
            </View>
        );
    }

    render() {
        return (
            <Carousel
                ref={c => this._carousel = c}
                data={this.props.items}
                renderItem={this._renderItem}
                sliderWidth={viewportWidth}
                itemWidth={viewportWidth - 40}
                hasParallaxImages={false}
                inactiveSlideScale={0.92}
                inactiveSlideOpacity={0.8}
                // inactiveSlideShift={20}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                loopClonesPerSide={2}
                onSnapToItem={(index) => this._onItemChange(index)}
            />
        )
    }
}

const styles = StyleSheet.create({
    slider: {
        marginTop: 15,
        overflow: 'visible', // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    slideDropShadow: {
        width: viewportWidth - 40,
        borderRadius: 2,
        backgroundColor: "#fff",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.24,
        shadowRadius: 2,
    },
    slide: {
        padding: 20,
        height: 200,
        backgroundColor: '#fff'
    },
    button: {
        backgroundColor: '#fff',
        position: 'absolute',
        right: 0
    },
    buttonText: {
        color: '#2BB267'

    },
    time: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    priceWrapper: {
        backgroundColor: '#2BB267',
        height: 70,
        width: 70,
        padding: 10,
        borderRadius: 35,
        position: 'absolute',
        right: 0,
        justifyContent: 'center'
    },
    price: {
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    carMake: {
        color: '#222',
    },
    carYear: {
        color: '#bbb'
    },
    inline: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
    }
})

TripCardCarousel.propTypes = {
    items: PropTypes.array.isRequired,
    onItemChange: PropTypes.func.isRequired,

}
export default TripCardCarousel;