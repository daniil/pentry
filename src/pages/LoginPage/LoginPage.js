import React, { Component } from 'react';
import Login from '../../components/Login';
import Signup from '../../components/Signup';

class LoginPage extends Component {
  componentDidMount() {
    this.checkUserLoggedIn();
  }

  handleLogin = () => {
    this.checkUserLoggedIn();
  }

  checkUserLoggedIn = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      this.props.history.push('/my-pentry');
    }
  }
  
  render() {
    return (
      <>
        <Login handleLogin={this.handleLogin} />
        - or -
        <Signup />
      </>
    )
  }
}

export default LoginPage;