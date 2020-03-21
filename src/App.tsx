import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import PersonView from './views/personView/PersonView';
import AppNav from './components/navbar/AppNav';
import TableView from './components/table/Table';

function App() {
  return (
    <Router>
      <AppNav />
      <Switch>
        <Route exact path="/">
          {/* <Login /> */}
        </Route>
        <Route path="/personale">
          <PersonView />
        </Route>
        <Route path="/turni">
          <TableView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
