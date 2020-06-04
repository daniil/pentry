import { format } from 'date-fns';
import firebase from 'firebase/app';

export const formatDay = dateInMs => format(new Date(dateInMs * 1000), 'yyyy-MM-dd');

export const firebaseFromDate = date => {
  return firebase.firestore.Timestamp.fromDate(new Date(date));
}

export const firebaseTimestamp = () => {
  return firebase.firestore.FieldValue.serverTimestamp();
}