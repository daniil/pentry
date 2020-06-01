import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import LoginPage from './pages/LoginPage';
import MyPentryPage from './pages/MyPentryPage';
import firebaseConfig from './firebaseConfig';

class App extends Component {
  constructor() {
    super();
    !firebase.apps.length && firebase.initializeApp(firebaseConfig);
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
