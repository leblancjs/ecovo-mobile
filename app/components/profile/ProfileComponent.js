import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import PropTypes from 'prop-types'
import ProfileHeaderComponent from './ProfileHeaderComponent'
import ProfileBasicInfoCard from './ProfileBasicInfoCard'
import ProfileMoreAboutCard from './ProfileMoreAboutCard'
import ProfileDescriptionCard from './ProfileDescriptionCard'
import ProfileFab from './ProfileFab'
import ProfileRating from './ProfileRating'

class ProfileComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: props.user || {}
        }
    }

    render() {
        const {photo, firstName, lastName, dateOfBirth, gender, phoneNumber, preferences, description, driverRating, userRating} = this.state.user
        
        return (
            <View style={styles.container}>
                <ProfileHeaderComponent photo={photo} firstName={firstName} lastName={lastName} />
                <ScrollView style={styles.margins}>
                    <ProfileRating userRating={userRating} driverRating={driverRating}/>
                    <ProfileBasicInfoCard dateOfBirth={dateOfBirth} gender={gender} phoneNumber={phoneNumber}/>
                    <ProfileMoreAboutCard firstName={firstName} preferences={preferences} />
                    <ProfileDescriptionCard description={description} />
                </ScrollView>
                <ProfileFab fabName={this.props.fabType} onFabTapped={this.props.onFabTapped}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    margins: {
        margin: 8
    }
})

ProfileComponent.propTypes = {
    user: PropTypes.object,
    onFabTapped: PropTypes.func.isRequired,
    fabType: PropTypes.string.isRequired
}
export default ProfileComponent