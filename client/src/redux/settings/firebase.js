import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

!firebase.apps.length
  ? firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDERID,
      appId: process.env.REACT_APP_FIREBASE_APPID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
    })
  : firebase.app();

const database = firebase.firestore();
const auth = firebase.auth();
export { firebase, database, auth };
