import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import AppReducer from '../reducers'
import { AppNavigatorMiddleware } from '../AppNavigator'

const loggerMiddleware = createLogger()

export default store = createStore(
	AppReducer,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware,
		AppNavigatorMiddleware
	)
)