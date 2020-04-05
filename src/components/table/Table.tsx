import React from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import { format, Interval } from 'date-fns';
import it_IT from 'date-fns/locale/it';
import { dummyList } from '../../dummies/dummyPerson';
import styles from './Table.module.scss';
import { Role, RolesAsStringArray as roles, RolesAsStringArray } from '../../utils/Roles';
import { Overlay, InputGroup, HTMLSelect } from '@blueprintjs/core';

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
          {this.props.columns.map((day, index) => (
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

  myValueRenderer: ReactDataSheet.ValueRenderer<GridElement, string> = (cell, i, j) => {
    return cell.value ? `${cell.value.start + DELIMITER + cell.value.end}|${cell.role}` : null;
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

  dataEditor: React.SFC<ReactDataSheet.DataEditorProps<GridElement, string>> = props => {
    return (
      <div className={styles.InputGroup}>
        {/* <HTMLSelect
          id={styles.orderBy}
          options={RolesAsStringArray}
          // elementRef={createRoleRef}
        ></HTMLSelect> */}
        <input
          type="text"
          maxLength={4}
          pattern="[0-9]+"
          autoFocus={true}
          onKeyDown={ev => {
            if (ev.key === 'Enter') {
              (ev.currentTarget.nextElementSibling as HTMLInputElement).focus();
            } else if (ev.key === 'Escape') {
              props.onRevert();
            }
          }}
        />
        -
        <input
          type="text"
          maxLength={4}
          pattern="[0-9]+"
          onKeyDown={ev => {
            if (ev.key === 'Enter') {
              console.log(ev.currentTarget.value);

              props.onCommit(ev.currentTarget.value, ev);
            } else if (ev.key === ' Escape') {
              props.onRevert();
            }
          }}
        />
      </div>
    );
  };

  onChangeHandler = (changes: ReactDataSheet.CellsChangedArgs<GridElement, string>) => {
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
