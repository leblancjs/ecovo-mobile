import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { StyleProvider, Root } from 'native-base'
import getTheme from './components/astuvu-native/native-base-theme/components'
import commonColors from './components/astuvu-native/native-base-theme/variables/commonColor'
import store from './store'
import { AppWithNavigationState } from './AppNavigator'
import { ErrorHandler } from './components'

export interface Props {}

class App extends Component {
	constructor(props: Props) {
		super(props)
	}

	render() {
		return (
			<Root>
				<Provider store={store}>
					<StyleProvider style={getTheme(commonColors)}>
						<ErrorHandler>
							<AppWithNavigationState />
						</ErrorHandler>
					</StyleProvider>
				</Provider>
			</Root>
		)
	}
}

export default App