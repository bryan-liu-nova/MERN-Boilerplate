import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import './App.css';

const App = () => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  return (
    <BrowserRouter>
      <Route exact path="/">
        {authenticated ? <Redirect to="/dashboard" /> : <Home />}
      </Route>
      <Route path="/dashboard" component={Dashboard} />
    </BrowserRouter>
  );
};
export default App;
