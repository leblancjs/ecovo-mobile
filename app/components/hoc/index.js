import React, { Component } from 'react'
import { StyleSheet, SafeAreaView, View, StatusBar } from 'react-native'
import hoistNonReactStatic from 'hoist-non-react-statics'

export function withSafeView(WrappedComponent) {
    class EnhancedComponent extends Component {
        constructor(props) {
            super(props)
        }

        render() {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.content}>
                        <WrappedComponent {...this.props}/>
                    </View>
                </SafeAreaView>
            )
        }
    }

    hoistNonReactStatic(EnhancedComponent, WrappedComponent)

    return EnhancedComponent
}

export function withStatusBar(WrappedComponent) {
    class EnhancedComponent extends Component {
        constructor(props) {
            super(props)
        }

        render() {
            return (
                <SafeAreaView style={styles.container}>
                    <StatusBar
                        barStyle='light-content'
                        backgroundColor={styles.statusBar.backgroundColor}
                    />
                    <View style={styles.content}>
                        <WrappedComponent {...this.props}/>
                    </View>
                </SafeAreaView>
            )
        }
    }

    hoistNonReactStatic(EnhancedComponent, WrappedComponent)

    return EnhancedComponent
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    content: {
        flex: 1,
        backgroundColor: '#fff'
    },
    statusBar: {
        backgroundColor: '#2bb267'
    }
})