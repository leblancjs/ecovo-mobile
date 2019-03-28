import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { AppWithNavigationState } from './AppNavigator'

class App extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Provider store={store}>
				<AppWithNavigationState />
			</Provider>
		)
	}
}

export default App
