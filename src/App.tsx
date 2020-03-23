import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import PersonView from './views/personView/PersonView';
import AppNav from './components/navbar/AppNav';
import TableView from './components/table/Table';
import donut from './assets/donut2.png';
import img from './assets/clash.jpeg';

function App() {
  return (
    <Router>
      <AppNav />
      <Switch>
        <Route exact path="/">
          {/* <Login /> */}
          <WIP />
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

const WIP: React.FunctionComponent<{}> = () => {
  return (
    <div style={center}>
      <h2>
        Work in progress
        <img src={donut} alt="ciambellina" style={spin} />
      </h2>
    </div>
  );
};

const spin: React.CSSProperties = {
  animation: 'spin 20s linear infinite',
  transformOrigin: 'center center',
  width: 150, //'162px',
  height: 150, //'162px',
  position: 'absolute',
  top: 120, //-18,
  left: 250 //165
};

const center: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};
