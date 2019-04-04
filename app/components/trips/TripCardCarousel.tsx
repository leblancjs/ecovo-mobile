import React, { Component } from 'react'
import { Button } from 'native-base'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import moment from "moment"
import { Trip } from '../../entities'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

export interface TripCardCarouselProps {
    items: Trip[]
    onItemChange: (index: number) => void,
    onItemMorePressed: (tripId: string) => void
}

export const TripCardCarouselDefaultProps = {
    items: [],
    onItemChange: undefined,
    onItemMorePressed: undefined,
}

class TripCardCarousel extends Component<TripCardCarouselProps> {
    static defaultProps = TripCardCarouselDefaultProps

    constructor(props: TripCardCarouselProps) {
        super(props)
    }

    private onItemChange = (index: number) => {
        if (this.props.onItemChange) { 
            this.props.onItemChange(index)
        }
    }

    private onItemMorePressed = (tripId: string) => {
        if (this.props.onItemMorePressed) {
            this.props.onItemMorePressed(tripId)
        }
    }

    private renderItem = (item: { item: Trip, index: number }) => {
        const content = {
            ...item.item,
            stops: item.item.stops.length,
            duration: Date.parse(item.item.arriveBy) - Date.parse(item.item.leaveAt),
        }

        return (
            <View style={styles.slideDropShadow}>
                <View style={styles.slide}>
                    <View style={styles.inline}>
                        <Text style={styles.time}>{Math.floor(moment.duration(content.duration).asHours()) + moment.utc(content.duration).format(":mm:ss")}</Text>
                        <View style={styles.priceWrapper}>
                            <Text style={styles.price}>{content.pricePerSeat}$</Text>
                        </View>
                    </View>
                    <Text>Leave At: {moment(content.leaveAt).format("ddd, MMM Do [at] h:hh A")}</Text>
                    <Text>Arrive By: {moment(content.arriveBy).format("ddd, MMM Do [at] h:hh A")}</Text>
                    <Text>{content.stops} stop(s)</Text>
                    <View style={styles.inline}>
                        <View style={styles.inline}>
                            <Text style={styles.carMake}>{content.vehicle.make} {content.vehicle.model}</Text>
                            <Text style={styles.carYear}> {content.vehicle.year}</Text>
                        </View>
                        <Button style={styles.button} onPress={() => this.onItemMorePressed(content.id || '')}><Text style={styles.buttonText}>MORE</Text></Button>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <Carousel
                data={this.props.items}
                renderItem={this.renderItem}
                sliderWidth={viewportWidth}
                itemWidth={viewportWidth - 40}
                hasParallaxImages={false}
                inactiveSlideScale={0.92}
                inactiveSlideOpacity={0.8}
                // inactiveSlideShift={20}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                loopClonesPerSide={2}
                onSnapToItem={(index) => this.onItemChange(index)}
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
        paddingVertical: 10, // for custom animation
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
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#fff',
        position: 'absolute',
        right: 0,
    },
    buttonText: {
        color: '#2BB267',
    },
    time: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    priceWrapper: {
        backgroundColor: '#2BB267',
        height: 70,
        width: 70,
        padding: 10,
        borderRadius: 35,
        position: 'absolute',
        right: 0,
        justifyContent: 'center',
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
        color: '#bbb',
    },
    inline: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
})

export default TripCardCarousel