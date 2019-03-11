import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Content, Button } from 'native-base'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class TripCardCarousel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: props.items
        }
    }

    _renderItem({ item, index }) {
        return (
            <View style={styles.slideDropShadow}>
                <View style={styles.slide}>
                    <Content>
                    <Text style={styles.time}>{item.time}</Text>
                    <Text style={styles.time}>{item.price}</Text>

                    </Content>
                    <Text style={styles.time}>{item.departure.toString()}</Text>
                    <Text style={styles.time}>{item.arrival.toString()}</Text>
                    <Text style={styles.time}>{item.stops} stop(s)</Text>
                    <Content>
                        <Text style={styles.time}>{item.car.make && item.car.make || ""}</Text>
                        <Text style={styles.time}>{item.car.model && item.car.model || ""}</Text>
                        <Text style={styles.time}>{item.car.year && item.car.year || ""}</Text>
                    </Content>
                    <Button><Text>MORE</Text></Button>
                </View>
            </View>
        );
    }

    render() {
        return (
            <Carousel
                ref={c => this._carousel = c}
                data={this.state.items}
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
})

TripCardCarousel.propTypes = {
    items: PropTypes.array.isRequired,
}
export default TripCardCarousel;