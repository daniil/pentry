import React, { Component } from 'react';
import firebaseStore from '../../utils/firebaseStore';

class Signup extends Component {
  state = {
    email: '',
    password: '',
    passwordRepeat: '',
    validationMessage: ''
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      validationMessage: ''
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.password !== this.state.passwordRepeat) {
      this.setState({
        validationMessage: 'Your passwords do not match'
      });
      return;
    }

    firebaseStore
      .signupUser(this.state)
      .catch(err => {
        this.setState({
          validationMessage: err.message
        });
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
        <input
          type="password"
          name="passwordRepeat"
          placeholder="Repeat Password"
          onChange={this.handleInputChange}
          value={this.state.passwordRepeat} />
        <button onClick={this.handleSubmit}>Signup</button>
        <p>{this.state.validationMessage}</p>
      </form>
    )
  }
}

export default Signup;