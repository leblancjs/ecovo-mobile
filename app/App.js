import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import AppReducer from './reducers'
import { AppNavigatorMiddleware, AppWithNavigationState } from './AppNavigator'

const loggerMiddleware = createLogger()

const store = createStore(
	AppReducer,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware,
		AppNavigatorMiddleware
	)
)

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
