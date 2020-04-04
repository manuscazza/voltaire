import React from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import { format, Interval, startOfWeek, endOfWeek, eachDayOfInterval, toDate, getTime, isDate } from 'date-fns';
import it_IT from 'date-fns/locale/it';
import { dummyList } from '../../dummies/dummyPerson';
import styles from './Table.module.scss';
import { Role, RolesAsStringArray as roles } from '../../utils/Roles';

const dataHeader = (data: Date) => format(data, 'eeeeeeee dd', { locale: it_IT });

const turno1: Interval = {
  start: new Date(2020, 10, 8, 12, 0),
  end: new Date(2020, 10, 8, 14, 30)
};
const turno2: Interval = {
  start: new Date(2020, 10, 8, 18, 30),
  end: new Date(2020, 10, 8, 22, 0)
};
const turno3: Interval = {
  start: new Date(2020, 10, 8, 7, 0),
  end: new Date(2020, 10, 8, 12, 0)
};
const turno4: Interval = {
  start: new Date(2020, 10, 8, 18, 0),
  end: new Date(2020, 10, 8, 24, 0)
};
const turni = [turno1, turno2, turno3, turno4, null];
const FORMAT = 'HH:mm';

export interface GridElement extends ReactDataSheet.Cell<GridElement, string> {
  value: Interval | null;
  role: Role | null;
}

class MyReactDataSheet extends ReactDataSheet<GridElement, string> {}

interface AppState {
  grid: GridElement[][];
}

const DELIMITER = '-';

interface MyProps {
  columns: Date[];
}

export default class TableComponent extends React.Component<MyProps, AppState> {
  constructor(props: { columns: Date[] }) {
    super(props);
    this.state = {
      grid: dummyList.map(person =>
        this.props.columns.map(day => {
          return {
            value: turni[Math.floor(Math.random() * turni.length)],
            role: roles[Math.floor(Math.random() * roles.length)] as Role
          } as GridElement;
        })
      )
    };
  }

  cellRenderer: ReactDataSheet.CellRenderer<GridElement, string> = props => {
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

  mySheetRenderer: React.SFC<ReactDataSheet.SheetRendererProps<GridElement, string>> = props => (
    <table className={styles.Table}>
      <thead>
        <tr>
          <th />
          {this.props.columns.map(day => (
            <th className={styles.Header}>{dataHeader(day)}</th>
          ))}
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );

  myRowRenderer: React.SFC<ReactDataSheet.RowRendererProps<GridElement, string>> = props => {
    return (
      <tr>
        <td className={styles.RowName}>{`${dummyList[props.row].name.charAt(0)}. ${dummyList[props.row].surname}`}</td>
        {props.children}
      </tr>
    );
  };

  myValueRenderer: ReactDataSheet.ValueRenderer<GridElement, string> = (cell, i, j) => {
    return cell.value ? `${cell.value.start + DELIMITER + cell.value.end}|${cell.role}` : null;
  };

  valueViewer: React.SFC<ReactDataSheet.ValueViewerProps<GridElement, string>> = props => {
    return (
      <div className={styles.Content}>
        {props.cell.value ? (
          <>
            <p>{props.cell.role}</p>
            <p>{`${format(props.cell.value.start, FORMAT)} - ${format(props.cell.value.end, FORMAT)}`}</p>
          </>
        ) : (
          '-'
        )}
      </div>
    );
  };

  dataEditor: React.SFC<ReactDataSheet.DataEditorProps<GridElement, string>> = props => {
    return <div>prova</div>;
  };

  render() {
    return (
      <MyReactDataSheet
        data={this.state.grid}
        valueRenderer={this.myValueRenderer}
        sheetRenderer={this.mySheetRenderer}
        rowRenderer={this.myRowRenderer}
        // attributesRenderer={(cell) => {'data-role': cell.role || {}}
        onCellsChanged={changes => {
          const grid = this.state.grid.map(row => [...row]);
          changes.forEach(({ cell, row, col, value }) => {
            let turno: Interval | null = null;
            let role: Role | null = null;
            console.log(value);
            if (value) {
              const [date, ruolo] = value.split('|');
              role = ruolo as Role;
              const dates = date.split(DELIMITER);
              turno = {
                start: new Date(dates[0]),
                end: new Date(dates[1])
              };
            }
            grid[row][col] = { ...grid[row][col], value: turno, role: role };
          });
          this.setState({ grid });
        }}
        cellRenderer={this.cellRenderer}
        valueViewer={this.valueViewer}
        dataEditor={this.dataEditor}
      />
    );
  }
}
