import React from 'react';
import { Cell, Column, Table } from '@blueprintjs/table';
import { ContextMenuTarget, Menu, MenuItem } from '@blueprintjs/core';
import {
  format,
  Interval,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval
} from 'date-fns';
import { dummyList } from '../../dummies/dummyPerson';

declare type VewType = 'month' | 'week' | 'day';

interface MyProps {
  type: VewType;
  range?: number;
}

const FORMAT = 'eee dd';

const TableView: React.FunctionComponent<{}> = props => {
  const today = new Date();
  const interval: Interval = {
    start: startOfWeek(today, { weekStartsOn: 1 }),
    end: endOfWeek(today, { weekStartsOn: 1 })
  };
  const days = eachDayOfInterval(interval);

  const generateColumns = (day: Date) => (
    <Column name={format(day, FORMAT)} cellRenderer={dataRenderer} />
  );

  const dataRenderer = (rowIndex: number) => (
    <Cell>{/* <RightClickMe /> */}</Cell>
  );
  const nameRenderer = (rowIndex: number) => (
    <Cell>{dummyList[rowIndex].name}</Cell>
  );

  const header = <Column cellRenderer={nameRenderer} name="" />;
  const cols = days.map(day => generateColumns(day));
  cols.unshift(header);
  return (
    <>
      <Table
        numRows={dummyList.length}
        enableRowHeader={false}
        children={cols}
      />
      {/* <img src={logo} alt="ciao" style={{ backgroundColor: '#394b59' }}></img> */}
    </>
  );
};

export default TableView;

@ContextMenuTarget
class RightClickMe extends React.Component<{}, {}> {
  public render() {
    // root element must support `onContextMenu`
    return <div>click me</div>;
  }

  public renderContextMenu() {
    // return a single element, or nothing to use default browser behavior
    return (
      <Menu>
        <MenuItem onClick={() => alert('clicked')} text="Save" />
        <MenuItem onClick={() => alert('clicked')} text="Delete" />
      </Menu>
    );
  }

  public onContextMenuClose() {
    // Optional method called once the context menu is closed.
  }
}
