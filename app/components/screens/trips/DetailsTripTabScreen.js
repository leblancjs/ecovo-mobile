import React, { Component } from 'react'
import { Container, Tab, Tabs } from 'native-base'
import { connect } from 'react-redux';
import { withStatusBar } from '../../hoc';
import TripDetails from './TripDetails'

class DetailsTripTabScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return null;
    }

    componentWillMount() {
        
    }

    render() {
        return (
            <Container>
                <Tabs tabBarUnderlineStyle={{ backgroundColor: '#fff', height: 2 }}>
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
                        <TripDetails {...this.props} />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    
});

export default withStatusBar(connect(mapStateToProps, mapDispatchToProps)(DetailsTripTabScreen));