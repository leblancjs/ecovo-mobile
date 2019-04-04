import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon } from 'native-base'
import { Rating } from 'react-native-ratings'

export interface ProfileRatingProps {
    userRating: number
    driverRating: number
}

class ProfileRating extends Component<ProfileRatingProps> {
    constructor(props: ProfileRatingProps) {
        super(props)
    }

    render() {
        const { driverRating, userRating } = this.props

        return (
            <View style={styles.viewMasterStyle}>
                <View style={styles.viewChild}>
                    <Icon type="MaterialIcons" name="work" style={styles.icon}/>
                    <Rating
                        imageSize={20}
                        readonly
                        startingValue={userRating}
                    />
                </View>
                <View style={styles.viewChild}>
                    <Icon type="MaterialIcons" name="directions-car" style={styles.icon}/>
                    <Rating
                        imageSize={20}
                        readonly
                        startingValue={driverRating}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewMasterStyle: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
    },
    viewChild:{
        flex: 1,
        flexDirection: 'row',
    },
    icon: {
        paddingHorizontal: 10,
    },
})

export default ProfileRating