import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch, AnyAction } from 'redux'
import { Container, Header, Content, Left, Right, Body, Title, Button, Icon, Footer } from 'native-base'
import { StackActions } from 'react-navigation'
import { VehicleService } from '../../services'
import { UISelectors, UserSelectors } from '../../selectors'
import { VehicleForm, FooterButton } from '../../components'
import { AppState } from '../../store'
import { Vehicle, User } from '../../entities'

export interface CreateVehicleScreenProps {
    user: User
    fetching: boolean
    goToProfile: () => void
}

export interface CreateVehicleScreenState {
    vehicle: Vehicle
    error: string | null
}

class CreateVehicleScreen extends Component<CreateVehicleScreenProps, CreateVehicleScreenState> {
    constructor(props: CreateVehicleScreenProps) {
        super(props)

        this.state = {
            vehicle: {
                userId: props.user.id || '',
                make: '',
                model: '',
                year: (new Date()).getFullYear(),
                color: 'Black',
                seats: 1,
            },
            error: null,
        }
    }

    private onFieldChange = (field: string, value: any, error: string | null) => {
        this.setState({
            ...this.state,
            vehicle: {
                ...this.state.vehicle,
                [field]: value,
            },
            error,
        })
    }

    private createVehicle = () => {
        VehicleService.create(this.state.vehicle)
            .then(() => this.props.goToProfile())
            .catch(err => console.log(err))
    }

    private back = () => {
        this.props.goToProfile()
    }

    render() {
        const buttonDisabled: boolean = (
            !this.state.vehicle.make ||
            !this.state.vehicle.model ||
            !this.state.vehicle.year ||
            !this.state.vehicle.color
        )

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.back}>
                            <Icon name="close"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Add Vehicle</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content
                    scrollEnabled={false}
                    contentContainerStyle={styles.container}
                >
                    <ScrollView style={styles.form}>
                        <VehicleForm vehicle={this.state.vehicle} onFieldChange={this.onFieldChange} />
                    </ScrollView>
                </Content>
                <Footer>
                    <Body>
                        <FooterButton
                            text='Add'
                            disabled={buttonDisabled}
                            loading={this.props.fetching}
                            formError={!!this.state.error}
                            onPress={this.createVehicle}
                        />
                    </Body>
                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
    },
    form: {
        flex: 1,
    },
})

const mapStateToProps = (state: AppState) => ({
    user: UserSelectors.getUserConnected(state),
    fetching: UISelectors.isFetching(state),
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    goToProfile: () => dispatch(StackActions.pop({})),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateVehicleScreen)
