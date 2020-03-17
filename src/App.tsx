import React, { Fragment } from 'react';
import './App.scss';
import PersonView from './views/personView/PersonView';
import AppNav from './components/navbar/AppNav';

function App() {
  return (
    <Fragment>
      <AppNav />
      <PersonView />
    </Fragment>
  );
}

export default App;
