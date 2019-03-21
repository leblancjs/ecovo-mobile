import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Card, CardItem, Body, Icon, Content } from 'native-base';
import PreferencesForm from './PreferencesForm';
import PropTypes from 'prop-types'

class ProfileMoreAboutCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { firstName, preferences } = this.props;
        return (

            <Card>
                <CardItem header>
                    <Text>More about {firstName}</Text>
                </CardItem>
                <CardItem>
                    <Body style={styles.sliderContainer}>
                        <Text>Some elements to take under consideration before riding with {firstName}.</Text>
                        <Content style={styles.slider}>
                            <PreferencesForm disabled={true} preferences={preferences}></PreferencesForm>
                        </Content>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    slider: {
        flex: 1,
        width: '100%'
    }
});

ProfileMoreAboutCard.propTypes = {
    firstName: PropTypes.string,
    preferences: PropTypes.object
}
export default ProfileMoreAboutCard