import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'native-base'
import { StyleSheet, Text, View } from 'react-native'
import Carousel from 'react-native-snap-carousel';

class TripCardCarousel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: props.items
        }
    }

    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{ item.title }</Text>
            </View>
        );
    }

    render() {
        return (
            <Container>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.items}
                    renderItem={this._renderItem}
                    sliderWidth={250}
                    itemWidth={200}
                />
            </Container>
        )
    }
}

const styles = StyleSheet.create({

})

TripCardCarousel.propTypes = {
    items: PropTypes.array.isRequired,
}
export default TripCardCarousel;