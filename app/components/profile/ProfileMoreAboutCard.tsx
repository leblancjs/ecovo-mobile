import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Card, CardItem, Body } from 'native-base'
import PreferencesDetails from './PreferencesDetails'
import { Preferences } from '../../entities'

export interface ProfileMoreAboutCardProps {
    firstName: string
    preferences?: Preferences
}

class ProfileMoreAboutCard extends Component<ProfileMoreAboutCardProps> {
    constructor(props: ProfileMoreAboutCardProps) {
        super(props)
    }

    render() {
        const { firstName, preferences } = this.props

        return (
            <Card>
                <CardItem header>
                    <Text>More about {firstName}</Text>
                </CardItem>
                <CardItem>
                    <Body style={styles.sliderContainer}>
                        <Text>Some elements to consider before riding with {firstName}.</Text>
                        <View style={styles.slider}>
                            {
                                this.props.preferences ?
                                    <PreferencesDetails preferences={preferences} /> :
                                    <Text>They don't like anything.</Text>
                            }
                        </View>
                    </Body>
                </CardItem>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    slider: {
        flex: 1,
        width: '100%',
    },
})

export default ProfileMoreAboutCard