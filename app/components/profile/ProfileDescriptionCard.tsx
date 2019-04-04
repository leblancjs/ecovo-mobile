import React, { Component } from 'react'
import { Text, Card, CardItem, Body } from 'native-base'

export interface ProfileDescriptionCardProps {
    description: string
}

class ProfileDescriptionCard extends Component<ProfileDescriptionCardProps> {
    constructor(props: ProfileDescriptionCardProps) {
        super(props)
    }

    render() {
        const { description } = this.props
        
        return (
            <Card>
                <CardItem header>
                    <Text>Description</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            {description == "" ? "No description" : description}
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        )
    }
}

export default ProfileDescriptionCard