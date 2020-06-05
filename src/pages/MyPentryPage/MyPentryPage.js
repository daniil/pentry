import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Inks from '../../components/Inks';
import Pens from '../../components/Pens';
import InkPen from '../../components/InkPen';
import InkedPens from '../../components/InkedPens';
import firebaseStore from '../../utils/firebaseStore';

class MyPentryPage extends Component {
  state = {
    user: null,
    inks: [],
    pens: [],
    inkedPens: [],
    inkPen: null
  }

  componentDidMount() {
    firebaseStore.addAuthListener().then(
      this.initUserPentry,
      () => this.props.history.push('/')
    );
  }

  componentWillUnmount() {
    firebaseStore.removeAuthListener();
    firebaseStore.removeSnapshotListeners();
  }

  userId = () => this.state.user.uid

  initUserPentry = user => {
    this.setState(
      { user },
      () => firebaseStore.addSnapshotListeners(
        this.userId(),
        data => this.setState(data)
      )
    );
  }

  handleLogout = () => {
    firebaseStore.logout();
  }

  handleInkSubmit = (inkData, isUpdate) => {
    isUpdate
      ? firebaseStore.updateInk(this.userId(), inkData)
      : firebaseStore.addInk(this.userId(), inkData);
  }

  handleInkRemove = inkId => {
    firebaseStore.removeInk(this.userId(), inkId);
  }

  handlePenSubmit = (penData, isUpdate) => {
    isUpdate
      ? firebaseStore.updatePen(this.userId(), penData)
      : firebaseStore.addPen(this.userId(), penData);
  }

  handlePenRemove = penId => {
    firebaseStore.removePen(this.userId(), penId);
  }

  handlePenInking = pen => {
    this.setState({ inkPen: pen });
  }

  handleInkChoice = (penId, inkId) => {
    firebaseStore
      .inkPen(this.userId(), penId, inkId)
      .then(() => this.setState({ inkPen: null }));
  }

  handlePenCleaning = inkPen => {
    firebaseStore
      .cleanPen(this.userId(), inkPen.id);
  }

  render() {
    const { path } = this.props.match;

    if (!this.state.user) return null;

    return (
      <>
        <p>
          Welcome,&nbsp;
          <strong>{this.state.user.email}</strong>&nbsp;
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
          <Route path={`${path}`} exact render={routerProps => {
            return (
              <InkedPens
                inks={this.state.inks}
                pens={this.state.pens}
                inkedPens={this.state.inkedPens}
                {...routerProps} />
            )
          }} />
          <Route path={`${path}/inks`} render={routerProps => {
            return (
              <Inks
                inks={this.state.inks}
                handleSubmit={this.handleInkSubmit}
                handleRemove={this.handleInkRemove}
                {...routerProps} />
            )
          }} />
          <Route path={`${path}/pens`} render={routerProps => {
            return (
              <Pens
                pens={this.state.pens}
                inks={this.state.inks}
                inkedPens={this.state.inkedPens}
                handleSubmit={this.handlePenSubmit}
                handleRemove={this.handlePenRemove}
                handleInking={this.handlePenInking}
                handleCleaning={this.handlePenCleaning}
                {...routerProps} />
            )
          }} />
        </Switch>
        {this.state.inkPen &&
          <InkPen
            pen={this.state.inkPen}
            inks={this.state.inks}
            inkedPens={this.state.inkedPens}
            handleInkChoice={this.handleInkChoice} />}
      </>
    )
  }
}

export default MyPentryPage;