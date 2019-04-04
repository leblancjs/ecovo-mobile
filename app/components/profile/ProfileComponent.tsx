import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Fab } from '../astuvu-native'
import { User } from '../../entities'
import ProfileHeaderComponent from './ProfileHeaderComponent'
import ProfileBasicInfoCard from './ProfileBasicInfoCard'
import ProfileMoreAboutCard from './ProfileMoreAboutCard'
import ProfileDescriptionCard from './ProfileDescriptionCard'
import ProfileRating from './ProfileRating'

export interface ProfileComponentProps {
    user: User
    fabIcon: string
    onFabTapped: () => void
}

class ProfileComponent extends Component<ProfileComponentProps> {
    constructor(props: ProfileComponentProps) {
        super(props)
    }

    render() {
        const {
            photo,
            firstName,
            lastName,
            dateOfBirth,
            gender,
            phoneNumber,
            preferences,
            description,
            driverRating,
            userRating
        } = this.props.user
        
        return (
            <View style={styles.container}>
                <ProfileHeaderComponent photo={photo} firstName={firstName} lastName={lastName} />
                <ScrollView style={styles.margins}>
                    <ProfileRating userRating={userRating} driverRating={driverRating}/>
                    <ProfileBasicInfoCard dateOfBirth={(dateOfBirth as string)} gender={gender} phoneNumber={phoneNumber}/>
                    <ProfileMoreAboutCard firstName={firstName} preferences={preferences} />
                    <ProfileDescriptionCard description={description} />
                </ScrollView>
                <Fab icon={this.props.fabIcon} onPress={this.props.onFabTapped} iconStyle="MaterialIcons"/>
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

export default ProfileComponent