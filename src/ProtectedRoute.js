/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import apiAuth from './api/ApiAuth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  if (!apiAuth.token) {
    apiAuth.token = localStorage.getItem('token');
  }

  return (
    <Route
      {...rest}
      render={props => {
        return apiAuth.token ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default ProtectedRoute;
