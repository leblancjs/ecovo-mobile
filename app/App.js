import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import AppReducer from './reducers';
import { AppNavigatorMiddleware, AppWithNavigationState } from './AppNavigator';

const store = createStore(AppReducer, applyMiddleware(AppNavigatorMiddleware));

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;
