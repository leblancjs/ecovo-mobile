import React, { Component } from 'react'
import { Container, Tab, Tabs } from 'native-base'
import { connect } from 'react-redux';
import { withStatusBar } from '../../hoc';
import TripDetails from './TripDetails'
import ProfileComponent from '../../profile/ProfileComponent'

class DetailsTripTabScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return null;
    }

    constructor(props) {
        super(props);
        this.state = {
            user: props.auth.user,
        };
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.auth.user,
        });
    }

    _fabClickHandle = () => {
        console.log("Fab clicked")
    }

    render() {
        return (
            <Container>
                <Tabs tabBarUnderlineStyle={{ backgroundColor: '#fff', height: 2 }} locked={true}>
                    <Tab heading="TRIP"
                        tabStyle={{ backgroundColor: '#2bb267' }}
                        textStyle={{ color: '#fff' }}
                        activeTabStyle={{ backgroundColor: '#2bb267' }}
                        activeTextStyle={{ color: '#fff' }}>
                        <TripDetails {...this.props} />
                    </Tab>
                    <Tab heading="DRIVERS"
                        tabStyle={{ backgroundColor: '#2bb267' }}
                        textStyle={{ color: '#fff' }}
                        activeTabStyle={{ backgroundColor: '#2bb267' }}
                        activeTextStyle={{ color: '#fff' }}>
                        <ProfileComponent {...this.props} user={this.state.user} onFabTapped={this._fabClickHandle} fabType="message"/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({

});

export default withStatusBar(connect(mapStateToProps, mapDispatchToProps)(DetailsTripTabScreen));