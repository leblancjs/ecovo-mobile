import React, { Component } from 'react'
import { ProfileComponent } from '../../components'
import { User } from '../../entities'

export interface MyProfileScreenProps {
    user: User
    onFabTapped: () => void
}

class MyProfileScreen extends Component<MyProfileScreenProps> {
    constructor(props: MyProfileScreenProps) {
        super(props)
    }

    render() {
        return (
            <ProfileComponent user={this.props.user} onFabTapped={this.props.onFabTapped} fabIcon="edit"/>
        )
    }
}

export default MyProfileScreen
