import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route, Link } from 'react-router-dom';
import { nanoid } from 'nanoid'
import Inks from '../../components/Inks';
import Pens from '../../components/Pens';
import InkPen from '../../components/InkPen';
import { PANTRY_API } from '../../App';

class MyPentryPage extends Component {
  state = {
    user: JSON.parse(localStorage.getItem('loggedInUser')),
    inks: [],
    pens: [],
    inkedPens: [],
    inkPen: null
  }

  componentDidMount() {
    this.state.user
      ? this.refreshData()
      : this.props.history.push('/');
  }

  handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    this.props.history.push('/');
  }

  handleInkSubmit = inkData => {
    this.updateData({
      inks: [
        {
          id: nanoid(),
          dateAdded: Date.now(),
          ...inkData
        }
      ]
    });
  }

  handlePenSubmit = penData => {
    this.updateData({
      pens: [
        {
          id: nanoid(),
          dateAdded: Date.now(),
          ...penData
        }
      ]
    })
  }

  handlePenInking = pen => {
    this.setState({
      inkPen: pen
    });
  }

  handleInkChoice = (penId, inkId) => {
    this.updateData({
      inkedPens: [
        {
          id: nanoid(),
          dateAdded: Date.now(),
          penId,
          inkId,
          isActive: true
        }
      ]
    });
    this.setState({
      inkPen: null
    });
  }

  handlePenCleaning = pen => {
    this.updateData({
      inkedPens: [
        {
          ...pen,
          isActive: false
        }
      ]
    });
  }

  updateData = newData => {
    axios({
      url: `${PANTRY_API}/basket/${this.state.user.username}`,
      method: 'PUT',
      data: newData
    }).then(() => this.refreshData());
  }

  refreshData = () => {
    axios
      .get(`${PANTRY_API}/basket/${this.state.user.username}`)
      .then(res => this.setState({
        inks: res.data.inks,
        pens: res.data.pens,
        inkedPens: res.data.inkedPens
      }));
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
          <li>
            <Link to={`${path}/pens`}>Pens</Link>
          </li>
        </ul>
        <Switch>
          <Route path={`${path}/inks`} render={routerProps => {
            return (
              <Inks
                inks={this.state.inks}
                handleSubmit={this.handleInkSubmit}
                {...routerProps} />
            )
          }} />
          <Route path={`${path}/pens`} render={routerProps => {
            return (
              <Pens
                pens={this.state.pens}
                inkedPens={this.state.inkedPens}
                handleSubmit={this.handlePenSubmit}
                handlePenInking={this.handlePenInking}
                handlePenCleaning={this.handlePenCleaning}
                {...routerProps} />
            )
          }} />
        </Switch>
        {this.state.inkPen &&
          <InkPen
            pen={this.state.inkPen}
            inks={this.state.inks}
            handleInkChoice={this.handleInkChoice} />}
      </>
    )
  }
}

export default MyPentryPage;