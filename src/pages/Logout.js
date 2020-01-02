import React, { useState, useEffect } from 'react';
import api from '../api/Api';

export default function Logout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // setTimeout(async () => {
    //   await initLogout();
    // }, 200);
  }, []);

  initLogout = async () => {
    const result = await api.authLogout();
    setReady(true);
  };
}
