import React, { Component } from 'react';
import { Fab, Icon } from 'native-base';
import PropTypes from 'prop-types';

class ProfileFab extends Component {
    
    constructor(props) {
        super(props);
    }
    
    _fabHandler = () => {
        if (this.props.onFabTapped) {
            this.props.onFabTapped();
        }
     }

    render() {
        const {fabName} = this.props
        return (
                <Fab direction="right" position="bottomRight"
                    style={{ backgroundColor: '#2BB267' }}
                    onPress={this._fabHandler}>
                    <Icon type="MaterialIcons" name={fabName} />
                </Fab>
        );
    }
}

ProfileFab.propTypes = {
    fabName: PropTypes.string.isRequired,
    onFabTapped: PropTypes.func.isRequired,
}
export default ProfileFab