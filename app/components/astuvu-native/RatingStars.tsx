import React, { Component } from 'react'
import { View } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'

export interface RatingStarsProps {
    rating?: number
    onValueChange: (value: number) => void
}

export interface RatingStarsState {
    rating: number
}

export const RatingStarsDefaultProps = {
    rating: 0,
    onValueChange: undefined,
}

class RatingStars extends Component<RatingStarsProps, RatingStarsState> {
    static defaultProps = RatingStarsDefaultProps

    constructor(props: RatingStarsProps) {
        super(props)

        this.state = {
            rating: props.rating ? props.rating : 0
        }
    }

    private onValueChange = (value: number) => {
        this.setState({
            rating: value
        })

        if (this.props.onValueChange) {
            this.props.onValueChange(value)
        }
    }

    render() {
        return (
            <View>
                <AirbnbRating showRating={false} defaultRating={this.state.rating} onFinishRating={this.onValueChange} />
            </View>
        )
    }
}

export default RatingStars