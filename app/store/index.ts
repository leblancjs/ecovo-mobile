import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { authReducer } from './auth'
import { entitiesReducer } from './entities'
import { uiReducer } from './ui'
import { navigationReducer } from './navigation'
import { AppNavigatorMiddleware } from '../AppNavigator'

const rootReducer = combineReducers({
	auth: authReducer,
	entities: entitiesReducer,
	ui: uiReducer,
	navigation: navigationReducer,
})

export type AppState = ReturnType<typeof rootReducer>

const loggerMiddleware = createLogger()

const store = createStore(
	rootReducer,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware,
		AppNavigatorMiddleware
	)
)

export default store

export * from './auth'
export * from './entities'
export * from './navigation'
export * from './ui'