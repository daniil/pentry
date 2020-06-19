import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SectionNav from '../../components/SectionNav';
import PentryPageRoutes from '../../routes/PentryPageRoutes';
import InkPen from '../../components/InkPen';
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

  getHandlers = () => {
    return Object.entries(this).filter(objArr => {
      return typeof objArr[1] === 'function' && objArr[0].includes('handle');
    }).reduce((acc, val) => ({ ...acc, [val[0]]: val[1] }), {});
  }

  render() {
    const { path } = this.props.match;

    if (!this.state.user) return null;
    return (
      <main>
        <p>
          Welcome,&nbsp;
          <strong>{this.state.user.email}</strong>&nbsp;
          (<Link to="/" onClick={this.handleLogout}>logout</Link>)
        </p>
        <SectionNav path={path} />
        <PentryPageRoutes
          path={path}
          parentState={this.state}
          handlers={this.getHandlers()} />
        {this.state.inkPen &&
          <InkPen
            pen={this.state.inkPen}
            inks={this.state.inks}
            inkedPens={this.state.inkedPens}
            handleInkChoice={this.handleInkChoice} />}
      </main>
    )
  }
}

export default MyPentryPage;