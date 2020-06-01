import React, { Component } from 'react';
import firebase from 'firebase/app';

class Login extends Component {
  state = {
    email: '',
    password: '',
    validationMessage: ''
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .catch(err => this.setState({
            validationMessage: err.message
          }));
      });
  }

  render() {
    return (
      <form>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={this.handleInputChange}
          value={this.state.email} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.handleInputChange}
          value={this.state.password} />
        <button onClick={this.handleSubmit}>Login</button>
        <p>{this.state.validationMessage}</p>
      </form>
    )
  }
}

export default Login;