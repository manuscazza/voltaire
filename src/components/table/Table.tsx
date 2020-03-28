import React from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import { format, Interval, startOfWeek, endOfWeek, eachDayOfInterval, toDate, getTime, isDate } from 'date-fns';
// import it_IT from 'date-fns/locale/it';
// import { dummyList } from '../../dummies/dummyPerson';
import styles from './Table.module.scss';

const DEL = ' & '; //delimita start - end
const SEP = ' * '; //separa 2 turni

const turno1: Interval = {
  start: new Date(2020, 10, 8, 12, 0),
  end: new Date(2020, 10, 8, 14, 30)
};
const turno2: Interval = {
  start: new Date(2020, 10, 8, 18, 30),
  end: new Date(2020, 10, 8, 22, 0)
};
const FORMAT = 'HH:mm';

const grid: GridElement[][] = [
  [{ value: turno1 }, { value: turno1 }, { value: turno1 }, { value: turno2 }],
  [{ value: turno2 }, { value: turno2 }, { value: turno2 }, { value: turno1 }],
  [{ value: turno2 }, { value: turno1 }, { value: turno2 }, { value: turno1 }],
  [{ value: turno2 }, { value: turno2 }, { value: turno1 }, { value: turno1 }],
  [{ value: turno2 }, { value: turno1 }, { value: turno2 }, { value: turno1 }]
];

export interface GridElement extends ReactDataSheet.Cell<GridElement, string> {
  value: Interval | null;
}

class MyReactDataSheet extends ReactDataSheet<GridElement, string> {}

interface AppState {
  grid: GridElement[][];
}

//You can also strongly type all the Components or SFCs that you pass into ReactDataSheet.
const cellRenderer: ReactDataSheet.CellRenderer<GridElement, string> = props => {
  return (
    <td
      onMouseDown={props.onMouseDown}
      onMouseOver={props.onMouseOver}
      onDoubleClick={props.onDoubleClick}
      className={!props.selected ? styles.Cell : styles.Selected}
    >
      {props.children}
    </td>
  );
};

const DELIMITER = '-';

const myValueRenderer: ReactDataSheet.ValueRenderer<GridElement, string> = (cell, i, j) => {
  return cell.value ? `${cell.value.start + DELIMITER + cell.value.end}` : null;
};

export default class TableComponent extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      grid
    };
  }

  render() {
    return (
      <MyReactDataSheet
        data={this.state.grid}
        valueRenderer={myValueRenderer}
        onCellsChanged={changes => {
          const grid = this.state.grid.map(row => [...row]);
          changes.forEach(({ cell, row, col, value }) => {
            let turno: Interval | null = null;
            console.log(value);
            if (value) {
              const dates = value.split(DELIMITER);

              turno = {
                start: new Date(dates[0]),
                end: new Date(dates[1])
              };
            }
            grid[row][col] = { ...grid[row][col], value: turno };
          });

          this.setState({ grid });
        }}
        cellRenderer={cellRenderer}
        valueViewer={valueViewer}
        dataEditor={dataEditor}
      />
    );
  }
}

const valueViewer: React.SFC<ReactDataSheet.ValueViewerProps<GridElement, string>> = props => {
  return (
    <div>
      {props.cell.value ? (
        <p>{`${format(props.cell.value.start, FORMAT)} - ${format(props.cell.value.end, FORMAT)}`}</p>
      ) : (
        'riposo'
      )}
    </div>
  );
};

const dataEditor: React.SFC<ReactDataSheet.DataEditorProps<GridElement, string>> = props => {
  console.log(props.value);
  return <div>prova</div>;
};
