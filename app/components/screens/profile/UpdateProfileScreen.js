import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, } from 'react-native';
import { Container, Button, Content, Textarea, Item, Form } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { updateUser } from '../../../actions/user';
import PhotoUpload from 'react-native-photo-upload';
import PersonalInfoForm from '../../profile/PersonalInfoForm';
import PreferencesForm from '../../profile/PreferencesForm';
import { ScreenNames } from '../'

class UpdateProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { user: { ...props.auth.user } };
    }
    _setPhoto = (photo) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                photo,
            }
        }
        );
    }

    _updateUser = () => {
        this.props.updateUser(this.props.auth.credentials.accessToken, this.state.user)
            .then(() => this.props.goToProfile())
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
        let picStyle;

        if (this.state.user.photo == '') {
            picStyle = styles.defaultImagePicker;
        } else {
            picStyle = styles.imagePicker;
        }
        return (
            <Container style={styles.container}>
                <Text style={styles.title}>Edit your profile</Text>
                <Content>
                    <PhotoUpload
                        onPhotoSelect={photo => {
                            if (photo) {
                                this._setPhoto(photo)
                            }
                        }}
                    >
                        {this.state.user.photo == '' &&
                            <Image
                                style={picStyle}
                                resizeMode='cover'
                                source={require('../../../../assets/profile_pic.png')}
                            />
                        }

                        {this.state.user.photo != '' &&
                            <Image
                                style={picStyle}
                                resizeMode='cover'
                                source={{ uri: this.props.auth.user.photo }}                            />
                        }
                    </PhotoUpload>
                    <PersonalInfoForm user={this.props.auth.user} onFieldChange={this._onFieldChange} />
                    <PreferencesForm preferences={this.props.auth.user.preferences} onFieldChange={(field, value) => this._onFieldChange(field, value, true)} />
                    <Form style={styles.form}>
                        <Item style={styles.item}>
                            <Textarea style={styles.textArea} rowSpan={5} bordered placeholder="Description" onChangeText={value => this._onFieldChange('description', value)} />
                        </Item>
                    </Form>

                </Content>
                <View style={styles.updateBtnWrapper}>
                    {this.state.user.firstName != ''
                        && this.state.user.lastName != ''
                        && this.state.user.dateOfBirth != undefined
                        &&
                        <Button transparent
                            onPress={this._updateUser} style={styles.updatebutton}>
                            <Text style={styles.textWhite}>Update</Text>
                        </Button>
                    }
                </View>
            </Container>
        );
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
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        textAlign: 'left',
        margin: 20,
    },
    text: {
        fontSize: 15,
        opacity: 1
    },
    textWhite: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
    },
    item: {
        margin: 15
    },
    updatebutton: {
        justifyContent: 'center',
        backgroundColor: "#2BB267",
        alignSelf: 'stretch',
        textAlign: 'center',
        padding: 10,
        marginBottom: 20,
    },
    updateBtnWrapper: {
        backgroundColor: "#2BB267",
    },
    profilePicIcon: {
        width: 70,
        height: 70,
        marginRight: 10
    },
    addPictureBtn: {
        margin: 10,
        height: 70
    },
    imagePicker: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#eee"
    },
    defaultImagePicker: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#eee"
    },
    sliderContainer: {
        alignContent: 'center',
        marginTop: 40
    },
    sliderHeader: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    slider: {
        flexDirection: 'row',
        width: '100%',
    },
    textGreen: {
        fontSize: 20,
        color: '#2BB267'
    },
    text: {
        justifyContent: 'center',
        fontSize: 15
    },
    sliderLegend: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 70,
        marginRight: 70
    },
    icon: {
        fontSize: 25,
        color: '#000000'
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
});

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    updateUser: (accessToken, user) => dispatch(updateUser(accessToken, user)),
    goToProfile: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Profile.HOME })),
    goToError: () => dispatch(NavigationActions.navigate({ routeName: ScreenNames.Errors.HOME }))

});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileScreen);
