import { toast } from 'react-toastify';
import { database, auth, firebase } from '../settings/firebase';
import api from '../settings/api';
import toastConfig from '../settings/toast';

const sendRequest = async (user) => {
  if (auth.currentUser) {
    const token = await auth.currentUser.getIdToken(true);
    if (user && user.additionalUserInfo && token) {
      const { profile, providerId } = user.additionalUserInfo;
      const { refreshToken, uid } = user.user;
      const { accessToken } = user.credential;
      console.log(user);
      const data = {
        ...profile,
        providerId,
        refreshToken,
        accessToken,
        id: uid + '',
      };
      const result = await api.post('/auth/google/callback', {
        profile: data,
      });
      console.log(result, 'this is result');
      return data;
    }
  }
  return '';
};

export const signinWithGoogle = () => {
  return async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const user = await auth.signInWithPopup(provider);
      const data = await sendRequest(user);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error,
      });
      toast(error.message, toastConfig);
    }
  };
};

export const saveSalesforceAccessToken = (user, access_token) => {
  return async (dispatch) => {
    try {
      const result = await api.post('/auth/salesforce/callback', {
        user: { ...user, salesforceAccessToken: access_token },
      });
      if (result.data) {
        toast(result.message, toastConfig);
      }
    } catch (error) {}
  };
};

export const signup = (email, password) => {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      // We want to save the user to our own collection with custom attributes for us
      saveUserToDB(response.user);
      console.log(response.user);
      return { user: '', error: false };
    })
    .catch((error) => {
      return { user: '', error: error.message };
    });
};

export const signin = (email, password) => {
  return auth
    .signInWithEmailAndPassword(email, password)
    .then(async (response) => {
      const user = await getUserFromDB(response.user.uid);
      console.log(user);
      return { user: response.user, error: false };
    })
    .catch((error) => {
      return { user: '', error: error.message };
    });
};

export const signout = () => {
  return (dispatch) => {
    auth.signOut().then(() => {
      dispatch({ type: 'LOGOUT' });
    });
  };
};

const getUserFromDB = async (userID) => {
  const db = await database;
  return db
    .collection('users')
    .doc(userID)
    .get()
    .then((user) => {
      return user.data();
    });
};

const saveUserToDB = async (user) => {
  const db = await database;
  return db
    .collection('users')
    .doc(user.uid.toString())
    .set({
      id: user.uid.toString(),
      name: user.displayName ? user.displayName : 'John Doe',
      email: user.email,
      token: user.refreshToken ? user.refreshToken : '',
      accessToken: user.accessToken ? user.accessToken : '',
    })
    .then(() => {});
};
