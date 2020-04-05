import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PersonView from './views/personView/PersonView';
import AppNav from './components/navbar/AppNav';
import TableView from './views/tableView/TableView';
import WIP from './components/workInProgress/WIP';
import './App.scss';
import Comp from './components/comp/Comp';

function App() {
  return (
    <Router>
      <AppNav />
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
          {/* <WIP /> */}
        </Route>
        <Route path="/home">
          <WIP />
        </Route>
        <Route path="/personale">
          <PersonView />
        </Route>
        <Route path="/turni">
          <TableView />
        </Route>
        <Route path="/mail">
          {/* <Redirect to="/home" /> */}
          {/* <WIP /> */}
          <Comp />
        </Route>
        <Route path="/impostazioni">
          {/* <Redirect to="/home" /> */}
          <WIP />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
