import React, { Component } from 'react'
import { StyleSheet, View, Slider, ScrollView } from 'react-native'
import { Container, Text, Icon, Button, Form, Item, Body, Footer, Header, Left, Title, Right, Content } from 'native-base'
import { connect } from 'react-redux'
import moment, { Moment } from 'moment'
import { PlacesSearchField, RadioButtonField, DateTimePickerField, AnimalPickerField, LuggagePickerField, PickerFieldItem, RadioButtonFieldItem, PickerField, FooterButton } from '../../components'
import { Search } from '../../entities'
import { SearchService } from '../../services'
import { AppState } from '../../store';
import { AnyAction, Dispatch } from 'redux'
import { StackActions } from 'react-navigation'
import { ScreenNames } from '..'
import { UISelectors } from '../../selectors'

export interface TripSearchScreenProps {
    fetching: boolean
    back: () => void
    goToResults: () => void
}

export interface TripSearchScreenState {
    search: Search
    minDate: Date
    isLeaveAt: boolean
    isArriveBy: boolean
}

class TripSearchScreen extends Component<TripSearchScreenProps, TripSearchScreenState> {
    constructor(props: TripSearchScreenProps) {
        super(props)

        this.state = {
            search: {
                filters: {
                    leaveAt: '',
                    arriveBy: '',
                    source: null,
                    destination: null,
                    radiusThresh: 200,
                    seats: 1,
                    details: {
                        animals: 1,
                        luggages: 1,
                    },
                },
            },
            minDate: new Date(),
            isLeaveAt: true,
            isArriveBy: false,
        }
    }

    private updateDepartureDate = (date: Moment): void => {
        this.setState({
            ...this.state,
            search: {
                ...this.state.search,
                filters: {
                    ...this.state.search.filters,
                    leaveAt: date.format('YYYY-MM-DDTHH:mm:ss.sZ'),
                },
            },
        })
    }

    private updateArrivalDate = (date: Moment): void => {
        this.setState({
            ...this.state,
            search: {
                ...this.state.search,
                filters: {
                    ...this.state.search.filters,
                    arriveBy: date.format('YYYY-MM-DDTHH:mm:ss.sZ'),
                },
            },
        })
    }

    private updateFrom = (from: any, details: any): void => {
        this.setState({
            ...this.state,
            search: {
                ...this.state.search,
                filters: {
                    ...this.state.search.filters,
                    source: {
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        name: from.description,
                    },
                },
            },
        })

    }

    private updateTo = (to: any, details: any): void => {
        this.setState({
            ...this.state,
            search: {
                ...this.state.search,
                filters: {
                    ...this.state.search.filters,
                    destination: {
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        name: to.description,
                    },
                },
            },
        })
    }

    private updateRange = (value: number): void => {
        this.setState({
            ...this.state,
            search: {
                ...this.state.search,
                filters: {
                    ...this.state.search.filters,
                    radiusThresh: value,
                },
            },
        })
    }

    private updatePassenger = (value: number): void => {
        this.setState({
            ...this.state,
            search: {
                ...this.state.search,
                filters: {
                    ...this.state.search.filters,
                    seats: value,
                },
            },
        })
    }

    private updateLuggages = (value: number): void => {
        this.setState({
            ...this.state,
            search: {
                ...this.state.search,
                filters: {
                    ...this.state.search.filters,
                    details: {
                        ...this.state.search.filters.details,
                        luggages: value
                    }
                },
            },
        })
    }

    private updateAnimals = (value: number): void => {
        this.setState({
            ...this.state,
            search: {
                ...this.state.search,
                filters: {
                    ...this.state.search.filters,
                    details: {
                        ...this.state.search.filters.details,
                        animals: value
                    },
                },
            },
        })
    }

    private isAdvancedSearchButtonEnabled = (): boolean => {
        return this.state.search.filters.source
            && this.state.search.filters.destination
            && (this.state.search.filters.leaveAt || this.state.search.filters.arriveBy)
    }

    private onChangeRadioButton = (value: string) => {
        const filters: any = {}

        if (value === 'isLeaveAt') {
            filters.leaveAt = this.state.search.filters.arriveBy
            filters.arriveBy = ''
        } else {
            filters.arriveBy = this.state.search.filters.leaveAt
            filters.leaveAt = ''
        }

        this.setState({
            ...this.state,
            isLeaveAt: value === "isLeaveAt",
            isArriveBy: value === "isArriveBy",
            search: {
                ...this.state.search,
                filters: {
                    ...this.state.search.filters,
                    ...filters,
                },
            },
        })
    }

    private searchTrips = (): void => {
        if (this.state.isArriveBy) {
            this.state.search.filters.leaveAt = "0001-01-01T00:00:00Z"
        } else {
            this.state.search.filters.arriveBy = "0001-01-01T00:00:00Z"
        }

        SearchService.start(this.state.search)
            .then(() => {
                this.props.goToResults()
            })
            .catch((error: Error) => {
                console.log(`Failed to start search.`, error)
            })
    }

    private back = (): void => {
        this.props.back()
    }

    render() {
        const timeItems: RadioButtonFieldItem[] = [
            { name: "Leave At", value: "isLeaveAt" },
            { name: "Arrive By", value: "isArriveBy" }
        ]

        const seatsItems: PickerFieldItem[] = []
        for (let seats = 1; seats <= 8; seats++) {
            seatsItems.push({
                label: `${seats}`,
                value: seats,
            })
        }

        return (
            <Container>
                <Header noShadow>
                    <Left>
                        <Button transparent onPress={this.back}>
                            <Icon name="close" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Find a Trip</Title>
                    </Body>
                    <Right />
                </Header>
                <Content
                    scrollEnabled={false}
                    contentContainerStyle={styles.container}
                >
                    <Form style={styles.form}>
                        <Item style={styles.item}>
                            <PlacesSearchField
                                placeholder='From (Please Be Precise)'
                                onSearchResult={this.updateFrom}
                            />
                        </Item>
                        <Item style={styles.item}>
                            <PlacesSearchField
                                placeholder='To (Please Be Precise)'
                                onSearchResult={this.updateTo}
                            />
                        </Item>
                    </Form>
                    <ScrollView style={styles.details}>
                        <RadioButtonField
                            items={timeItems}
                            onChange={this.onChangeRadioButton}
                        />
                        <View style={styles.scrollView}>
                            <Item style={{ flex: 1 }}>
                                {
                                    this.state.isLeaveAt &&
                                    <DateTimePickerField
                                        style={{ flex: 1 }}
                                        initialValue={this.state.search.filters.leaveAt ? moment(this.state.search.filters.leaveAt) : undefined}
                                        placeholder='Leave At'
                                        required={true}
                                        onValueChange={(v) => this.updateDepartureDate(v)}
                                    />
                                }
                                {
                                    this.state.isArriveBy &&
                                    <DateTimePickerField
                                        style={{ flex: 1 }}
                                        initialValue={this.state.search.filters.arriveBy ? moment(this.state.search.filters.arriveBy) : undefined}
                                        placeholder='Arrive By'
                                        required={true}
                                        onValueChange={(v) => this.updateArrivalDate(v)}
                                    />
                                }
                            </Item>
                            <View style={styles.containerFilter}>
                                <Text style={styles.filterDescription}>Pickup range ({this.state.search.filters.radiusThresh} m)</Text>
                                <Slider
                                    style={{ width: '80%', alignSelf: 'center' }}
                                    value={this.state.search.filters.radiusThresh}
                                    onValueChange={value => this.updateRange(value)}
                                    step={100}
                                    minimumValue={0}
                                    minimumTrackTintColor={'#2BB267'}
                                    maximumValue={5000}
                                />
                            </View>
                            <View style={styles.containerFilter}>
                                <PickerField
                                    label="Number of Passengers"
                                    initialValue={seatsItems[0].value}
                                    items={seatsItems}
                                    required={true}
                                    onValueChange={(v) => this.updatePassenger(v)}
                                />
                            </View>
                            <AnimalPickerField
                                initialValue={this.state.search.filters.details.animals}
                                onValueChange={this.updateAnimals}
                            />
                            <LuggagePickerField
                                initialValue={this.state.search.filters.details.luggage}
                                onValueChange={this.updateLuggages}
                            />
                        </View>
                    </ScrollView>
                </Content>
                <Footer>
                    <Body>
                        <FooterButton
                            loading={this.props.fetching}
                            disabled={this.props.fetching || !this.isAdvancedSearchButtonEnabled()}
                            onPress={this.searchTrips}
                            text="Search"
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
    },
    form: {
        paddingBottom: 16,
        paddingRight: 16,
        backgroundColor: '#2bb267',
    },
    details: {
        flex: 1,
        margin: 16,
    },
    item: {
        borderBottomWidth: 0,
        marginBottom: 16,
    },
    submitForm: {
        color: '#fff',
        alignSelf: 'flex-end',
        fontSize: 18,
    },
    submitFormDisabled: {
        color: '#ddd',
        alignSelf: 'flex-end',
        fontSize: 18,
    },
    containerFilter: {
        padding: 20,
        height: 90,
    },
    filterDescription: {
        fontSize: 18,
        color: '#666',
        marginBottom: 10,
    },
    footer: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        bottom: 40,
        justifyContent: 'flex-end',
        paddingBottom: 0,
    },
    scrollView: {
        paddingBottom: 16
    },
})

const mapStateToProps = (state: AppState) => ({
    fetching: UISelectors.isFetching(state),
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    back: () => dispatch(StackActions.pop({})),
    goToResults: () => dispatch(StackActions.push({ routeName: ScreenNames.Trips.RESULTS })),
})

export default connect(mapStateToProps, mapDispatchToProps)(TripSearchScreen)