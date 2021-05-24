import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from '../components/actions/apis';
const Context = createContext(null);

const UserProvider = ({ children }) => {
  // const { user } = useAuth();
  // const { auth } = useAuth();
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     await api
  //       .get('/user', { withCredentials: true })
  //       .then((res) => {
  //         console.log(res, 'user provider success');
  //         const userData = res && res.data;
  //         setUser(userData);
  //       })
  //       .catch((err) => {
  //         console.log(err, 'user provider error');
  //       });
  //   };
  //   fetchUser();
  // }, []);

  return <Context.Provider value={user}>{children}</Context.Provider>;
};

UserProvider.Context = Context;

export default UserProvider;
