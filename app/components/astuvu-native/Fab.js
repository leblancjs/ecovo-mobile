import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {Icon, Fab as NativeFab} from 'native-base'
import PropTypes from 'prop-types'

class Fab extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <NativeFab
                style={{ ...styles.fab, ...this.props.style}}
                position={this.props.position}
                onPress={this.props.onPress}
            >
                <Icon type={this.props.iconStyle} name={this.props.icon} />
            </NativeFab>
        )
    }
}

const styles = StyleSheet.create({
    fab: {
        backgroundColor: "#2BB267"
    }
})

Fab.propTypes = {
    style: PropTypes.object,
    icon: PropTypes.string.isRequired,
    iconStyle: PropTypes.string,
    position: PropTypes.string,
    onPress: PropTypes.func.isRequired,

}

Fab.defaultProps = {
    style: {},
    position: "bottomRight",
    iconStyle: "Ionicons"
}

export default Fab