import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MyPentryPage from './pages/MyPentryPage';
import firebaseStore from './utils/firebaseStore';

class App extends Component {
  constructor() {
    super();
    firebaseStore.init();
  }

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL + '/'}>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/my" component={MyPentryPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
