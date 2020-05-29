import React, { Component } from 'react';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { PANTRY_API } from '../../App';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    axios
      .get(`${PANTRY_API}/basket/${this.state.username}`)
      .then(res => {
        bcrypt.compare(this.state.password, res.data.password, (_, passwordMatch) => {
          if (passwordMatch) {
            this.props.handleLogin(res.data.username);
          } else {
            throw(new Error('Username and password dont match'));
          }
        });
      }, () => console.log('Please signup, user cant be found'))
      .catch(err => console.log(err));
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
        <button onClick={this.handleSubmit}>Login</button>
      </form>
    )
  }
}

export default Login;