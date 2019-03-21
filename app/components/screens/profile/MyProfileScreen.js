import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProfileComponent from '../../profile/ProfileComponent'

class MyProfileScreen extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ProfileComponent user={this.props.user} onFabTapped={this.props.onFabTapped} fabType="edit"/>
        )
    }
}

MyProfileScreen.propTypes = {
    user: PropTypes.object.isRequired,
    onFabTapped: PropTypes.func.isRequired
}

export default MyProfileScreen
