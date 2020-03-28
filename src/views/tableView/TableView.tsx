import React from 'react';
import {
  format,
  Interval,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval
} from 'date-fns';
import it_IT from 'date-fns/locale/it';
import Table from '../../components/table/Table';
import { dummyList } from '../../dummies/dummyPerson';
import styles from './TableView.module.scss';

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

  return <Table />;
};

export default TableView;
