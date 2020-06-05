import firebase from 'firebase/app';
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from '../firebaseConfig';
import { firebaseFromDate, firebaseTimestamp } from './formatDate';

let db;
let firebaseListener;
let snapshotListeners;

const init = () => {
  !firebase.apps.length && firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
}

const addAuthListener = () => {
  return new Promise((resolve, reject) => {
    firebaseListener = firebase.auth().onAuthStateChanged(user => {
      user ? resolve(user) : reject();
    });
  });
}

const removeAuthListener = () => {
  firebaseListener && firebaseListener();
  firebaseListener = null;
}

const addSnapshotListeners = (userId, cb) => {
  snapshotListeners = ['inks', 'pens', 'inkedPens']
    .map(stateKey => {
      return db
        .collection('users')
        .doc(userId)
        .collection(stateKey)
        .onSnapshot(snapshot => {
          const snapshotArr = [];
          snapshot.forEach(doc => snapshotArr.push({
            id: doc.id,
            ...doc.data()
          }));
          cb({ [stateKey]: snapshotArr });
        });
    });
}

const removeSnapshotListeners = () => {
  snapshotListeners && snapshotListeners.map(listener => listener());
  snapshotListeners = null;
}

const inksCollection = userId => {
  return db.collection('users').doc(userId).collection('inks');
}

const addInk = (userId, inkData) => {
  inksCollection(userId)
    .add({
      ...inkData,
      dateAcquired: firebaseFromDate(inkData.dateAcquired),
      addedTimestamp: firebaseTimestamp()
    });
}

const updateInk = (userId, inkData) => {
  inksCollection(userId)
    .doc(inkData.id)
    .update({
      ...inkData,
      dateAcquired: firebaseFromDate(inkData.dateAcquired),
      updatedTimestamp: firebaseTimestamp()
    });
}

const pensCollection = userId => {
  return db.collection('users').doc(userId).collection('pens');
}

const addPen = (userId, penData) => {
  pensCollection(userId)
    .add({
    ...penData,
    dateAcquired: firebaseFromDate(penData.dateAcquired),
    addedTimestamp: firebaseTimestamp()
  });
}

const inkedPensCollection = userId => {
  return db.collection('users').doc(userId).collection('inkedPens');
}

const inkPen = (userId, penId, inkId) => {
  return new Promise(resolve => {
    inkedPensCollection(userId)
      .add({
        penId,
        inkId,
        dateInked: firebaseTimestamp(),
        isActive: true 
      });
      resolve();
  });
}

const cleanPen = (userId, inkPenId) => {
  inkedPensCollection(userId)
    .doc(inkPenId)
    .update({
      isActive: false,
      dateCleaned: firebaseTimestamp()
    });
}

const logout = () => {
  firebase.auth().signOut();
}

export default {
  init,
  addAuthListener,
  removeAuthListener,
  addSnapshotListeners,
  removeSnapshotListeners,
  addInk,
  updateInk,
  addPen,
  inkPen,
  cleanPen,
  logout
}