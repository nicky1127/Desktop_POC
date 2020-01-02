import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import apiAuth from '../api/ApiAuth';

export default function Logout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      await initLogout();
    }, 200);
  }, []);

  const initLogout = async () => {
    const result = await apiAuth.authLogout();
    setReady(true);
    return result;
  };

  const renderRedirect = () => <Redirect to="/" />;

  const content = ready ? renderRedirect() : 'Logout in progress...';

  return <div>{content}</div>;
}
