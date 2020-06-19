import React, { Component } from 'react';
import firebase from 'firebase/app';
import Login from '../../components/Login';
import Signup from '../../components/Signup';

class LoginPage extends Component {
  componentDidMount() {
    this.firebaseListener = firebase.auth().onAuthStateChanged(user => {
      user
        ? this.props.history.push('/my')
        : this.props.history.push('/');
    });
  }

  componentWillUnmount() {
    this.firebaseListener && this.firebaseListener();
    this.firebaseListener = null;
  }

  render() {
    return (
      <main>
        <Login />
        - or -
        <Signup />
      </main>
    )
  }
}

export default LoginPage;