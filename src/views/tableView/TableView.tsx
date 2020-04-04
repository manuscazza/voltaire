import React, { useState } from 'react';
import { format, Interval, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks } from 'date-fns';
import Table from '../../components/table/Table';
// import { dummyList } from '../../dummies/dummyPerson';
import styles from './TableView.module.scss';
import { IconNames } from '@blueprintjs/icons';
import { Icon, Button, InputGroup, Overlay } from '@blueprintjs/core';

declare type VewType = 'month' | 'week' | 'day';

interface MyProps {
  type: VewType;
  range?: number;
}

// const FORMAT = 'eee dd';

const TableView: React.FunctionComponent<{}> = props => {
  const [showOverlay, setOverlay] = useState<boolean>(false);

  const toggleOverlay = () => setOverlay(show => !show);

  const today = new Date();
  const interval: Interval = {
    start: startOfWeek(today, { weekStartsOn: 1 }),
    end: endOfWeek(addWeeks(today, 0), { weekStartsOn: 1 })
  };
  const days = eachDayOfInterval(interval);

  return (
    <>
      <Overlay isOpen={showOverlay} onClose={toggleOverlay} canOutsideClickClose={false} transitionDuration={50}>
        <div
        // closeOverlay={toggleOverlay}
        // addPerson={addPersonHandler}
        >
          ciao
        </div>
      </Overlay>
      <div className={styles.TableView}>
        <div className={styles.TopBar}>
          <Button
            icon={<Icon icon={IconNames.MENU} iconSize={24}></Icon>}
            minimal
            onClick={() => {
              alert('Ciao ciambellina ;-)');
            }}
          />
          <InputGroup
            className={styles.SearchBar}
            placeholder="Cerca..."
            leftIcon={<Icon icon={IconNames.SEARCH} />}
            type="search"
            onChange={() => {}}
          />
        </div>
        <Table columns={days} toggleEditorTurni={toggleOverlay} />
      </div>
    </>
  );
};

export default TableView;
