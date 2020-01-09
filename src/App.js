import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ProtectedRoute from './ProtectedRoute';

import { Provider } from 'react-redux';
import configureStore from './redux/configurestore'
const store = configureStore()

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/page/main" component={Main} />
          <Route path="/page/logout" component={Logout} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
