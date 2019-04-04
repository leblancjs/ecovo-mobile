import React, { Component } from 'react'
import { StyleProvider } from 'native-base'
import getTheme from '../astuvu-native/native-base-theme/components'
import commonColors from '../astuvu-native/native-base-theme/variables/commonColor'
import hoistNonReactStatic from 'hoist-non-react-statics'

export default function astuvu(Screen) {
    class AstuvuScreen extends Component {
        constructor(props) {
            super(props)
        }
    
        render() {
            return (
                <StyleProvider style={getTheme(commonColors)}>
                    <Screen {...this.props}/>
                </StyleProvider>
            )
        }
    }

    hoistNonReactStatic(AstuvuScreen, Screen)

    return AstuvuScreen
}