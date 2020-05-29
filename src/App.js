import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MyPentryPage from './pages/MyPentryPage';

export const PANTRY_API = process.env.REACT_APP_PANTRY_API;

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/my-pentry" component={MyPentryPage} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
