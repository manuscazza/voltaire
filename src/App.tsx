import React from 'react';
import './App.css';
import Table from './components/table/Table';
import Comp from './components/comp/Comp';

function App() {
  return (
    <div>
      <Table></Table>
      <Comp data="manu" />
    </div>
  );
}

export default App;
