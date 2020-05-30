import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import LoginPage from './pages/LoginPage';
import MyPentryPage from './pages/MyPentryPage';

const history = createBrowserHistory();

export const PANTRY_API = process.env.REACT_APP_PANTRY_API;
export const ENCRYPT_KEY = process.env.REACT_APP_ENCRYPT_KEY;

class App extends Component {
  render() {
    return (
      <BrowserRouter history={history} basename={process.env.PUBLIC_URL + '/'}>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/my" component={MyPentryPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
