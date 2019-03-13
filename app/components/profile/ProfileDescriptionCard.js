import React, { Component } from 'react';
import { Text, Card, CardItem, Body } from 'native-base';
import PropTypes from 'prop-types';

class ProfileDescriptionCard extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const { description } = this.props;
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
        );
    }
}

ProfileDescriptionCard.propTypes = {
    description: PropTypes.string
}
export default ProfileDescriptionCard