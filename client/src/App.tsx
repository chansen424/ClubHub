import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

import UserContext from './context/userContext';
import './App.css';

function App() {
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <UserContext.Provider value={{user, "setUser": setUser}}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/home" component={Home} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
