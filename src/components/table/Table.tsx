import React from 'react';
import { Cell, Column, Table } from '@blueprintjs/table';

const TableView = (props: {}) => {
  const cellRender = (rowIndex: number) => (
    <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
  );
  return (
    <Table numRows={5}>
      <Column name="Prova" cellRenderer={cellRender} />
    </Table>
  );
};

export default TableView;
