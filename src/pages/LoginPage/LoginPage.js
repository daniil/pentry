import React, { Component } from 'react';
import Login from '../../components/Login';
import Signup from '../../components/Signup';

class LoginPage extends Component {
  componentDidMount() {
    this.checkUserLoggedIn();
  }

  handleLogin = username => {
    localStorage.setItem('loggedInUser', JSON.stringify({
      username
    }));
    this.checkUserLoggedIn();
  }

  checkUserLoggedIn = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    loggedInUser && this.props.history.push('/my-pentry');
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