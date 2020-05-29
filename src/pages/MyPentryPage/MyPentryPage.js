import React, { Component } from 'react';

class MyPentryPage extends Component {
  componentDidMount() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>Pentry Page</div>
    )
  }
}

export default MyPentryPage;