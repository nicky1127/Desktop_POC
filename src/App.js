import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <ProtectedRoute exact path="/page/main" component={Main} />
        <Route path="/page/logout" component={Logout} />
      </Switch>
    </Router>
  );
}

export default App;
