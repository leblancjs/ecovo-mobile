import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppReducer from './reducers';
import WelcomeScreen from './components/welcome/WelcomeScreen';

const store = createStore(AppReducer, {});

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Provider store={store}>
        <WelcomeScreen />
      </Provider>
    );
  }
}

export default App;
