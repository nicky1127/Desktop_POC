/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import api from './api/Api';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  if (!api.token) {
    api.token = localStorage.getItem('toke');
  }

  return (
    <Route
      {...rest}
      render={props => {
        return api.token ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default ProtectedRoute;
