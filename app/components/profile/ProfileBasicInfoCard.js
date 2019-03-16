import React, { Component } from 'react';
import { Text, Card, CardItem, Body } from 'native-base';
import PropTypes from 'prop-types';

class ProfileBasicInfoCard extends Component {

    constructor(props) {
        super(props);
    }

    _calculateAge = (birthday) => {
        if (birthday != "") {
            birthday = new Date(birthday);
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

    }

    render() {
        const { dateOfBirth, gender, phoneNumber } = this.props;
        return (

            <Card>
                <CardItem header>
                    <Text>Basic Informations</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            Age : {this._calculateAge(dateOfBirth)} years old
                                </Text>
                        <Text>
                            Gender : {gender}
                        </Text>
                        <Text>
                            Phone : {phoneNumber}
                        </Text>
                    </Body>
                </CardItem>
            </Card>

        );
    }
}

ProfileBasicInfoCard.propTypes = {
    dateOfBirth: PropTypes.string,
    gender: PropTypes.string,
    phoneNumber: PropTypes.string
}
export default ProfileBasicInfoCard