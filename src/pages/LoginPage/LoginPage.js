import React, { Component } from 'react';
import Login from '../../components/Login';
import Signup from '../../components/Signup';
import { encryptUser } from '../../utils/userEncryption';

class LoginPage extends Component {
  componentDidMount() {
    this.checkUserLoggedIn();
  }

  handleLogin = username => {
    localStorage.setItem('pentry', JSON.stringify({
      token: encryptUser(username)
    }));
    this.checkUserLoggedIn();
  }

  checkUserLoggedIn = () => {
    const token = JSON.parse(localStorage.getItem('pentry'));
    token && this.props.history.push('/my');
  }

  handleSignup = () => {
    this.props.history.push('/')
  }
  
  render() {
    return (
      <>
        <Login handleLogin={this.handleLogin} />
        - or -
        <Signup handleLogin={this.handleLogin} />
      </>
    )
  }
}

export default LoginPage;