import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native';
import { Icon } from 'native-base'
import { Rating } from 'react-native-ratings'

class ProfileRating extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { ratingDriver, ratingWork } = this.props
        return (
            <View style={styles.viewMasterStyle}>
                <View style={styles.viewChild}>
                    <Icon type="MaterialIcons" name="work" style={styles.icon}/>
                    <Rating
                        imageSize={20}
                        readonly
                        startingValue={ratingWork}
                    />
                </View>
                <View style={styles.viewChild}>
                    <Icon type="MaterialIcons" name="directions-car" style={styles.icon}/>
                    <Rating
                        imageSize={20}
                        readonly
                        startingValue={ratingDriver}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    viewMasterStyle: {
        flex: 1,
        flexDirection: 'row',
        width: '100%'
    },
    viewChild:{
        flex: 1,
        flexDirection: 'row'
    },
    icon: {
        paddingHorizontal: 10
    }
})

ProfileRating.propTypes = {
    ratingWork: PropTypes.number,
    ratingDriver: PropTypes.number
}

ProfileRating.defaultProps = {
    ratingWork: 0,
    ratingDriver: 0
}

export default ProfileRating