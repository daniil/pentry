import React, { Component } from 'react';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { PANTRY_API } from '../../App';

class Signup extends Component {
  state = {
    username: '',
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

    axios
      .get(`${PANTRY_API}/basket/${this.state.username}`)
      .then(
        () => this.setState({
          validationMessage: 'This username already exists, please pick another'
        }),
        () => this.createUser()
      );
  }

  createUser = () => {
    bcrypt.hash(this.state.password, 10, (_, hashedPassword) => {
      axios
        .post(`${PANTRY_API}/basket/${this.state.username}`, {
          username: this.state.username,
          password: hashedPassword,
          inks: [],
          pens: [],
          inkedPens: []
        })
        .then(() => this.props.handleLogin(this.state.username));
    });
  }

  render() {
    return (
      <form>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={this.handleInputChange}
          value={this.state.username} />
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