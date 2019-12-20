import React from 'react';
import { BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/page/main" component={Main}/>
      </Switch>
    </Router>
  );
}

export default App;
