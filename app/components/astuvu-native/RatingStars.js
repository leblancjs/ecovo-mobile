import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Container } from 'native-base'
import { StyleSheet, Slider } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Rating, AirbnbRating } from 'react-native-ratings';

class RartingStars extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rating: props.rating ? props.rating : 0
        }
    }

    _onValueChange = value => {
        this.setState({
            rating: value
        })

        if (this.props.onValueChange) {
            this.props.onValueChange(value)
        }
    }

    render() {
        return (
            <Container>
                <AirbnbRating showRating={false} size={30} defaultRating={this.state.rating} onFinishRating={this._onValueChange}/>
            </Container>
        )
    }
}

const styles = StyleSheet.create({

})

RartingStars.propTypes = {
    onValueChange: PropTypes.func.isRequired,
    rating: PropTypes.number,
}
export default RartingStars;