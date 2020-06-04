import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import firebase from 'firebase/app';
import Inks from '../../components/Inks';
import Pens from '../../components/Pens';
import InkPen from '../../components/InkPen';
import InkedPens from '../../components/InkedPens';
import { firebaseFromDate, firebaseTimestamp } from '../../utils/formatDate';

class MyPentryPage extends Component {
  state = {
    user: null,
    inks: [],
    pens: [],
    inkedPens: [],
    inkPen: null
  }

  db = firebase.firestore()

  componentDidMount() {
    this.firebaseListener = firebase.auth().onAuthStateChanged(user => {
      user
        ? this.initUserPentry(user)
        : this.props.history.push('/');
    });
  }

  componentWillUnmount() {
    this.firebaseListener && this.firebaseListener();
    this.firebaseListener = null;
    this.snapshotListeners && this.snapshotListeners.map(listener => listener());
    this.snapshotListeners = null;
  }

  initUserPentry = user => {
    this.setState({ user }, () => {
      this.snapshotListeners = ['inks', 'pens', 'inkedPens']
        .map(stateKey => {
          return this
            .db
            .collection('users')
            .doc(this.state.user.uid)
            .collection(stateKey)
            .onSnapshot(snapshot => {
              const snapshotArr = [];
              snapshot.forEach(doc => snapshotArr.push({
                id: doc.id,
                ...doc.data()
              }))
              this.setState({
                [stateKey]: snapshotArr
              });
            });
        });
    });
  }

  handleLogout = () => {
    firebase.auth().signOut();
  }

  handleInkSubmit = (inkData, isUpdate) => {
    const inksCollection = this.db.collection('users').doc(this.state.user.uid).collection('inks');

    if (isUpdate) {
      inksCollection
        .doc(inkData.id)
        .update({
          ...inkData,
          dateAcquired: firebaseFromDate(inkData.dateAcquired),
          updatedTimestamp: firebaseTimestamp()
        });
    } else {
      inksCollection
        .add({
          ...inkData,
          dateAcquired: firebaseFromDate(inkData.dateAcquired),
          addedTimestamp: firebaseTimestamp()
        });
    }
  }

  handlePenSubmit = penData => {
    this
      .db
      .collection('users')
      .doc(this.state.user.uid)
      .collection('pens')
      .add({
        ...penData,
        dateAcquired: firebase.firestore.Timestamp.fromDate(new Date(penData.dateAcquired)),
        addedTimestamp: firebaseTimestamp()
      });
  }

  handlePenInking = pen => {
    this.setState({ inkPen: pen });
  }

  handleInkChoice = (penId, inkId) => {
    this
      .db
      .collection('users')
      .doc(this.state.user.uid)
      .collection('inkedPens')
      .add({
        penId,
        inkId,
        dateInked: firebaseTimestamp(),
        isActive: true 
      })
      .then(() => this.setState({ inkPen: null }));
  }

  handlePenCleaning = pen => {
    this
      .db
      .collection('users')
      .doc(this.state.user.uid)
      .collection('inkedPens')
      .doc(pen.id)
      .update({
        isActive: false,
        dateCleaned: firebaseTimestamp()
      });
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
                handleEditInk={this.handleEditInk}
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
            inkedPens={this.state.inkedPens}
            handleInkChoice={this.handleInkChoice} />}
      </>
    )
  }
}

export default MyPentryPage;