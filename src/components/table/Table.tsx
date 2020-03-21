import React from 'react';
import { Cell, Column, Table } from '@blueprintjs/table';
import { dummyList } from '../../dummies/dummyPerson';

interface MyProps {}

const TableView: React.FunctionComponent<MyProps> = props => {
  const cellRender = (rowIndex: number) => (
    <Cell>{dummyList[rowIndex].name}</Cell>
  );
  return (
    <Table numRows={dummyList.length} enableRowHeader={false}>
      <Column name="Name" cellRenderer={cellRender} />
    </Table>
  );
};

export default TableView;
