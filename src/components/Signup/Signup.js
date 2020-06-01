import React, { Component } from 'react';
import firebase from 'firebase';

class Signup extends Component {
  state = {
    email: '',
    password: '',
    passwordRepeat: '',
    validationMessage: ''
  }

  db = firebase.firestore()

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

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(res => {
            this
              .db
              .collection('users')
              .doc(res.user.uid)
              .set({ email: res.user.email });
          })
          .catch(err => {
            this.setState({
              validationMessage: err.message
            });
          });
      })
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