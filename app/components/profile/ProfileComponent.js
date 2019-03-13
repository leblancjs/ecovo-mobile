import React, { Component } from 'react';
import {  View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
import ProfileHeaderComponent from './ProfileHeaderComponent'
import ProfileBasicInfoCard from './ProfileBasicInfoCard'
import ProfileMoreAboutCard from './ProfileMoreAboutCard'
import ProfileDescriptionCard from './ProfileDescriptionCard'
import ProfileFab from './ProfileFab'
import ProfileRating from './ProfileRating'

class ProfileComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            photo: props.user? props.user.photo : '',
            firstName: props.user ? props.user.firstName : '',
            lastName: props.user ? props.user.lastName : '',
            dateOfBirth: props.user ? props.user.dateOfBirth : '',
            gender: props.user ? props.user.gender : '',
            phoneNumber: props.user ? props.user.phoneNumber: '',
            description : props.user ? props.user.description : '',
            driverRating: props.user ? props.user.driverRating : 0,
            userRating: props.user ? props.user.userRating : 0,
            preferences: {
                music: props.user.preferences ? props.user.preferences.music : 0,
                smoking: props.user.preferences ? props.user.preferences.smoking : 0,
                conversation: props.user.preferences ? props.user.preferences.conversation : 0
            }

        }
    }

    render() {
        const {photo, firstName, lastName, dateOfBirth, gender, phoneNumber, preferences, description} = this.state;
        return (
            <Container>
                <ScrollView>
                    <ProfileHeaderComponent photo={photo} firstName={firstName} lastName={lastName} />
                    <ProfileRating userRating={userRating} driverRating={driverRating}/>
                    <ProfileBasicInfoCard dateOfBirth={dateOfBirth} gender={gender} phoneNumber={phoneNumber}/>
                    <ProfileMoreAboutCard firstName={firstName} preferences={preferences} />
                    <ProfileDescriptionCard description={description} />
                </ScrollView>
                <ProfileFab fabName={this.props.fabType} onFabTapped={this.props.onFabTapped}/>
            </Container>
        );
    }
}

ProfileComponent.propTypes = {
    user: PropTypes.object,
    onFabTapped: PropTypes.func.isRequired,
    fabType: PropTypes.string.isRequired
}
export default ProfileComponent