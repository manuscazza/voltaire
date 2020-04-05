import React from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import { format, Interval, addDays, setHours, setMinutes, parse } from 'date-fns';
import it_IT from 'date-fns/locale/it';
import { dummyList } from '../../dummies/dummyPerson';
import styles from './Table.module.scss';
import { Role, RolesAsStringArray as roles } from '../../utils/Roles';
import { Overlay } from '@blueprintjs/core';

export interface GridElement extends ReactDataSheet.Cell<GridElement, string> {
  value: Interval | null;
  role: Role | null;
}

class MyReactDataSheet extends ReactDataSheet<GridElement, string> {}

interface AppState {
  grid: GridElement[][];
  isCopying: boolean;
  isDropped: boolean;
  showOverlay: boolean;
}

interface MyProps {
  dateRange: Date[];
}

export default class TableComponent extends React.Component<MyProps, AppState> {
  constructor(props: { dateRange: Date[] }) {
    super(props);
    this.state = {
      grid: dummyList.map(person =>
        this.props.dateRange.map(day => {
          return {
            value: turni[Math.floor(Math.random() * turni.length)],
            role: roles[Math.floor(Math.random() * roles.length)] as Role
          } as GridElement;
        })
      ),
      isCopying: false,
      isDropped: false,
      showOverlay: false
    };
  }

  cellRenderer: ReactDataSheet.CellRenderer<GridElement, string> = props => {
    const { cell, col, row, value } = (props.children as JSX.Element).props as ReactDataSheet.ValueViewerProps<
      GridElement,
      string
    >;
    return (
      <td
        onMouseDown={props.onMouseDown}
        // onMouseOver={props.onMouseOver}
        onDoubleClick={props.onDoubleClick}
        className={!props.selected ? styles.Cell : styles.Selected}
        draggable={true}
        onDragStart={ev => {
          ev.dataTransfer.setData('text', value as string);
          if (!ev.ctrlKey) {
            this.setState({ isCopying: true });
          }
        }}
        onDragOver={ev => {
          ev.preventDefault();
        }}
        onDrop={ev => {
          ev.currentTarget.click();
          ev.preventDefault();
          this.setState({ isDropped: true });
          const value = ev.dataTransfer.getData('text');
          this.onChangeHandler([{ cell, col, row, value }]);
        }}
        onDragEnd={ev => {
          if (this.state.isCopying && this.state.isDropped) {
            this.onChangeHandler([{ cell, col, row, value: null }]);
            this.setState({ isCopying: false, isDropped: false });
          }
        }}
        onDragExit={() => this.setState({ isCopying: false })}
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
          {this.props.dateRange.map((day, index) => (
            <th key={index} className={styles.Header}>
              {dataHeader(day)}
            </th>
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

  generateValueString = (value: Interval, role: Role | null) => `${value.start + DELIMITER + value.end}|${role || ''}`;

  myValueRenderer: ReactDataSheet.ValueRenderer<GridElement, string> = (cell, i, j) => {
    return cell.value ? this.generateValueString(cell.value, cell.role) : null;
  };

  valueViewer: React.SFC<ReactDataSheet.ValueViewerProps<GridElement, string>> = ({ cell, col, row, value }) => {
    return (
      <div className={styles.Content}>
        {cell.value ? (
          <>
            <p>{cell.role}</p>
            <p>{`${format(cell.value.start, FORMAT)} - ${format(cell.value.end, FORMAT)}`}</p>
          </>
        ) : (
          '-'
        )}
      </div>
    );
  };

  dataEditor: React.SFC<ReactDataSheet.DataEditorProps<GridElement, string>> = ({
    cell,
    col,
    row,
    value,
    onRevert,
    onCommit
  }) => {
    const pattern = '([01]?[0-9]{1}|2[0-3]{1})[0-5]{1}[0-9]{1}';
    return (
      <div className={styles.InputGroup}>
        {/* <HTMLSelect
          id={styles.orderBy}
          options={RolesAsStringArray}
          // elementRef={createRoleRef}
        ></HTMLSelect> */}
        <input
          type="text"
          minLength={4}
          maxLength={4}
          title="Errore nel campo inserito"
          pattern={pattern}
          autoFocus={true}
          onKeyDown={ev => {
            if (ev.key === 'Enter') {
              (ev.currentTarget.nextElementSibling as HTMLInputElement).focus();
            } else if (ev.key === 'Escape') {
              onRevert();
            }
          }}
        />
        -
        <input
          type="text"
          maxLength={4}
          minLength={4}
          title="Errore nel campo inserito"
          pattern={pattern}
          onKeyDown={ev => {
            if (ev.key === 'Enter') {
              if ((ev.currentTarget.previousElementSibling as HTMLInputElement).reportValidity()) {
                const timeStart = (ev.currentTarget.previousElementSibling as HTMLInputElement).value;
                let start = new Date(this.props.dateRange[col]);
                start = parse(timeStart, 'HHmm', start);
                if (ev.currentTarget.reportValidity()) {
                  const timeEnd = ev.currentTarget.value;
                  let end =
                    timeEnd >= timeStart ? new Date(this.props.dateRange[col]) : addDays(this.props.dateRange[col], 1);
                  end = parse(timeEnd, 'HHmm', end);
                  const value = this.generateValueString({ start, end }, null);
                  onCommit(value);
                  this.onChangeHandler([{ cell, col, row, value }]);
                }
              }
            } else if (ev.key === ' Escape') {
              onRevert();
            }
          }}
        />
      </div>
    );
  };

  onChangeHandler = (changes: ReactDataSheet.CellsChangedArgs<GridElement, string>) => {
    // console.log('onChange CALLED');
    const grid = this.state.grid.map(row => [...row]);
    changes.forEach(({ cell, row, col, value }) => {
      let turno: Interval | null = null;
      let role: Role | null = null;
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
  };

  toggleOverlay() {
    this.setState(state => {
      return { showOverlay: !state.showOverlay };
    });
  }

  render() {
    return (
      <>
        <Overlay
          isOpen={this.state.showOverlay}
          onClose={this.toggleOverlay}
          canEscapeKeyClose={true}
          canOutsideClickClose={false}
          transitionDuration={50}
        >
          <p>prova editor</p>
        </Overlay>
        <MyReactDataSheet
          data={this.state.grid}
          valueRenderer={this.myValueRenderer}
          sheetRenderer={this.mySheetRenderer}
          rowRenderer={this.myRowRenderer}
          onCellsChanged={this.onChangeHandler}
          cellRenderer={this.cellRenderer}
          valueViewer={this.valueViewer}
          dataEditor={this.dataEditor}
        />
      </>
    );
  }
}

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

const dataHeader = (data: Date) => format(data, 'eeeeeee dd', { locale: it_IT });

const DELIMITER = '-';
