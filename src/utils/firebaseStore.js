import firebase from 'firebase/app';
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';
import firebaseConfig from '../firebaseConfig';
import { firebaseFromDate, firebaseTimestamp } from './formatDate';
import fieldDeps from './fieldDependencies';

let db;
let storage;
let firebaseListener;
let snapshotListeners;
let fieldDataListeners = {};

const init = () => {
  !firebase.apps.length && firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  storage  = firebase.storage().ref();
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

const handleSnapshot = (key, cb) => {
  return snapshot => {
    const snapshotArr = [];
    snapshot.forEach(doc => snapshotArr.push({
      id: doc.id,
      ...doc.data()
    }));
    cb({ [key]: snapshotArr });
  }
}

const addSnapshotListeners = (userId, cb) => {
  snapshotListeners = ['inks', 'pens', 'inkedPens']
    .map(stateKey => {
      return db
        .collection('users')
        .doc(userId)
        .collection(stateKey)
        .onSnapshot(handleSnapshot(stateKey, cb));
    });
}

const removeSnapshotListeners = () => {
  snapshotListeners && snapshotListeners.map(listener => listener());
  snapshotListeners = null;
}

const signupUser = userInfo => {
  return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password);
    })
    .then(res => {
      return db
        .collection('users')
        .doc(res.user.uid)
        .set({
          email: res.user.email,
          updatedTimestamp: firebaseTimestamp()
        });
    });
}

const loginUser = userInfo => {
  return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      return firebase
        .auth()
        .signInWithEmailAndPassword(userInfo.email, userInfo.password);
    });
}

const getUserDetails = (userId) => {
  return db
    .collection('users')
    .doc(userId)
    .get()
    .then(doc => doc.data());
}

const updateUserDetails = (userId, userDetails) => {
  return db
    .collection('users')
    .doc(userId)
    .update({
      ...userDetails,
      updatedTimestamp: firebaseTimestamp()
    });
}

const inksCollection = userId => {
  return db.collection('users').doc(userId).collection('inks');
}

const addInk = (userId, inkData) => {
  inksCollection(userId)
    .add({
      ...inkData,
      dateAcquired: firebaseFromDate(inkData.dateAcquired),
      addedTimestamp: firebaseTimestamp(),
      isActive: true
    });
  addFieldData('ink', inkData);
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

const removeInk = (userId, inkId) => {
  inksCollection(userId)
    .doc(inkId)
    .update({
      isActive: false,
      removedTimestamp: firebaseTimestamp()
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
    addedTimestamp: firebaseTimestamp(),
    isActive: true
  });
  addFieldData('pen', penData);
}

const updatePen = (userId, penData) => {
  pensCollection(userId)
    .doc(penData.id)
    .update({
      ...penData,
      dateAcquired: firebaseFromDate(penData.dateAcquired),
      updatedTimestamp: firebaseTimestamp()
    });
}

const removePen = (userId, penId) => {
  pensCollection(userId)
    .doc(penId)
    .update({
      isActive: false,
      removedTimestamp: firebaseTimestamp()
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

const getDependencyValue = dependency => {
  if (Array.isArray(dependency)) return dependency.join(' ');
  return dependency;
}

const addFieldDataListener = (field, dependency, cb) => {
  if (!dependency) {
    return fieldDataListeners[field] = db
      .collection(field)
      .onSnapshot(handleSnapshot(field, cb));
  }
  
  const depValue = getDependencyValue(dependency.value);

  if (depValue) {
    fieldDataListeners[field] = db
      .collection(field)
      .doc(depValue)
      .collection('values')
      .onSnapshot(handleSnapshot(field, cb));
  }
}

const removeFieldDataListener = field => {
  fieldDataListeners[field] && fieldDataListeners[field]();
  fieldDataListeners[field] = null;
  delete fieldDataListeners[field];
}

const storableField = item => {
  const [key, value] = item;
  const ignoredFields = {
    id: true,
    dateAcquired: true
  };
  return !ignoredFields[key] && value !== '';
}

const getDependencyDocId = (data, depKey) => {
  return Array.isArray(depKey)
    ? depKey.reduce((acc, val) => `${acc} ${data[val]}`, '').trim()
    : data[depKey];
}

const addFieldData = (type, data) => {
  Object.entries(data).forEach(item => {
    const [key, value] = item;

    if (storableField(item)) {
      const dependencyKey = fieldDeps[type][key];
      const field = `${type}:${key}`;
      const dependency = dependencyKey ? getDependencyDocId(data, dependencyKey) : null;

      addFieldDoc(field, value, dependency);
    }
  });
}

const addFieldDoc = (field, value, dependency) => {
  const fieldCollection = dependency
    ? db.collection(field).doc(dependency).collection('values')
    : db.collection(field);

  fieldCollection
    .where('value', '==', value)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.empty)
        fieldCollection.add({ value });
    });
}

const uploadImage = (path, fileName, file) => {
  const metadata = {
    'contentType': file.type
  };

  return storage
    .child(`${path}/${fileName}`)
    .put(file, metadata)
    .then(snapshot => {
      return { filePath: snapshot.metadata.fullPath };
    });
}

const getFileURL = path => {
  return storage
    .child(path)
    .getDownloadURL();
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
  signupUser,
  loginUser,
  getUserDetails,
  updateUserDetails,
  addInk,
  updateInk,
  removeInk,
  addPen,
  updatePen,
  removePen,
  inkPen,
  cleanPen,
  addFieldDataListener,
  removeFieldDataListener,
  uploadImage,
  getFileURL,
  logout
}