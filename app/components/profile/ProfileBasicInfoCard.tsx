import React, { Component } from 'react'
import { Text, Card, CardItem, Body } from 'native-base'

export interface ProfileBasicInfoCardProps {
    dateOfBirth: string
    gender: string
    phoneNumber: string
}

class ProfileBasicInfoCard extends Component<ProfileBasicInfoCardProps> {
    constructor(props: ProfileBasicInfoCardProps) {
        super(props)
    }

    private calculateAge = (birthday: string): string | number => {
        if (!birthday) {
            return 'undeniably'
        }
        
        const date = new Date(birthday)
        const ageDifMs = Date.now() - date.getTime()
        const ageDate = new Date(ageDifMs)

        return Math.abs(ageDate.getUTCFullYear() - 1970)
    }

    render() {
        const { dateOfBirth, gender, phoneNumber } = this.props
        return (

            <Card>
                <CardItem header>
                    <Text>Basic Informations</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            Age : {this.calculateAge(dateOfBirth)} years old
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
        )
    }
}

export default ProfileBasicInfoCard