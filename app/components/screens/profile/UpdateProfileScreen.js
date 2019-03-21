import React, { Component } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Container, Header, Content, Left, Right, Body, Title, Text, Button, Textarea, Item, Form, Icon, Thumbnail } from 'native-base'
import { NavigationActions, StackActions } from 'react-navigation'
import { connect } from 'react-redux'
import { astuvu } from '../../hoc'
import { updateUser } from '../../../actions/user'
import PhotoUpload from 'react-native-photo-upload'
import PersonalInfoForm from '../../profile/PersonalInfoForm'
import PreferencesForm from '../../profile/PreferencesForm'
import { ScreenNames } from '../'

class UpdateProfileScreen extends Component {
    constructor(props) {
        super(props)

        this.state = { user: { ...props.auth.user } }
    }

    _setPhoto = (photo) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                photo,
            }
        })
    }

    _updateUser = () => {
        this.props.updateUser(this.props.auth.credentials.accessToken, this.state.user)
            .then(() => this.props.goToProfile(this.state.user))
            .catch(error => {
                console.log(error)
                this.props.goToError()
            })
    }


    _onFieldChange = (field, value, preferences = false) => {
        if (preferences) {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user,
                    preferences: {
                        ...this.state.user.preferences,
                        [field]: value
                    }
                }
            })
        } else {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user,
                    [field]: value
                }
            })
        }
    }

    render() {
        let disableButton =
            this.state.user.firstName == '' ||
            this.state.user.lastName == '' ||
            this.state.user.dateOfBirth == undefined

        return (
            <Container>
                <Header noShadow>
                    <Left>
                        <Button transparent onPress={this.props.goToProfile}>
                            <Icon name="close"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Edit Profile</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content
                    scrollEnabled={false}
                    contentContainerStyle={styles.container}
                >
                    <ScrollView style={styles.formContainer}>
                        <View style={styles.photoContainer}>
                            <PhotoUpload
                                onPhotoSelect={photo => {
                                    if (photo) {
                                        this._setPhoto(photo)
                                    }
                                }}
                            >
                                {this.state.user.photo === '' ?
                                    <Thumbnail large
                                        style={styles.imagePicker}
                                        source={require('../../../../assets/profile_pic.png')}
                                    /> :
                                    <Thumbnail large
                                        style={styles.imagePicker}
                                        source={{ uri: this.state.user.photo }}
                                    />
                                }
                            </PhotoUpload>
                        </View>
                        <PersonalInfoForm user={this.props.auth.user} onFieldChange={this._onFieldChange} />
                        <PreferencesForm preferences={this.props.auth.user.preferences} onFieldChange={(field, value) => this._onFieldChange(field, value, true)} />
                        <Form style={styles.form}>
                            <Item style={styles.item}>
                                <Textarea bordered style={styles.textArea}
                                    rowSpan={5}
                                    placeholder="Description"
                                    onChangeText={value => this._onFieldChange('description', value)}
                                    value={this.state.user.description}
                                />
                            </Item>
                        </Form>
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <Button block
                            disabled={disableButton || this.props.auth.isSubmitting}
                            onPress={this._updateUser}
                        >
                            <Text style={styles.textWhite}>Update</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}
const inputStyle = {
    backgroundColor: '#E8E8E8',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
    paddingLeft: 16,
    height: 58
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    formContainer: {
        flex: 1
    },
    photoContainer: {
        height: 80,
        margin: 16
    },
    imagePicker: {
        marginTop: 20,
        paddingVertical: 30
    },
    buttonContainer: {
        padding: 16
    },
    textWhite: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
    },
    textArea: {
        ...inputStyle,
        width: '100%',
    },
    item: {
        borderBottomWidth: 0,
        marginBottom: 16
    },
    form: {
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 16
    },
})

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    updateUser: (accessToken, user) => dispatch(updateUser(accessToken, user)),
    goToProfile: () => dispatch(StackActions.pop()),
    goToError: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Errors.HOME }))
})

export default astuvu(connect(mapStateToProps, mapDispatchToProps)(UpdateProfileScreen))
