import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <>
      <h1>TrybeWallet</h1>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>

    </>
  );
}

export default App;
