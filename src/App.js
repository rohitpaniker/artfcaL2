import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Auth/Login';
import Analytics from './components/Analytics'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initialState = {
  count: cookies.get('INVALID_TRIES') ? cookies.get('INVALID_TRIES') : 0
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'INC_TRIES':
      return {
        count: state.count + 1
      };
    case 'RESET_TRIES':
      return {
        count: 0
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path='/' component={Landing}/>
            <Route path="/login" component={Login}/>
            <Route path='/:countryId' component={Analytics}/>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
