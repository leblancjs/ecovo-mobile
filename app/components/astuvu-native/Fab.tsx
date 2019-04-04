import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Icon, Fab as NativeBaseFab} from 'native-base'

export interface FabProps {
    style?: object
    icon: string
    iconStyle?: 'Ionicons' | 'AntDesign' | 'Entypo' | 'EvilIcons' | 'Feather' | 'FontAwesome' | 'FontAwesome5' | 'Foundation' | 'MaterialCommunityIcons' | 'MaterialIcons' | 'Octicons' | 'SimpleLineIcons' | 'Zocial'
    position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
    onPress?: () => void
}

export const FabDefaultProps = {
    style: {},
    position: 'bottomRight',
    iconStyle: 'Ionicons',
}

class Fab extends Component<FabProps> {
    static defaultProps = FabDefaultProps

    constructor(props: FabProps) {
        super(props)
    }

    render() {
        return (
            <NativeBaseFab
                style={{ ...styles.fab, ...this.props.style}}
                position={this.props.position}
                onPress={this.props.onPress}
            >
                <Icon type={this.props.iconStyle || 'Ionicons'} name={this.props.icon} />
            </NativeBaseFab>
        )
    }
}

const styles = StyleSheet.create({
    fab: {
        backgroundColor: '#2BB267',
    },
})

export default Fab