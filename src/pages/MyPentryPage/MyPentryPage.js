import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route, Link } from 'react-router-dom';
import Inks from '../../components/Inks';
import { PANTRY_API } from '../../App';

class MyPentryPage extends Component {
  state = {
    user: JSON.parse(localStorage.getItem('loggedInUser')),
    inks: [],
    pens: []
  }

  componentDidMount() {
    if (this.state.user) {
      axios
        .get(`${PANTRY_API}/basket/${this.state.user.username}`)
        .then(res => this.setState({
          inks: res.data.inks,
          pens: res.data.pens
        }));
    } else {
      this.props.history.push('/');
    }
  }

  handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    this.props.history.push('/');
  }

  render() {
    const { path } = this.props.match;

    if (!this.state.user) return null;

    return (
      <>
        <p>
          Welcome,&nbsp;
          <strong>{this.state.user.username}</strong>&nbsp;
          (<Link to="/" onClick={this.handleLogout}>logout</Link>)
          </p>
        <Link to={`${path}`}>
          <h1>Pentry</h1>
        </Link>
        <ul>
          <li>
            <Link to={`${path}/inks`}>Inks</Link>
          </li>
        </ul>
        <Switch>
          <Route path={`${path}/inks`} render={routerProps => {
            return <Inks inks={this.state.inks} {...routerProps} />;
          }} />
        </Switch>
      </>
    )
  }
}

export default MyPentryPage;